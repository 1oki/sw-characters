import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToFavorite, removeFromFavorite } from '../../store/charactersSlice';
import yellowHeartIcon from './yellow-heart.png'
import yellowContourHeartIcon from './yellow-contour-heart.png'
import CharacterImage from '../character-image/character-image';


/**
 * Renders a character card with information and an option to toggle its favorite status.
 * Displays the character's image, name, and homeworld.
 * Provides a clickable icon to add or remove the character from the favorites list.
 * The favorite status is determined by checking if the character is in the Redux store.
 * When the favorite status changes, it updates the local storage.
 * 
 * @param {Object} charData - The data of the character to display.
 * @param {string} charData.id - The unique identifier of the character.
 * @param {string} charData.name - The name of the character.
 * @param {string} charData.homeworld - The homeworld of the character.
 * @param {string} charData.imgUrl - The URL of the character's image.
 */

const CharactersCard = ({ charData }) => {
  const { favoriteCharacters } = useSelector(store => store.characters);
  const favoriteCharactersRef = useRef(favoriteCharacters)
  const dispatch = useDispatch();

  const charId = charData.id;
  const isFavorite = favoriteCharacters.find((item) => item.id === charId) ? true : false
  const iconSrc = (isFavorite ? yellowHeartIcon : yellowContourHeartIcon)


  /**
   * Toggles the favorite status of a character.
   * If the character is already a favorite, it will be removed from the favorite list.
   * If the character is not a favorite, it will be added to the favorite list.
   */

  const onToggleFavorite = () => {
    isFavorite ? dispatch(removeFromFavorite(charId)) : dispatch(addToFavorite(charData))
  }

  useEffect(() => {
    // Update local storage when favoriteCharacters changes
    if(favoriteCharactersRef.current !== favoriteCharacters) {
      localStorage.setItem('favoriteCharacters', JSON.stringify(favoriteCharacters))
    }
  }, [favoriteCharacters])
  
  return (
    <div className="text-center border-2 border-neutral-800 sm:m-auto rounded-lg pb-5">
        <div className="flex items-center justify-center p-3">
          <CharacterImage url={charData.imgUrl}/>
        </div>
        <h4>{charData.name}</h4>
        <h4>Homeworld: {charData.homeworld}</h4>
        <img onClick={onToggleFavorite} title="Add To Favorite" data-emoji="♥" className="mx-auto w-5 mt-2 cursor-pointer" alt="♥" aria-label="♥" src={iconSrc} />
    </div>
  );
}
  
export default CharactersCard;