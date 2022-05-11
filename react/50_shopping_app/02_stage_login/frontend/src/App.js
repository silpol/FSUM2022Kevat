import logo from './logo.svg';
import './App.css';
import {useState,useEffect} from 'react';
import ShoppingForm from './components/ShoppingForm';
import ShoppingList from './components/ShoppingList';
import NavBar from './components/Navbar';
import LoginPage from './components/LoginPage';
import {Route, Routes} from 'react-router-dom';

function App() {

    const [state, setState] = useState({
        list:[],
        isLogged:false,
        token:"",
        loading:false,
        error:""
    })

    const [urlRequest,setUrlRequest] = useState({
        url:"",
        request:{},
        action:""
    })

    const setLoading = (loading) => {
        setState((state) => {
            return {
                ...state,
                loading:loading,
                error:""
            }
        })
    }

    const setError = (error) => {
    	setState((state) => {
    		return {
    			...state,
    			error:error
    		}
    	})
    }

    const clearState = () => {
        setState({
            list:[],
            isLogged:false,
            token:"",
            loading:false,
            error:""
        })
    }

    useEffect(() => {
        const fetchData = async () => {
            if(!urlRequest.url) {
                return;
             }
             setLoading(true);
             let response = await fetch(urlRequest.url,urlRequest.request);
             setLoading(false);
             if(response.ok) {
                // Handle all different successful requests for the backend
                switch(urlRequest.action) {
                    case "getlist":
                        let data = await response.json();
                        setState((state) => {
                            return {
                                ...state,
                                list:data
                            }
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
                    case "register":
                        setError("Register success!");
                        return;
                    case "login":
                        let token = await response.json();
                        setState((state) => {
                            return {
                                ...state,
                                isLogged:true,
                                token:token.token
                            }
                        })
                        getShoppingList(token.token);
                        return;
                    default:
                        return;
                }
             } else {
                if(response.status === 403) {
                    clearState();
                    setError("Your session has expired. Logging you out!");
                }
                // Handle all different failed requests for the backend
                switch(urlRequest.action) {
                    case "getlist":
                        setError("Failed to retrieve shopping list. Server responded with a status: "+response.status)
                        return;
                    case "additem":
                        setError("Failed to add new item. Server responded with a status: "+response.status)
                        return;
                    case "removeitem":
                        setError("Failed to remove item. Server responded with a status: "+response.status)
                        return;
                    case "edititem":
                        setError("Failed to edit item. Server responded with a status: "+response.status)
                        return;
                    case "register":
                        if(response.status === 409) {
                            setError("Username already in use. Try another");
                        } else {
                            setError("Failed to register new user. Server responded with a status: "+response.status);
                        }
                        return;
                    case "login":
                        setError("Failed to login user. Server responded with a status: "+response.status);
                        return;
                    default:
                        return;
                }
             }
        }
        fetchData();
    },[urlRequest.url,urlRequest.request])

    const register = (user) => {
        setUrlRequest({
            url:"/register",
            request:{
                method:"POST",
                mode:"cors",
                headers:{"Content-type":"application/json"},
                body:JSON.stringify(user)
            },
            action:"register"
        })

    }

    const login = (user) => {
        setUrlRequest({
            url:"/login",
            request:{
                method:"POST",
                mode:"cors",
                headers:{"Content-type":"application/json"},
                body:JSON.stringify(user)
            },
            action:"login"
       })

    }

    const getShoppingList = (token) => {
        let temptoken = state.token;
        if(token) {
            temptoken = token
        }
        setUrlRequest({
            url:"/api/shopping",
            request:{
                method:"GET",
                mode:"cors",
                headers:{"Content-type":"application/json",
                        "token":temptoken}
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
                headers:{"Content-type":"application/json",
                        "token":state.token},
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
            headers:{"Content-type":"application/json",
                    "token":state.token}
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
                headers:{"Content-type":"application/json",
                        "token":state.token},
                body:JSON.stringify(item)
            },
            action:"edititem"
        })
    }

  // Conditional rendering

  let messageArea = <h2></h2>
  if (state.loading) {
    messageArea = <h2>Loading...</h2>
  }
  let tempRender = <Routes>
    <Route exact path="/" element={
            <LoginPage setError={setError} register={register} login={login} />
            } />
    </Routes>
  if(state.isLogged) {
          tempRender = <Routes>
              <Route exact path="/" element = { <ShoppingList list={state.list} removeFromList={removeFromList} editItem={editItem} /> } />
              <Route path="/form" element = { <ShoppingForm addShoppingItem={addShoppingItem}/> } />
          </Routes>
  }


  return (
    <div className="App">
        <NavBar isLogged={state.isLogged}/>
        {messageArea}
        <hr/>
        {tempRender}
    </div>
  );
}

export default App;
