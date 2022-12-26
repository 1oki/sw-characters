import { useSelector } from "react-redux";

const FavoriteCharactersPage = () => {

  const favoriteCharacters = useSelector(store => store.characters.favoriteCharacters)
  console.log(favoriteCharacters)  

  if(favoriteCharacters.length === 0) {
    return <div>No Favorite Characters</div>
  }
  return (
    <div className="container mx-auto mt-5 ">
      <div className="container mx-auto grid lg:grid-cols-5 gap-10 md:grid-cols-2 sm:grid-cols-1 mt-5">
            {favoriteCharacters.map((char, index) => 
              <div key={index} className="text-center border-2 border-neutral-800 rounded-lg pb-5">
                <div className="flex items-center justify-center p-3">
                  <img className="rounded-lg" alt="description" src={char.imgUrl} />
                </div>
              <h4>{char.name}</h4>
              <h4>{char.homeworld}</h4>
            </div>
            )}
      </div>
    </div>
  );
}
  
export default FavoriteCharactersPage;