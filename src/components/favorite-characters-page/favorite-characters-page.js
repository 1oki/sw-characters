import { useSelector } from "react-redux";

const FavoriteCharactersPage = () => {

  const favoriteCharacters = useSelector(state => state.characters.favoriteCharacters)
  console.log(favoriteCharacters)  
  return (
    <div className="favorite-characters">
      Favorite Characters List
      <ul>
        {favoriteCharacters.map((char, index) => 
          <li key={index}>{char}</li>
        )}
      </ul>  
    </div>
  );
}
  
export default FavoriteCharactersPage;