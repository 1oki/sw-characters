
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import CharactersPage from '../characters-page';
import FavoriteCharactersPage from '../favorite-characters-page';
import Header from '../header';

import { addCharacters } from '../../charactersSlice';

// const getData = async (url) => {
//   const res = await fetch(url);
//   if (!res.ok) { 
//     throw new Error(res.status)
//   }
//   const data = await res.json();
//   return data;
// }

// getData('https://swapi.dev/api/people')
//   .then((data) => {
//     console.log(data)
//   })
//   .catch((err) => {
//     console.log(`Request failed ${err}`);
//   });

const App = () => {
  const chars = useSelector(state => state.characters.characters)
  const dispatch = useDispatch()

  return (
    <div className=" text-yellowMain bg-neutral-900">
        <Router>
          <Header/>
          <button onClick={() => dispatch(addCharacters(prompt()))}>add char</button>
          <Routes>
            <Route path="" element={<CharactersPage chars={chars}/>}/>
            <Route path="favorite" element={<FavoriteCharactersPage/>}/>
            
          </Routes>
        </Router>
    </div>
  );
}

export default App;
