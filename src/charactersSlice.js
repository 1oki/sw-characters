import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    error: null,
    charactersNumber: 2,
    currentPageNumber: 3,
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
}

export const fetchCharacters = createAsyncThunk(
    'characters/fetchCharacters',
    async (currentPageNumber, {rejectWithValue}) => {
        try{
            console.log('page ',currentPageNumber)
            const res = await fetch (`https://swapi.dev/api/people/?page=${currentPageNumber}`)
            if(!res.ok){
                throw new Error('Server error');
            }
            const data = await res.json();
            console.log(data)
            console.log(data.count)
            return data;
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
);
// export const fetchCharacters = createAsyncThunk('characters/fetchCharacters',
//     async (state) => {
//         const {currentPageNumber} = state;
//         console.log(currentPageNumber)
//         const res = await fetch (`https://swapi.dev/api/people/?page=${currentPageNumber}`)
//         const data = await res.json();
//         console.log(data)
//         console.log(data.count)
//         return data;
//     }
// );



export const charactersSlice = createSlice({
    name: 'characters',
    initialState,
    reducers: {
        // addCharacters: (state, action) => {
        //     state.characters.push(action.payload)
        // },
        toggleFaforite: (state,action) => {
            console.log(`Add to favorite char with id ${action.payload}`)
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




export const { setCurrentPageNumber } = charactersSlice.actions
export default charactersSlice.reducer