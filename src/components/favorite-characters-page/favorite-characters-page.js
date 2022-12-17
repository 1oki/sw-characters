import { useSelector } from "react-redux";

const FavoriteCharactersPage = () => {

  const favoriteCharacters = useSelector(state => state.characters.favoriteCharacters)
  console.log(favoriteCharacters)  

  if(favoriteCharacters.length === 0) {
    return <div>No Favorite Characters</div>
  }
  return (
    <div className="favorite-characters">
      <h2 className="pb-2">Favorite Characters List</h2>
      <ul className="">
        {favoriteCharacters.map((char, index) => 
          <li className="border-t-2 border-neutral-800" key={index}>{char}</li>
        )}
      </ul>  
    </div>
  );
}
  
export default FavoriteCharactersPage;