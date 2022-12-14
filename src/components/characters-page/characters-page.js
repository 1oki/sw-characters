// import { useDispatch, useSelector } from 'react-redux';
// characters page
// characters cards
// search by name
// pagination

import CharacterCard from "../character-card";

const CharactersPage = ({ chars }) => {
  // const chars = useSelector(state => state.characters.characters)
  // const dispatch = useDispatch()

    return (
      <div className="container mx-auto mt-11 ">
        <h2>All Star Wars Characters</h2> 
        <div className="container mx-auto grid grid-cols-3 gap-10 mt-10">
          {/* <CharacterCard />   
          <CharacterCard /> 
          <CharacterCard />            */}
              {chars.map(char => 
                <CharacterCard key={char.id} name={char.name}/>
                )}
 
        </div>
        
      </div>
    );
}
  
export default CharactersPage;