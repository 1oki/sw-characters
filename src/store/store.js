import { configureStore } from "@reduxjs/toolkit";
import charactersSlice from "./charactersSlice";

// Redux store
export const store = configureStore({
    reducer: {
        characters: charactersSlice
    }
}) 