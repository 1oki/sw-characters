import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToFaforite, removeFromFaforite } from '../../store/charactersSlice';
import yellowHeartIcon from './yellow-heart.png'
import yellowContourHeartIcon from './yellow-contour-heart.png'

const CharactersCard = ({ charData }) => {
  const { favoriteCharacters } = useSelector(store => store.characters);
  const favoriteCharactersRef = useRef(favoriteCharacters)
  const dispatch = useDispatch();
  const charName = charData.name;

  const isFavorite = (charName) => (favoriteCharacters.find((item) => item.name === charName) ? true : false)

  const iconSrc = (isFavorite(charName) ? yellowHeartIcon : yellowContourHeartIcon)

  const onToggleFavorite = () => {
    if(!isFavorite(charName)) {
      dispatch(addToFaforite(charData))
    }
    if(isFavorite(charName)) {
      dispatch(removeFromFaforite(charName))
    }
  }

  useEffect(() => {
      if(favoriteCharactersRef.current !== favoriteCharacters) {
        localStorage.setItem('favoriteCharacters', JSON.stringify(favoriteCharacters))
      }
  }, [favoriteCharacters])
  
  return (
    <div className="text-center border-2 border-neutral-800 rounded-lg pb-5">
        <div className="flex items-center justify-center p-3">
          <img className="rounded-lg" alt="description" src={charData.imgUrl} />
        </div>
        <h4>{charData.name}</h4>
        <h4>Homeworld: {charData.homeworld}</h4>
        <img onClick={onToggleFavorite} title="Add To Favorite" data-emoji="♥" className="mx-auto w-5 mt-2 cursor-pointer" alt="♥" aria-label="♥" src={iconSrc} />
    </div>
  );
}
  
export default CharactersCard;