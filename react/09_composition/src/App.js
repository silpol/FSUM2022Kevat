import logo from './logo.svg';
import './App.css';
import ContactCard from './components/ContactCard';
import NamedChildren from './components/NamedChildren';

function App() {
  return (
    <div className="App">
      <ContactCard>
        <h3>Simple Contact Card</h3>
      </ContactCard>
      <ContactCard>
        My Card
      </ContactCard>
      <NamedChildren
        header={<h2>Complex Contact Card</h2>}
        media={<h3>media is here</h3>}
        content={<p>Content here</p>}/>
      <NamedChildren
        header={<h2>no media card</h2>}
        content={<p>content here</p>}/>
    </div>
  );
}

export default App;
