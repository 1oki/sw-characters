import { useState, useEffect } from "react";

const SearchPanel = (props) => {
    const [term, setTerm] = useState('')

    const onSearchChange = (event) => {
        setTerm(event.target.value)
        event.preventDefault();
        console.log('onSearchChange')       
    }

    useEffect(() => {
        props.onSearchChange(term)
    },[term])

    return (
        <div className='container mx-auto mt-5 '>
            <form className="input-group mb-3 block" onSubmit={onSearchChange}>
              <input type="text" 
                className=" bg-neutral-700 font-medium block rounded-lg p-3 lg:w-1/2 md:w-3/4 sm:w-full focus:border-yellowMain outline-yellowMain placeholder-yellowMain" 
                value={term} 
                onChange={onSearchChange}  
                placeholder="Type character's name to search"/>
            </form>
        </div>        
    )
}

export default SearchPanel;