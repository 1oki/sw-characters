import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: 'idle', // 'idle' | 'loading' | 'resolved' | 'rejected'
    error: null,
    charactersNumber: null,
    currentPageNumber: 1,
    characters: [],
    favoriteCharacters: JSON.parse(localStorage.getItem('favoriteCharacters')) || [],
    searchPhrase: '',
};

// Base URL for API requests
const baseUrl = 'https://swapi.dev/api';
const homeworldCache = new Map(); // Кеш для планет (чтобы не делать повторные запросы)


/**
 * Fetches data about a character's homeworld from the SWAPI.
 * If the data has already been fetched, it returns the cached result.
 * If the fetch fails, it logs an error and returns "Unknown".
 * @param {string} homeworldId - The ID of the homeworld to fetch.
 * @param {import('react-redux').Dispatch} dispatch - The dispatch function from the Redux store.
 * @returns {Promise<string>} The name of the homeworld, or "Unknown" on error.
 */
const fetchHomeworldData = async (homeworldId, dispatch) => {
    if (homeworldCache.has(homeworldId)) {
        return homeworldCache.get(homeworldId);
    }

    try {
        const res = await fetch(`${baseUrl}/planets/${homeworldId}`);
        if (!res.ok) throw new Error('Failed to fetch homeworld');
        
        const data = await res.json();
        homeworldCache.set(homeworldId, data.name); // Кешируем название планеты
        return data.name;
    } catch (error) {
        console.error("Error fetching homeworld:", error);
        return "Unknown"; // Если ошибка, возвращаем "Unknown"
    }
};


/**
 * Asynchronously fetches and constructs character data from a given element,
 * including the character's name, ID, homeworld, gender, and image URL.
 * 
 * @param {Object} element - The character element containing necessary URLs and details.
 * @param {function} dispatch - The dispatch function from Redux store for dispatching actions.
 * @returns {Promise<Object>} An object containing the character's name, ID, homeworld, gender, and image URL.
 */
const getCharacterData = async (element, dispatch) => {
    const characterId = element.url.split('/')[5];
    const homeworldId = element.homeworld.split('/')[5];
    const homeworld = await fetchHomeworldData(homeworldId, dispatch);

    return {
        name: element.name,
        id: characterId,
        homeworld,
        gender: element.gender,
        imgUrl: `https://starwars-visualguide.com/assets/img/characters/${characterId}.jpg`
    };
};


/**
 * A generic function to fetch character data from the SWAPI.
 * It fetches the data, checks the response status, and then
 * constructs an array of character objects by mapping over the results.
 * If the fetch fails, it throws an error.
 *
 * @param {string} url - The URL of the API endpoint to fetch from.
 * @param {import('react-redux').Dispatch} dispatch - The dispatch function from Redux store for dispatching actions.
 * @returns {Promise<Object>} An object containing the total number of characters and an array of character objects.
 */

const fetchCharactersData = async (url, dispatch) => {
    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error('Server error');

        const data = await res.json();
        const characters = await Promise.all(data.results.map(el => getCharacterData(el, dispatch)));

        return { charactersNumber: data.count, characters };
    } catch (error) {
        return Promise.reject(error.message);
    }
};

// Thunk to search characters by name
export const searchCharacters = createAsyncThunk(
    'characters/searchCharacters',
    async ({searchTerm, pageNumber}, { rejectWithValue, dispatch }) => {
        try {
            return await fetchCharactersData(`${baseUrl}/people/?search=${searchTerm}&page=${pageNumber}`, dispatch);
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

// Thunk to fetch characters for a given page
export const fetchCharacters = createAsyncThunk(
    'characters/fetchCharacters',
    async (currentPageNumber, { rejectWithValue, dispatch }) => {
        try {
            return await fetchCharactersData(`${baseUrl}/people/?page=${currentPageNumber}`, dispatch);
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

// Creating the Redux slice to manage characters
export const charactersSlice = createSlice({
    name: 'characters',
    initialState,
    reducers: {
        /**
         * Adds a character to the favorite list if not already present.
         * Checks if the character is already in the favoriteCharacters array.
         * If not, it adds the character and updates the local storage.
         */
        addToFavorite: (state, action) => {
            if (!state.favoriteCharacters.some(char => char.id === action.payload.id)) {
                state.favoriteCharacters.push(action.payload);
                localStorage.setItem('favoriteCharacters', JSON.stringify(state.favoriteCharacters));
            }
        },
        /**
         * Removes a character from the favorite list if present.
         * If the character is present in the favorite list, it will be removed.
         * The favoriteCharacters array is updated in the Redux store and the local storage is updated as well.
         */

        removeFromFavorite: (state, action) => {
            state.favoriteCharacters = state.favoriteCharacters.filter(char => char.id !== action.payload);
            localStorage.setItem('favoriteCharacters', JSON.stringify(state.favoriteCharacters));
        },
        /**
         * Updates the currentPageNumber in the Redux store.
         */
        setCurrentPageNumber: (state, action) => {
            state.currentPageNumber = action.payload;
        },
        /**
         * Updates the search phrase in the Redux store.
         */
        setSearchPhrase: (state, action) => {
            state.searchPhrase = action.payload;
        }
    },

        /**
         * Extra reducers for handling the fetchCharacters and searchCharacters actions.
         * Handles the pending, fulfilled and rejected states of the actions and updates the state accordingly.
         * Updates the status, characters, charactersNumber, error, searchPhrase and currentPageNumber properties of the state.
         */
    extraReducers: (builder) => {
        builder
            .addCase(fetchCharacters.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchCharacters.fulfilled, (state, action) => {
                state.status = 'resolved';
                state.characters = action.payload.characters;
                state.charactersNumber = action.payload.charactersNumber;
                state.currentPageNumber = action.meta.arg;
            })
            .addCase(fetchCharacters.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.payload;
            })

            .addCase(searchCharacters.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(searchCharacters.fulfilled, (state, action) => {
                state.status = 'resolved';
                state.characters = action.payload.characters;
                state.charactersNumber = action.payload.charactersNumber;
                state.searchPhrase = action.meta.arg.searchTerm; // Updates search phrase
                state.currentPageNumber = action.meta.arg.pageNumber; // Updates page number
            })
            .addCase(searchCharacters.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.payload;
            });
    }
});

// Exporting actions for use in components
export const { setCurrentPageNumber, addToFavorite, removeFromFavorite, setSearchPhrase } = charactersSlice.actions;

// Exporting the reducer to be used in the Redux store
export default charactersSlice.reducer;
