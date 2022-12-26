import { useSelector } from 'react-redux';
import { useState } from 'react';


import Pagination from '../pagination';
import CharacterCard from "../character-card";
import SearchPanel from '../search-panel/search-panel';
import Spinner from '../spinner';
import GenderFilterSelectForm from '../gender-filter-select-form';

const CharactersPage = () => {
  const [ searchTerm, setSearchTerm ] = useState('')
  const [ genderFilterValue, setGenderFilterValue ] = useState('') 
  const { characters, error, status } = useSelector(store => store.characters)

  // console.log('characters', characters)
  
  const onSearchChange = (searchTerm) => {
    setSearchTerm(searchTerm)
  }

  const onGenderFilterChange = (genderFilterValue) => {
    setGenderFilterValue(genderFilterValue)
  }

  const filter = (chars, filterParam, filterValue) => {
    if(filterParam === 'name'){
      if(filterValue.length === 0) {
        return chars;
      }
      return chars.filter((char) => {
        return char[filterParam].toLowerCase().indexOf(filterValue.toLowerCase()) > -1;
      })
    }
    if(filterParam === 'gender') {
      if(filterValue === '') {
        return chars;
      }
      return chars.filter((char) => {
        return char[filterParam] === filterValue;
      })
    }
  }

  const filteredCharacters = filter(characters, 'gender', genderFilterValue);
  const visibleCharacters = filter(filteredCharacters, 'name', searchTerm);

  if(status === 'loading') {
    return <Spinner />
  }

  return (
    <div className="container mx-auto mt-5 ">
      <div className="flex">
        <SearchPanel onSearchChange={onSearchChange}/>
        <GenderFilterSelectForm onGenderFilterChange={onGenderFilterChange}/>
      </div>
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