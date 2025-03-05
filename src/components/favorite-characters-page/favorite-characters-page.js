import { useSelector, useDispatch } from "react-redux";
import CharacterImage from "../character-image/character-image";
import { removeFromFavorite } from "../../store/charactersSlice";


/**
 * FavoriteCharactersPage component renders a list of characters that are marked as favorite.
 * It fetches the favoriteCharacters from the Redux store and maps over them to render a CharacterImage, name, homeworld, and a button to remove the character from the favorite list.
 * If the favoriteCharacters array is empty, it renders a message saying "No Favorite Characters".
 * The component uses the useDispatch hook to get the dispatch function and the useSelector hook to get the favoriteCharacters from the Redux store.
 * The component renders a grid of CharacterImages and text.
 * The component is styled with CSS to have a yellow border when the button is clicked.
 * @returns {JSX.Element} The rendered component displaying favorite characters and controls.
 */

const FavoriteCharactersPage = () => {

  const dispatch  = useDispatch();  
  const favoriteCharacters = useSelector(store => store.characters.favoriteCharacters)

  if(favoriteCharacters.length === 0) {
    return <div>No Favorite Characters</div>
  }
  return (
    <div className="container mx-auto mt-5 ">
      <div className="container mx-auto grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 llg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 mt-5">
            {favoriteCharacters.map((char, index) => 
              <div key={index} className="text-center border-2 border-neutral-800 rounded-lg pb-5">
                <div className="flex items-center justify-center p-3">
                  <CharacterImage url={char.imgUrl}/>
                </div>
              <h4>{char.name}</h4>
              <h4>Homeworld: {char.homeworld}</h4>
              <button className="rounded-md py-2 px-4 border border-transparent text-center text-sm bg-neutral-700 transition-all shadow-md hover:shadow-lg focus:bg-neutral-700 focus:shadow-none active:bg-neutral-700 hover:bg-neutral-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2 mt-2" onClick={() => dispatch(removeFromFavorite(char.id))} type="button">Remove from favorite</button>
            </div>
            )}
      </div>
    </div>
  );
}
  
export default FavoriteCharactersPage;