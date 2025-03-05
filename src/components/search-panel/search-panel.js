import { useState } from "react";
import { useDispatch } from 'react-redux';
import { searchCharacters } from '../../store/charactersSlice';


/**
 * The SearchPanel component renders a search input field and a search button.
 * It stores the user's search input in the component's state and dispatches an
 * action to search for characters based on the current search term when the
 * search button is clicked or when the Enter key is pressed while the search
 * input field has focus.
 * @returns {JSX.Element} The rendered component.
 */
const SearchPanel = () => {
    const dispatch = useDispatch();
    const [term, setTerm] = useState('')

    /**
     * Handles changes to the search input field. Updates the search term state
     * with the current value of the input field and prevents the default form
     * submission behavior.
     * @param {Event} event - The event that triggered the function.
     */
    const onSearchChange = (event) => {
        setTerm(event.target.value)
        event.preventDefault();   
    }

    /**
     * Handles the search form submission. Dispatches an action to search for characters
     * based on the current search term and resets the page number to 1.
     * @param {Event} event - The event that triggered the function.
     */
    const handleSearchSubmit = (event) => {
        event.preventDefault();
        dispatch(searchCharacters({ searchTerm: term, pageNumber: 1 }));
    };

    return (
        <div className='container mx-auto mt-5 '>
            <form className="input-group  md:pr-2 block" onSubmit={handleSearchSubmit}>
                <div className="flex items-center bg-neutral-700 font-medium rounded-lg p-3 w-full focus:border-yellowMain outline-yellowMain placeholder-yellowMain">
                    <input type="text" 
                        className=" bg-neutral-700 outline-none font-medium block w-full pr-3 placeholder-yellowMain" 
                        value={term} 
                        onChange={onSearchChange}  
                        placeholder="Type name to search"/>
                    <button onClick={handleSearchSubmit} className="btn btn-outline-success border-l-2 pl-2 border-neutral-900" type="submit">Search</button>
                </div>
              
            </form>
        </div>        
    )
}

export default SearchPanel;