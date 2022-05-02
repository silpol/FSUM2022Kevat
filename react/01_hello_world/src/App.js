import logo from './logo.svg';
import './App.css';
import HelloWorld from './HelloWorld';
import HelloFunc from './HelloFunc';

function App() {
  return (
    <div className="App">
        <HelloWorld/>
        <HelloWorld name='Erno'/>
        <HelloFunc/>
        <HelloFunc name='Errno'/>
    </div>
  );
}

export default App;
