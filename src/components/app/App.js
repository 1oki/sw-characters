
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { addToFaforite, fetchCharacters } from '../../store/charactersSlice';
import CharactersPage from '../characters-page';
import FavoriteCharactersPage from '../favorite-characters-page';
import Header from '../header';

const App = () => {
  const { currentPageNumber, favoriteCharacters } = useSelector(store => store.characters)
  const dispatch = useDispatch()

  useEffect(()=> {
    const storage = JSON.parse(localStorage.getItem('favoriteCharacters'))
    if(storage !== favoriteCharacters) {
      if(storage) {
        storage.map(charInfo => {
          dispatch(addToFaforite(charInfo))
        })
      }
    }
  }, [])

  useEffect(() => {
    dispatch(fetchCharacters(currentPageNumber));
  },[currentPageNumber])

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
