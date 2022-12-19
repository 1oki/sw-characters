import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCurrentPageNumber } from '../../store/charactersSlice';

const Header = () => {
    const dispatch = useDispatch() 
    return (
        <div className=" border-b-2 border-neutral-800 py-2">
            <div className='container mx-auto xs:block sm:flex justify-between pt-2 '>
                <Link className='inline-block align-middle xs:mb-5 sm:mb-0' to={"/"}><h1 className='md:text-5xl sm:text-3xl' onClick={() => dispatch(setCurrentPageNumber(1))}>Star Wars Characters</h1></Link>
                <div className='lg:w-1/4 md:w-1/3 sm:space-x-5 text-lg block xs:block sm:flex md:flex justify-between'>
                    <Link className='hover:underline inline-block self-end leading-6' to={"/"}>Main</Link>
                    <Link className='hover:underline inline-block self-end leading-6' to={"/favorite"}>Favorite Characters</Link>
                </div>
            </div>
        </div>
    );
}
  
export default Header;