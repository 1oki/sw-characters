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
            // console.log('page ',currentPageNumber)
            const res = await fetch (`https://swapi.dev/api/people/?page=${currentPageNumber}`)
            if(!res.ok){
                throw new Error('Server error');
            }
            const data = await res.json();
            console.log(data)
            // console.log(data.count)
            //const preparedData = addId(currentPageNumber, data)
            return data;
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
);

// const addId = (currentPageNumber, data) => {
//     for(const key of Object.keys(data.results)) {
//         console.log(`${key}`);
//         console.log('page num ', currentPageNumber);
        
//         let id = currentPageNumber * 10 - 9 + (+key);
//         console.log('id ',id);
        
//         data.results.id = id;
//         console.log('data.results.id ', data.results.id);
//         console.log('  ');

//     }
//     return data;
// }



export const charactersSlice = createSlice({
    name: 'characters',
    initialState,
    reducers: {
        addToFaforite: (state,action) => {
            // console.log(`Add to favorite char with id ${action.payload}`)
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