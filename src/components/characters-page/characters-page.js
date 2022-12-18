import { useSelector } from 'react-redux';
import { useState } from 'react';

import Pagination from '../pagination';
import CharacterCard from "../character-card";
import SearchPanel from '../search-panel/search-panel';
import Spinner from '../spinner';

const CharactersPage = () => {
  const [ term, setTerm ] = useState('')
  const { characters, error, status } = useSelector(state => state.characters)
  
  const onSearchChange = (term) => {
    setTerm(term)
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

  if(status === 'loading') {
    return <Spinner />
  }

  return (
    <div className="container mx-auto mt-5 ">
      <SearchPanel onSearchChange={onSearchChange}/>
      <div className="container mx-auto grid lg:grid-cols-5 gap-10 md:grid-cols-2 sm:grid-cols-1 mt-5">
            {visibleCharacters.map((char, index) => 
              <CharacterCard key={index} charData={char} />
            )}
      </div>
      {error && <h2>An error occurred: {error}</h2>}
      {<Pagination/>}
    </div>
  );
}
  
export default CharactersPage;