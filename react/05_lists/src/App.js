import logo from './logo.svg';
import './App.css';
import {useState} from 'react';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';

function App() {

    const [state,setState] = useState ({
        list:[],
        id:100
    })

    const addContact = (contact) => {
        contact.id = state.id;
        setState((state) => {
            return {
                list:state.list.concat(contact),
                id:state.id+1
            }
        })
    }

    const removeFromList = (id) => {
        setState((state) => {
            let templist = state.list.filter(contact => contact.id !==id )
            return{
                ...state,
                list:templist
            }
        })
    }

  return (
    <div className="App">
        <ContactForm addContact={addContact}/>
        <hr/>
        <ContactList list={state.list} removeFromList={removeFromList}/>
    </div>
  );
}

export default App;
