import {useState,useEffect} from 'react';

const StatefulFunction = (props) => {

    const [state,setState] = useState({
        seconds:0,
        timerId:0
    })

    useEffect(() => {
        let interval = setInterval(startTimer,1000);
        setState((state) => {
            return {
                ...state,
                timerId:interval
            }
        })

        return () => clearInterval(interval);
    },[]);

    const startTimer = () => {
        setState((state) => ({
            ...state,
            seconds:state.seconds+1
        }) )
    }

    return(
        <p>Function component says that you have been on this page for {state.seconds} seconds</p>
    )
}

export default StatefulFunction;
