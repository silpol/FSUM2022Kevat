import {useReducer} from 'react';
import logo from './logo.svg';
import './App.css';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';

const initialState = {
  list:[],
  id:100
}

const listReducer = (state, action) => {
  let tempList=[];
  switch(action.type){
    case "ADD_TO_LIST":
      action.contact.id=state.id;
      tempList=state.list.concat(action.contact);
      return{
        list:tempList,
        id:state.id+1
      }
    case "REMOVE_FROM_LIST":
      tempList=state.list.filter(contact=> contact.id!=action.id)
      return{
        ...state,
        list:tempList
      }
    default:
      return state;
  }

}

const [state, dispatch] = useReducer(listReducer,initialState);

const addToList = (contact) => {
  dispatch({
    type:"ADD_TO_LIST",
    contact:contact
  })
}

const removeFromList = (id) => {
  dispatch({
    type:"REMOVE_FROM_LIST",
    id:id
  })

}

function App() {
  return (
    <div className="App">
      <ContactForm addContact={addToList}/>
      <hr/>
      <ContactList list={state.list} removeFromList={removeFromList}/>
    </div>
  );
}

export default App;
