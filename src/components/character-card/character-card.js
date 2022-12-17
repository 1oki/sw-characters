import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToFaforite } from '../../charactersSlice';

const CharactersCard = ({ name, elementIndex }) => {
  const { currentPageNumber, favoriteCharacters } = useSelector(state => state.characters);
  const dispatch = useDispatch();
  let id = currentPageNumber * 10 - 9 + elementIndex;
  // "starwars-visualguide" has a bug with /assets/img/characters/17, so here is the hack to avoid it
  if(id >= 17) {
    id += 1
  }

  const saveToLocalStorage = () => {
    const serializedNames = JSON.stringify(favoriteCharacters);
    localStorage.setItem('favoriteCharacters', serializedNames)
  }

  const onFavoriteAdded = () => {
    dispatch(addToFaforite(name));
    console.log('favoriteCharacters', favoriteCharacters)
    // saveToLocalStorage()
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
          <img className="rounded-lg" alt="description" src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`} />
        </div>
        <h4>{name}</h4>
        <h4>Character's homeworld</h4>
        <img onClick={onFavoriteAdded} data-emoji="♥" className="mx-auto w-5 mt-2 cursor-pointer" alt="♥" aria-label="♥" src="https://fonts.gstatic.com/s/e/notoemoji/15.0/2665/32.png" />
    </div>
  );
}
  
export default CharactersCard;