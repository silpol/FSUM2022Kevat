import logo from './logo.svg';
import './App.css';
import {useState,useEffect} from 'react';
import ShoppingForm from './components/ShoppingForm';
import NavBar from './components/Navbar';

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
             if(response.Ok) {
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
                    default:
                        return;
                }
             } else {
                // Handle all different failed requests for the backend
                switch(urlRequest.action) {
                    case "getitem":
                        console.log("Failed to retrieve shopping list. Server responded with a status  ",response.status)
                        return;
                    case "additem":
                        console.log("Failed to add new item. Server responded with a status  ",response.status)
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

  return (
    <div className="App">
        <NavBar/>
        <hr/>
        <ShoppingForm addShoppingItem={addShoppingItem}/>
    </div>
  );
}

export default App;
