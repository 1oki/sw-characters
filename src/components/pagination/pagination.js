import { useDispatch, useSelector } from "react-redux";
import { setCurrentPageNumber } from "../../charactersSlice";


const Pagination = () => {
    const dispatch = useDispatch();
    const { charactersNumber } = useSelector(state => state.characters)
    console.log('charactersNumber',charactersNumber)
    const pageNumbers = [];

    for(let i = 1; i <= Math.ceil(charactersNumber/10); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="container mx-auto border-b-2 w-1/3 py-5">
            <ul className="inline-flex space-x-10 flex justify-between mx-auto  text-center ">
                {pageNumbers.map( number => (
                    <li key={number} className="cursor-pointer">
                        <span onClick={() => dispatch(setCurrentPageNumber(number))}>
                            {number}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
  
export default Pagination;