import React,{useReducer,useEffect,useState} from "react";
import ShoppingItem from "../models/ShoppingItem";

interface AppState {
    list:ShoppingItem[];
    loading:boolean;
}

interface FetchState {
    request:Request
}

const initialState:AppState = {
    list:[],
    loading:false
}

type Action = {
    type:string,
    payload:any
}

const listReducer = (state:AppState, action:Action) => {
    switch(action.type) {
        case "LOADING":
            return {
                ...state,
                loading:true
            }
        case "STOP_LOADING":
            return {
                ...state,
                loading:false
            }
        case "FETCH_LIST_DONE":
            return {
                ...state,
                list:action.payload as ShoppingItem[]
            }
        default:
            return state;
    }
}

export const useAction = () : [ShoppingItem[], boolean,()=> void,(item:ShoppingItem) => void, (id:number | string) => void, (item:ShoppingItem) => void] => {
    const [urlRequest,setUrlRequest] = useState<FetchState>({
        request:new Request("",{})
    })

    const [state,dispatch] = useReducer(listReducer,initialState);
    
    useEffect(() => {},[urlRequest.request])

    const getList= () => {
        let tempRequest = new Request("/api/shopping",{
            method:"GET",
            headers:{"Content-Type":"application/json"}
        })
        setUrlRequest({
            request:tempRequest
        })
    }

    const addItem = (item:ShoppingItem) => {
        let tempRequest = new Request("/api/shopping",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(item)
        })
        setUrlRequest({
            request:tempRequest
        })
    }

    const removeItem = (id:number | string) => {
        let tempRequest = new Request("/api/shopping"+id,{
            method:"DELETE",
            headers:{"Content-Type":"application/json"}
        })
        setUrlRequest({
            request:tempRequest
        })
    }

    const editItem = (item:ShoppingItem) => {
        let tempRequest = new Request("/api/shopping"+item.id,{
            method:"PUT",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(item)
        })
        setUrlRequest({
            request:tempRequest
        })
    }

    return [state.list,state.loading,getList,addItem,removeItem,editItem]
}