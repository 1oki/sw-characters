import { createSlice } from "@reduxjs/toolkit";

export const charactersSlice = createSlice({
    name: 'characters',
    initialState: {
        loading: false,
        characters: [
            {
                id: 1,
                name: "Luke Skywalker",
                homeworld: "https://swapi.dev/api/planets/1/",
                isFavorite: false
            },
            {
                id: 2,
                name: "C-3PO",
                homeworld: "https://swapi.dev/api/planets/1/",
                isFavorite: false
            },
            {
                id: 3,
                name: "C-3PO",
                homeworld: "https://swapi.dev/api/planets/1/",
                isFavorite: false
            },
            {
                id: 4,
                name: "C-3PO",
                homeworld: "https://swapi.dev/api/planets/1/",
                isFavorite: false
            },
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
        addToFaforite: (state,action) => {
            console.log(`Add to favorite char with id ${action.payload}`)
        }
    }
})

export const { loadingStarted, loadingFinished, addCharacters, addToFaforite } = charactersSlice.actions
export default charactersSlice.reducer