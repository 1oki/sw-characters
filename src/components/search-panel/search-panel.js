import { useState } from "react";


const SearchPanel = () => {
    const [term, setTerm] = useState('')

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
        <div className='container mx-auto mt-5 '>
            <form className="input-group mb-3 block" onSubmit={onSearchSubmit}>
              <input type="text" 
                className=" bg-neutral-700 font-medium block rounded-lg p-3 lg:w-1/2 md:w-3/4 sm:w-full focus:border-yellowMain outline-yellowMain placeholder-yellowMain" 
                value={term} 
                onChange={(event) => setTerm(event.target.value)}  
                placeholder="Type character's name to search"/>
            </form>
          </div>        
    )
}

export default SearchPanel;