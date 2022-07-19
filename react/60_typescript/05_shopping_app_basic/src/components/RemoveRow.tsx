import React from "react";
import ShoppingItem from "../models/ShoppingItem";

interface Props {
    item:ShoppingItem;
    removeItem:(item:ShoppingItem) => void;
    cancel:() => void;
}

const RemoveRow:React.FC<Props> = (props:Props) => {
    return (
        <tr>
            <td>{props.item.type}</td>
            <td>{props.item.count}</td>
            <td>{props.item.price}</td>
            <td><button onClick={()=> props.cancel()}>Remove</button></td>
            <td><button onClick={()=> props.removeItem(props.item)}>Confirm</button></td>
        </tr>
    )
}

export default RemoveRow;