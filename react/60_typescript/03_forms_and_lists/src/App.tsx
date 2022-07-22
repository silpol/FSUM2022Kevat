import React,{useState} from 'react';
import logo from './logo.svg';
import './App.css';
import ShoppingList from './components/ShoppingList';
import ShoppingItem from './models/ShoppingItem';
import ShoppingForm from './components/ShoppingForm';

interface State {
  list:ShoppingItem[];
  id:number;
}

function App() {

  const [state,setState] =useState<State>({
    list:[],
    id:100
  })

  const addItem = (item:ShoppingItem) => {
    item.id=state.id;
    setState((state) => {
      return {
        list:state.list.concat(item),
        id:state.id+1
      }
    })
  }

  const removeItem = (id:number) => {
    setState((state) => {
      let tempList = state.list.filter(item => item.id !== id);
      return {
        ...state,
        list:tempList
      }
    })
  }

  return (
    <div className="App">
      <ShoppingForm addItem={addItem}/>
      <hr/>
      <ShoppingList list={state.list} removeItem={removeItem}/>
    </div>
  );
}

export default App;
