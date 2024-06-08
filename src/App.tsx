import './App.css';
import Football from './Football'; 
import { MatchData } from './types';

function App() {
  const matchesData: MatchData[] = []; 

  return (
    <div className="App">
      <Football matchesData={matchesData} />
     
    </div>
  );
}

export default App;
