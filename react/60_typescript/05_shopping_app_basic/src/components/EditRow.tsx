import React,{useState} from "react";
import ShoppingItem from "../models/ShoppingItem";

interface Props {
    item:ShoppingItem;
    editItem:(item:ShoppingItem) => void;
    cancel:() => void;
}

interface State {
    type:string;
    count:number;
    price:number;
}

const EditRow:React.FC<Props> = (props:Props) => {

    const [state, setState] = useState<State>({
        type:props.item.type,
        count:props.item.count,
        price:props.item.price
    })

    return (
        <tr>
            <td>{props.item.type}</td>
            <td>{props.item.count}</td>
            <td>{props.item.price}</td>
            <td><button onClick={()=> props.editItem(props.item)}>Confirm</button></td>
            <td><button onClick={()=> props.cancel()}>Remove</button></td>
        </tr>
    )
}

export default EditRow;