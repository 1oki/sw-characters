
// characters img
// characters name
// characters homeworld
// like

const CharactersCard = ({id, name}) => {
    return (
      <div className="text-center border-2 border-neutral-800 rounded-lg pb-5">
          <div className="flex items-center justify-center p-3">
            <img className="rounded-lg" alt="description" src={`https://starwars-visualguide.com/assets/img/characters/1.jpg`} />
          </div>
          <h4>{id}</h4>
          <h4>{name}</h4>
          <h4>Character's homeworld</h4>
          <button>Add to favorite btn</button>
      </div>
    );
}
  
export default CharactersCard;