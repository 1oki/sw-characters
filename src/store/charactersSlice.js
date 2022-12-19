import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    error: null,
    charactersNumber: null,
    currentPageNumber: 1,
    characters: [],
    favoriteCharacters: []
}

export const fetchCharacters = createAsyncThunk(
    'characters/fetchCharacters',
    async (currentPageNumber, {rejectWithValue}) => {
        try{
            const res = await fetch (`https://swapi.dev/api/people/?page=${currentPageNumber}`)
            if(!res.ok){
                throw new Error('Server error');
            }
            const data = await res.json();
            return data;
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
                state.favoriteCharacters.push(action.payload)
            } 
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
            state.characters = action.payload.results;
            state.charactersNumber = action.payload.count;
        },
        [fetchCharacters.rejected]: (state, action) => {
            state.status = 'rejected';
            state.error = action.payload
        }
    }
})




export const { setCurrentPageNumber, addToFaforite } = charactersSlice.actions
export default charactersSlice.reducer