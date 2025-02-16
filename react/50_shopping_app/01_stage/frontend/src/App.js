import logo from './logo.svg';
import './App.css';
import {useState,useEffect} from 'react';
import ShoppingForm from './components/ShoppingForm';
import ShoppingList from './components/ShoppingList';
import NavBar from './components/Navbar';
import {Route, Routes} from 'react-router-dom';

function App() {

    const [state, setState] = useState({
        list:[]
    })

    const [urlRequest,setUrlRequest] = useState({
        url:"",
        request:{},
        action:""
    })

    useEffect(() => {
        const fetchData = async () => {
            if(!urlRequest.url) {
                return;
             }
             let response = await fetch(urlRequest.url,urlRequest.request);
             if(response.ok) {
                // Handle all different successful requests for the backend
                switch(urlRequest.action) {
                    case "getlist":
                        let data = await response.json();
                        setState({
                            list:data
                        })
                        return;
                    case "additem":
                        getShoppingList();
                        return;
                    case "removeitem":
                        getShoppingList();
                        return;
                    case "edititem":
                        getShoppingList();
                        return;
                    default:
                        return;
                }
             } else {
                // Handle all different failed requests for the backend
                switch(urlRequest.action) {
                    case "getlist":
                        console.log("Failed to retrieve shopping list. Server responded with a status  ",response.status)
                        return;
                    case "additem":
                        console.log("Failed to add new item. Server responded with a status  ",response.status)
                        return;
                    case "removeitem":
                        console.log("Failed to remove item. Server responded with a status  ",response.status)
                        return;
                    case "edititem":
                        console.log("Failed to edit item. Server responded with a status  ",response.status)
                        return;
                    default:
                        return;
                }
             }
        }
        fetchData();
    },[urlRequest.url,urlRequest.request])

    const getShoppingList = () => {
        setUrlRequest({
            url:"/api/shopping",
            request:{
                method:"GET",
                mode:"cors",
                headers:{"Content-type":"application/json"}
            },
            action:"getlist"
        })
    }

    const addShoppingItem = (item) => {
        setUrlRequest({
            url:"/api/shopping",
            request:{
                method:"POST",
                mode:"cors",
                headers:{"Content-type":"application/json"},
                body:JSON.stringify(item)
            },
            action:"additem"
        })
    }

  const removeFromList = (id) => {
    setUrlRequest({
        url:"/api/shopping/"+id,
        request:{
            method:"DELETE",
            mode:"cors",
            headers:{"Content-type":"application/json"}
        },
        action:"removeitem"
    })
  }

    const editItem = (item) =>  {
        setUrlRequest({
            url:"/api/shopping/"+item.id,
            request:{
                method:"PUT",
                mode:"cors",
                headers:{"Content-type":"application/json"},
                body:JSON.stringify(item)
            },
            action:"edititem"
        })
    }

  return (
    <div className="App">
        <NavBar/>
        <hr/>
        <Routes>
            <Route exact path="/" element = { <ShoppingList list={state.list} removeFromList={removeFromList} editItem={editItem} /> } />
            <Route path="/form" element = { <ShoppingForm addShoppingItem={addShoppingItem}/> }/>
        </Routes>
    </div>
  );
}

export default App;
