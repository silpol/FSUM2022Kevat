import './App.css';
import {useState,useEffect} from 'react';
import ShoppingForm from './components/ShoppingForm';
import ShoppingList from './components/ShoppingList';
import Navbar from './components/Navbar';
import LoginPage from './components/LoginPage';
import {Routes,Route,Navigate} from 'react-router-dom';
import {useSelector} from 'react-redux';

function App() {
	
	const [state,setState] = useState({
		list:[]
	})
	
	const appState = useSelector(state => {
		return {
			isLogged:state.isLogged,
			token:state.token,
			loading:state.loading,
			error:state.error
		};
	});
	
	const [urlRequest,setUrlRequest] = useState({
		url:"",
		request:{},
		action:""
	})
	
	//STORAGE FUNCTIONS
	
	useEffect(() => {		
			if(sessionStorage.getItem("state")) {
				let state = JSON.parse(sessionStorage.getItem("state"));
				setState(state);
				if(appState.isLogged) {
					getShoppingList(appState.token);
				}
			}
		},[]);
		
	const saveToStorage = (state) => {
		sessionStorage.setItem("state",JSON.stringify(state));
	}
	
	//APP STATE FUNCTIONS
	

	

	
	const clearState = () => {
		let state = {
			list:[]
		}
		saveToStorage(state);
		setState(state);
	}
	
	useEffect(() => {
		
		const fetchData = async () => {
			if(!urlRequest.url) {
				return;
			}
			let response = await fetch(urlRequest.url,urlRequest.request);
			if(response.ok) {
				//Handle all different successful requests for the backend
				switch(urlRequest.action) {
					case "getlist":
						let data = await response.json();
						setState((state) => {
							let tempState = {
								...state,
								list:data
							}
							saveToStorage(tempState);
							return tempState;							
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
				//TODO: handle all different failed requests for the backend
				switch(urlRequest.action) {
					case "getlist":
						
						return;
					case "additem":
						
						return;
					case "removetem":
						
						return;
					case "edititem":
					
						return;

					default:
						return;
				}
			}
		}
		
		fetchData();
	},[urlRequest]);
	
	//LOGIN API
	
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
	
	const logout = () => {
		setUrlRequest({
			url:"/logout",
			request:{
				method:"POST",
				mode:"cors",
				headers:{"Content-type":"application/json",
						"token":state.token}
			},
			action:"logout"
		})
	}
	
	//REST API
	const getShoppingList = (token) => {
		let temptoken = appState.token;
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
						"token":appState.token},
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
						"token":appState.token}
			},
			action:"removeitem"
		})
	}
	
	const editItem = (item) => {
		setUrlRequest({
			url:"/api/shopping/"+item.id,
			request:{
				method:"PUT",
				mode:"cors",
				headers:{"Content-type":"application/json",
						"token":appState.token},
				body:JSON.stringify(item)
			},
			action:"edititem"
		})
	}
	
	//CONDITIONAL RENDERING
	
	let messageArea = <h4> </h4>
	if(appState.loading) {
		messageArea = <h4>Loading...</h4>
	}
	if(appState.error) {
		messageArea =<h4>{appState.error}</h4>
	}
	let tempRender = <Routes>
			<Route exact path="/" element={
			<LoginPage  register={register} login={login}/>
			}/>
			<Route path="*" element={<Navigate to="/"/>}/>
		</Routes>
	if(appState.isLogged) {
		tempRender = <Routes>
				<Route exact path="/" element={<ShoppingList list={state.list} removeFromList={removeFromList} editItem={editItem}/>}/>
				<Route path="/form" element={<ShoppingForm addShoppingItem={addShoppingItem}/>}/>
				<Route path="*" element={<Navigate to="/"/>}/>
			</Routes>
	}
	return (
		<div className="App">
			<Navbar isLogged={state.isLogged} logout={logout}/>
			{messageArea}
			<hr/>
			{tempRender}
		</div>
	);
}

export default App;
