import { useSelector } from 'react-redux';
import { useState, useCallback, useEffect } from 'react';

import Pagination from '../pagination';
import CharacterCard from "../character-card";
import SearchPanel from '../search-panel/search-panel';
import Spinner from '../spinner';
import GenderFilterSelectForm from '../gender-filter-select-form';


/**
 * CharactersPage component is responsible for displaying a list of characters
 * with filtering and pagination functionality. It allows users to search for
 * characters by name, filter them by gender, and paginate through the results.
 * The component uses Redux to access the characters data from the store and
 * manages the gender filter state locally. It renders a spinner while data is
 * being loaded, displays the search results, and shows any errors that occur.
 * 
 * @returns {JSX.Element} The rendered component displaying characters and controls.
 */

const CharactersPage = () => {
  const [ genderFilterValue, setGenderFilterValue ] = useState('') 
  const { characters, error, status, searchPhrase } = useSelector(store => store.characters)
  
  const onGenderFilterChange = useCallback((genderFilterValue) => {
    setGenderFilterValue(genderFilterValue)
  }, [])

  /**
   * Filters an array of characters by gender.
   * If the gender filter is empty, it returns the original array.
   * @param {array} chars - The array of characters to filter.
   * @param {string} filterValue - The gender filter value.
   * @returns {array} The filtered array of characters.
   */

  const filterGender = (chars,  filterValue) => {
    if(filterValue === '') {
      return chars;
    }
    return chars.filter((char) => {
      return char['gender'] === filterValue;
    })
  }

  const filteredCharacters = filterGender(characters,  genderFilterValue);

  if(status === 'loading') {
    return <Spinner />
  }

  return (
    <div className="container mx-auto mt-5 ">
      <div className="flex flex-between flex-col md:flex-row lg:flex-row">
        <SearchPanel />
        <GenderFilterSelectForm onGenderFilterChange={onGenderFilterChange}/>
      </div>
      {searchPhrase && <div className='p-3 mt-5 text-xl'>Search result for name containing: "{searchPhrase}"</div>}
      <div className="container mx-auto grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 llg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 mt-5">
            {filteredCharacters.map((char, index) => 
              <CharacterCard key={index} charData={char} />
            )}
      </div>
      {error && <h2>An error occurred: {error}</h2>}
      {<Pagination/>}
    </div>
  );
}
  
export default CharactersPage;