import { Link } from 'react-router-dom';
// navigation bar

const Header = () => {
    return (
        <div className=" border-b-2 border-neutral-800 py-2">
            <div className='container mx-auto flex justify-between pt-2 '>
            <Link className='inline-block align-middle' to={"/"}><h1 className='text-5xl'>Star Wars Characters</h1></Link>
                <div className='space-x-10 text-lg pr-5 pt-6'>
                    <Link className='hover:underline inline-block ' to={"/"}>Main</Link>
                    <Link className='hover:underline inline-block ' to={"/favorite"}>Favorite Characters</Link>
                </div>
            </div>
        </div>
    );
}
  
export default Header;