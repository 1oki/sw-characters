import { useState, useEffect } from "react";


/**
 * The GenderFilterSelectForm component renders a select form element to filter
 * characters by their gender. It stores the user's filter selection in the
 * component's state and calls the onGenderFilterChange callback function
 * provided by the parent with the current filter selection when the user
 * selects a different option from the form or when the component mounts.
 * The component renders a select element with options for all characters, male
 * characters, female characters, and characters with unknown gender.
 * @param {Object} props - The props object should contain a function to be called
 * when the user selects a different option from the form. The function should
 * accept a single string argument, the current filter selection.
 * @returns {JSX.Element} The rendered component.
 */
const GenderFilterSelectForm = (props) => {
    const [genderFilterValue, setGenderFilterValue ] = useState('')

    const onGenderFilterChange = (event) => {
        setGenderFilterValue(event.target.value)
        event.preventDefault();    
    }

    useEffect(() => {
        // Forwards gender filter value to the parent component 
        props.onGenderFilterChange(genderFilterValue)
    },[genderFilterValue])

    return (
        <div className='container mx-auto  mt-5 '>
            <select defaultValue={genderFilterValue} onChange={onGenderFilterChange} className=" bg-neutral-700 font-medium block rounded-lg md:pl-2 p-3 w-full focus:border-yellowMain outline-yellowMain placeholder-yellowMain">
                <option value="">All Characters</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="n/a">Not Applicable</option>
            </select>
        </div>
    )
}

export default GenderFilterSelectForm;