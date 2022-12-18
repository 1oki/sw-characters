
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import CharactersPage from '../characters-page';
import FavoriteCharactersPage from '../favorite-characters-page';
import Header from '../header';

import { fetchCharacters } from '../../charactersSlice';

const App = () => {
  const { currentPageNumber } = useSelector(state => state.characters)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchCharacters(currentPageNumber));
  },[dispatch, currentPageNumber])

  return (
    <div className=" text-yellowMain bg-neutral-900 w-3/5 mx-auto">
        <Router>
          <Header/>
          <Routes>
            <Route path="/" element={<CharactersPage />}/>

            <Route path="favorite" element={<FavoriteCharactersPage/>}/>
          </Routes>
        </Router>
        
    </div>
  );
}

export default App;
