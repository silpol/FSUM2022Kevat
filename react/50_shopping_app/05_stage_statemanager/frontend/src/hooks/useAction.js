import {useContext,useEffect,useState} from 'react';
import ActionContext from '../context/ActionContext';
import * as ActionConstants from '../types/actionConstants';
import useAppState from './useAppState';

const useAction = () => {
	
	const action = useContext(ActionContext);
	const [state,setState] = useState({
		url:"",
		request:{},
		action:""
	})
	
	const {token} = useAppState();
	
	//Backend communication with useEffect()
	
	useEffect(() => {
		
			const contactBackend = async () => {
				if(!state.url) {
					return;
				}
				action.dispatch({
					type:ActionConstants.LOADING
				})
				const response = await fetch(state.url,state.request);
				action.dispatch({
					type:ActionConstants.STOP_LOADING
				})
				if(!response) {
					action.dispatch({
						type:ActionConstants.LOGOUT_FAILED,
						error:"There was an error with your connection. Logging you out!"
					})
				}
				if(response.ok) {
					switch(state.action) {
						case "register":
							action.dispatch({
								type:ActionConstants.REGISTER_SUCCESS
							})
							return;
						case "login":
							const data = await response.json();
							if(!data) {
								action.dispatch({
									type:ActionConstants.LOGIN_FAILED,
									error:"Error parsing login information"
								})
								return;
							}
							action.dispatch({
								type:ActionConstants.LOGIN_SUCCESS,
								token:data.token
							})
							return;
					}
				} else {
					switch(state.action) {
						case "register":
							if(response.status === 409) {
								action.dispatch({
									type:ActionConstants.REGISTER_FAILED,
									error:"Username already in use"
								})
							} else {
								action.dispatch({
									type:ActionConstants.REGISTER_FAILED,
									error:"Server responded with a status:"+response.status
								})
							}
							return;
						case "login":
							action.dispatch({
								type:ActionConstants.LOGIN_FAILED,
								error:"Server responded with a status:"+response.status
							})
							return;
					}
				}
			}
			
			contactBackend();
		
	},[state]);
	
	//Action generators for components
	
	const register = (user) => {
		setState({
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
		setState({
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
	
	return {register,login};
}

export default useAction;