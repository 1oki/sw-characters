import { useDispatch, useSelector } from "react-redux";
import { setCurrentPageNumber } from "../../store/charactersSlice";


/**
 * Pagination component renders a list of page numbers. Each number is a button that will update the currentPageNumber in the Redux store when clicked.
 * The component uses the charactersNumber and currentPageNumber from the Redux store to determine the page numbers to display.
 * The component also uses the setCurrentPageNumber action creator to update the Redux store when a page number button is clicked.
 * The component renders a list of page numbers in the form of a ul with li elements. Each li element is a button with a number, and the button is styled differently if the number matches the current page number.
 * The component is styled with CSS to be a flex row with justify-around and centering.
 * The component is also styled with CSS to have a yellow border when the button is clicked.
 */

const Pagination = () => {
    const dispatch = useDispatch();
    const { charactersNumber, currentPageNumber } = useSelector(state => state.characters)
    const pageNumbers = [];

    for(let i = 1; i <= Math.ceil(charactersNumber/10); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="container mx-auto  sm:w-3/4 md:w-1/2 lg:w-1/3 py-5">
            <ul className="flex-row flex justify-around mx-auto  text-center ">
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


