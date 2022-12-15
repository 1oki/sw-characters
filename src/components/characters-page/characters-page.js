import { useSelector } from 'react-redux';
// characters page
// characters cards
// search by name
// pagination

import CharacterCard from "../character-card";

const CharactersPage = ({ chars }) => {
  // const chars = useSelector(state => state.characters.characters)
  // const dispatch = useDispatch()
  const { error, status } = useSelector(state => state.characters)

    return (
      <div className="container mx-auto mt-5 ">
        {status === 'loading' && <h2>Loading...</h2>}
        {error && <h2>An error occurred: {error}</h2>}

        <div className="container mx-auto grid grid-cols-5 gap-10 mt-5">
              {chars.map((char, index) => 
                <CharacterCard key={index} elementIndex={index} name={char.name} />
              )}
 
        </div>
        
      </div>
    );
}
  
export default CharactersPage;