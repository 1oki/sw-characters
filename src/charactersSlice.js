import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchCharacters = createAsyncThunk('characters/fetchCharacters',
    async function() {
        const res = await fetch ('https://swapi.dev/api/people')
        const data = await res.json();
        // console.log(data)
        // console.log(data.results)
        return data.results;
    }
);


export const charactersSlice = createSlice({
    name: 'characters',
    initialState: {
        loading: false,
        error: false,
        pagesNumber: null,
        characters: [
            // {
            //     id: 1,
            //     name: "Luke Skywalker",
            //     homeworld: "https://swapi.dev/api/planets/1/",
            //     isFavorite: false
            // },
            // {
            //     id: 2,
            //     name: "C-3PO",
            //     homeworld: "https://swapi.dev/api/planets/1/",
            //     isFavorite: false
            // },
            // {
            //     id: 3,
            //     name: "C-3PO",
            //     homeworld: "https://swapi.dev/api/planets/1/",
            //     isFavorite: false
            // },
            // {
            //     id: 4,
            //     name: "C-3PO",
            //     homeworld: "https://swapi.dev/api/planets/1/",
            //     isFavorite: false
            // },
        ]
    },
    reducers: {
        loadingStarted: (state, action) => {
            if (!state.loading) {
                state.loading = true
            }
        },
        loadingFinished: (state) => {
            if (state.loading) {
                state.loading = false
            }
        },
        addCharacters: (state, action) => {
            state.characters.push(action.payload)
        },
        toggleFaforite: (state,action) => {
            console.log(`Add to favorite char with id ${action.payload}`)
        },
        getPagesNumber: (state, action) => {
            state.pagesNumber = action.payload
        }
    },
    extraReducers: {
        [fetchCharacters.pending]: (state) => {
            state.loading = true
        },
        [fetchCharacters.fulfilled]: (state, action) => {
            state.loading = false;
            state.characters = action.payload;
        },
        [fetchCharacters.rejected]: (state, action) => {}
    }
})

export const { loadingStarted, loadingFinished, addCharacters, addToFaforite } = charactersSlice.actions
export default charactersSlice.reducer