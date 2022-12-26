import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    error: null,
    charactersNumber: null,
    currentPageNumber: 1,
    characters: [],
    favoriteCharacters: []
}

const baseUrl = 'https://swapi.dev/api'
const getResourse = async (url) => {
    const res = await fetch(`${baseUrl}${url}`);
    if (!res.ok) {
        throw new Error(`Could not fetch!!  ${url}  received!  ${res.status}`)
    }
    return await res.json();  
}
const getHomeworld = async (id) => {
    const res = await getResourse(`/planets/${id}`)
    return res.name
}

export const fetchCharacters = createAsyncThunk(
    'characters/fetchCharacters',
    async (currentPageNumber, {rejectWithValue}) => {
        try{
            const res = await fetch (`${baseUrl}/people/?page=${currentPageNumber}`)
            if(!res.ok){
                throw new Error('Server error');
            }
            const data = await res.json();
            const processedData = {
                charactersNumber: data.results.count
            }
            processedData.charactersNumber = data.count; 
            const characters = [];
            for(const element of data.results) {
                const characterId = element.url.split('/')[5]
                const homeworldId = element.homeworld.split('/')[5]
                const homeworld = await getHomeworld(homeworldId)
                const character = {
                    name: element.name,
                    id: characterId,
                    homeworld: homeworld,
                    gender: element.gender,
                    imgUrl: `https://starwars-visualguide.com/assets/img/characters/${characterId}.jpg`
                }
                characters.push(character)             
            }
            processedData.characters = characters
            return processedData;
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
);

export const charactersSlice = createSlice({
    name: 'characters',
    initialState,
    reducers: {
        addToFaforite: (state,action) => {
            if(state.favoriteCharacters.indexOf(action.payload ) === -1) {
                // console.log(action.payload)
                state.favoriteCharacters.push(action.payload)
            }
        },
        removeFromFaforite: (state,action) => {
            state.favoriteCharacters = state.favoriteCharacters.filter(item => item.name !== action.payload)
        },
        setCurrentPageNumber: (state, action) => {
            state.currentPageNumber = action.payload
        }
    },
    extraReducers: {
        [fetchCharacters.pending]: (state) => {
            state.status = 'loading';
            state.error = null;
        },
        [fetchCharacters.fulfilled]: (state, action) => {
            state.status = 'resolved';
            state.characters = action.payload.characters;
            state.charactersNumber = action.payload.charactersNumber;
        },
        [fetchCharacters.rejected]: (state, action) => {
            state.status = 'rejected';
            state.error = action.payload
        }
        // [fetchHomeworld.pending]:(state) => {
        //     state.status = 'loading';
        //     state.error = null;
        // },
        // [fetchHomeworld.fulfilled]:(state, action) => {
        //     state.status = 'resolved';
        //     // const { data, charName } = action.payload
        //     // console.log( charName, data.name)
        //     console.log(action.payload)
        // },
        // [fetchHomeworld.rejected]:(state, action) => {
        //     state.status = 'rejected';
        //     state.error = action.payload
        // }
    }
})




export const { setCurrentPageNumber, addToFaforite, removeFromFaforite } = charactersSlice.actions
export default charactersSlice.reducer