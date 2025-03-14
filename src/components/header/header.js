import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchCharacters, setSearchPhrase } from '../../store/charactersSlice';


/**
 * The Header component renders a navigation bar with two links: "Main" and "Favorite Characters". 
 * When the "Main" link is clicked, it fetches the characters from the API and resets the search phrase to empty string.
 */

const Header = () => {
    const dispatch = useDispatch() 
    return (
        <div className=" border-b-2 border-neutral-800 py-2">
            <div className='container mx-auto xs:block md:flex justify-between pt-2 '>
                <Link className='inline-block align-middle xs:mb-5 sm:mb-0' to={"/"}>
                    <h1 className='text-2xl sm:text-3xl md:text-5xl' 
                        onClick={() => {
                            dispatch(fetchCharacters(1))
                            dispatch(setSearchPhrase(''))
                        }}>Star Wars Characters</h1>
                </Link>
                <div className=' md:w-1/3 lg:w-1/4 space-x-5 text-lg block xs:flex md:flex justify-between'>
                    <Link className='hover:underline inline-block self-end leading-6' to={"/"} onClick={() => {
                            dispatch(fetchCharacters(1))
                            dispatch(setSearchPhrase(''))
                        }}>Main</Link>
                    <Link className='hover:underline inline-block self-end leading-6' to={"/favorite"}>Favorite Characters</Link>
                </div>
            </div>
        </div>
    );
}
  
export default Header;