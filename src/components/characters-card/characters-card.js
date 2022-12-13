
// characters img
// characters name
// characters homeworld
// like

const CharactersCard = () => {
    return (
      <div className="characters-card">
        <h3>CharactersCard</h3>
        <img className="characters-image" alt="description" src={`https://starwars-visualguide.com/assets/img/characters/1.jpg`} />
            <h4>Characters name</h4>
            <h4>Characters homeworld</h4>
            <h4>Add to favorite btn</h4>
      </div>
    );
}
  
export default CharactersCard;