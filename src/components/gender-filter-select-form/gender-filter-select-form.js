import { useState, useEffect } from "react";

const GenderFilterSelectForm = (props) => {
    const [genderFilterValue, setGenderFilterValue ] = useState('')

    const onGenderFilterChange = (event) => {
        setGenderFilterValue(event.target.value)
        event.preventDefault();
        console.log('onFilterChange')       
    }

    useEffect(() => {
        props.onGenderFilterChange(genderFilterValue)
    },[genderFilterValue])

    return (
        <div className='container mx-auto mt-5 '>
            <select defaultValue={genderFilterValue} onChange={onGenderFilterChange} className=" bg-neutral-700 font-medium block rounded-lg p-3 lg:w-1/2 md:w-3/4 sm:w-full focus:border-yellowMain outline-yellowMain placeholder-yellowMain">
                <option value="">All Characters</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="n/a">Not Applicable</option>
            </select>
        </div>
    )
}

export default GenderFilterSelectForm;