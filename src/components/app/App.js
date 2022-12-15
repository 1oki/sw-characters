
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import CharactersPage from '../characters-page';
import FavoriteCharactersPage from '../favorite-characters-page';
import Header from '../header';
import Pagination from '../pagination';

import { fetchCharacters } from '../../charactersSlice';

const App = () => {
  const {characters, currentPageNumber } = useSelector(state => state.characters)
  // const currentPageNumber = useSelector(state => state.characters.currentPageNumber)
  const dispatch = useDispatch()
  const [term, setTerm] = useState('')

  useEffect(() => {
    dispatch(fetchCharacters(currentPageNumber));
  },[dispatch, currentPageNumber])

  const onSearchSubmit = (event) => {
    event.preventDefault();
  }
  const search = (chars, term) => {
    if(term.length === 0) {
      return chars;
    }
    return chars.filter((char) => {
      return char.name.toLowerCase().indexOf(term.toLowerCase()) > -1;
    })
  }

  const visibleCharacters = search(characters, term);

  return (
    <div className=" text-yellowMain bg-neutral-900 w-3/5 mx-auto">
        <Router>
          <Header/>
          
          <div className='container mx-auto mt-5 '>
            <form className="input-group mb-3 block" onSubmit={onSearchSubmit}>
              <input type="text" className=" bg-neutral-700 font-medium block rounded-lg p-3 w-1/2 outline-yellowMain placeholder-yellowMain" value={term} onChange={(event) => setTerm(event.target.value)}  placeholder="Type character's name to search"/>
            </form>
          </div>
          <Routes>
            <Route path="" element={<CharactersPage chars={visibleCharacters}/>}/>
            <Route path="favorite" element={<FavoriteCharactersPage/>}/>
          </Routes>
          <Pagination/>
        </Router>
        
    </div>
  );
}

export default App;
