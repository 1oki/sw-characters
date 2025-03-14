import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorite, fetchCharacters, searchCharacters } from '../../store/charactersSlice';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CharactersPage from '../characters-page';
import FavoriteCharactersPage from '../favorite-characters-page';
import Header from '../header';


/**
 * The main App component. This is the entry point for the React app.
 * The App component renders the Header, and below it the Routes for the CharactersPage and FavoriteCharactersPage.
 * It also fetches the characters data from the API and puts it in the Redux store when the component mounts.
 * Additionally, it checks if the user has already favorited some characters and if so, adds them to the Redux store.
 */

const App = () => {
    const dispatch = useDispatch();
    const { currentPageNumber, favoriteCharacters, searchPhrase } = useSelector(state => state.characters);

    useEffect(() => {
        // Fetch data from the API when the component mounts and currentPageNumber changes
        searchPhrase ? dispatch(searchCharacters({searchTerm: searchPhrase, pageNumber: currentPageNumber})) : dispatch(fetchCharacters(currentPageNumber));
    }, [currentPageNumber]);

    useEffect(() => {
        // Parse local storage when the component mounts and favoriteCharacters changes. If local storage isn't empty, add characters to the store
        const storage = JSON.parse(localStorage.getItem('favoriteCharacters'))
        if(storage && storage !== favoriteCharacters) {
            storage.map(charInfo => {
                dispatch(addToFavorite(charInfo))
            })
        }
    }, [favoriteCharacters]);

    return (
        <div className=" text-yellowMain bg-neutral-900 w-11/12 sm:w-10/12 md:w-3/4 lg:w-3/5 mx-auto">
            <Router>
                <Header/>
                <Routes>
                    <Route path="/" element={<CharactersPage />}/>
                    <Route path="favorite" element={<FavoriteCharactersPage/>}/>
                </Routes>
            </Router>
        </div>
    );
};

export default React.memo(App);
