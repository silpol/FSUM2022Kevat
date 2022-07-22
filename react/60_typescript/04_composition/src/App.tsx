import React from 'react';
import logo from './logo.svg';
import './App.css';
import NamedChildren from './components/NamedChildren';
import ContactCard from './ContactCard';

function App() {
  return (
    <div className="App">
      <ContactCard>
        Simple Contact Card
      </ContactCard>
      <ContactCard>
        <h2>Big Header</h2>
        <h4>Header</h4>
        <h6>Small Header</h6>
      </ContactCard>
      <NamedChildren
        header={<h2>Named Card</h2>}
        media={<p>Media area</p>}
        content={<p>Content Area</p>}
      />
      <NamedChildren
        header={<h2>No media</h2>}
        content={<p>Content area</p>}
      />
    </div>
  );
}

export default App;
