
import CharactersPage from '../characters-page';
import FavoriteCharactersPage from '../favorite-characters-page';
import Header from '../header';

import './App.css';

const getData = async (url) => {
  const res = await fetch(url);
  if (!res.ok) { 
    throw new Error(res.status)
  }
  const data = await res.json();
  return data;
}

getData('https://swapi.dev/api/people')
  .then((data) => {
    console.log(data)
  })
  .catch((err) => {
    console.log(`Request failed ${err}`);
  });

const App = () => {
  return (
    <div className="App">
      <Header/>
      <CharactersPage />
      <FavoriteCharactersPage />

    </div>
  );
}

export default App;
