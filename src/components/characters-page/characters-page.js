import { useSelector } from 'react-redux';
import Pagination from '../pagination';
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
        <div className="container mx-auto grid lg:grid-cols-5 gap-10 md:grid-cols-2 sm:grid-cols-1 mt-5">
              {chars.map((char, index) => 
                <CharacterCard key={index} elementIndex={index} name={char.name} />
              )}
        </div>
        {status === 'loading' && <h2>Loading...</h2>}
        {error && <h2>An error occurred: {error}</h2>}
        {<Pagination/>}
      </div>
    );
}
  
export default CharactersPage;
// render() {
//   const { person, loading, error } = this.state;

//   const hasData = !(loading || error);
  
//   if (!person) {
//       return <span>Select a person from a list</span>
//   }

//   const errorMessage = error ? <ErrorIndicator/> : null;
//   const spinner = loading ? <Spinner/> : null;
//   const content = hasData ? <PersonView person={person}/> : null;
  
//   return(
//       <div className="person-details card">
//           {errorMessage} 
//           {spinner}
//           {content}
//       </div>
//   )
// }