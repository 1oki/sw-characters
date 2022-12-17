import { useDispatch, useSelector } from "react-redux";
import { setCurrentPageNumber } from "../../charactersSlice";


const Pagination = () => {
    const dispatch = useDispatch();
    const { charactersNumber, currentPageNumber } = useSelector(state => state.characters)
    // console.log('charactersNumber',charactersNumber)
    const pageNumbers = [];

    for(let i = 1; i <= Math.ceil(charactersNumber/10); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="container mx-auto w-1/3 py-5">
            <ul className="flex-row flex justify-between mx-auto  text-center ">
                {pageNumbers.map( number => (
                    <li key={number} className="cursor-pointer">
                        <div onClick={() => dispatch(setCurrentPageNumber(number))} className={currentPageNumber === number ? "border rounded-full border-yellowMain px-2" : "px-2"}>
                            {number}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
  
export default Pagination;


