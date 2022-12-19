import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToFaforite } from '../../store/charactersSlice';

const CharactersCard = ({ charData }) => {
  const { favoriteCharacters } = useSelector(state => state.characters);
  const dispatch = useDispatch();

  const charId = charData.url.split('/')[5]
  let imgId = +charId;

  const saveToLocalStorage = () => {
    const serializedNames = JSON.stringify(favoriteCharacters);
    localStorage.setItem('favoriteCharacters', serializedNames)
  }

  const onFavoriteAdded = () => {
    const charName = charData.name
    dispatch(addToFaforite(charName));
    if(favoriteCharacters.includes(charName)){
      alert(`${charName} has already been added to favorites earlier`)
    } else {alert(`You've added ${charName} to favorite`)}
  }

  useEffect(()=> {
    const storage = JSON.parse(localStorage.getItem('favoriteCharacters'))
    if(storage) {
      storage.map(char => {
        dispatch(addToFaforite(char))
      })
    }
    saveToLocalStorage()
  }, [onFavoriteAdded])
  
  return (
    <div className="text-center border-2 border-neutral-800 rounded-lg pb-5">
        <div className="flex items-center justify-center p-3">
          <img className="rounded-lg" alt="description" src={`https://starwars-visualguide.com/assets/img/characters/${imgId}.jpg`} />
        </div>
        <h4>{charData.name}</h4>
        <img onClick={onFavoriteAdded} title="Add To Favorite" data-emoji="♥" className="mx-auto w-5 mt-2 cursor-pointer" alt="♥" aria-label="♥" src="https://fonts.gstatic.com/s/e/notoemoji/15.0/2665/32.png" />
    </div>
  );
}
  
export default CharactersCard;