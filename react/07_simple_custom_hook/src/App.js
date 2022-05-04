import logo from './logo.svg';
import './App.css';
import {useCount} from './util/usecount';

function App() {
    const [value, add, subtract] = useCount(10);

  return (
    <div className="App">
        <h2>Value:{value}</h2>
        <br/>
        <button onClick={add}>Add</button>
        <button onClick={subtract}>Subtract</button>
    </div>
  );
}

export default App;
