import React from 'react';

export default class StatefulComponent extends React.Component {
    // constructor. state can be only set here directly
    constructor(props) {
        super(props);
        this.state = {
            seconds:0,
            timerId:0
        }
    }
    //ComponentDidMount. Called immediately after first successful render (i.e. mounting)

    componentDidMount(){
        let interval = setInterval(() => this.startTimer(),1000);
        this.setState({
            timerId:interval
        })
    }

    // componentWillUnmount called when the component is unmounted In this case when we leave the page. We clear the interval
    componentWillUnmount() {
        clearInterval(this.state.timerId);
    }

    //NOTE: state updates can be async. So if we refer to the old state or props inside
    // setState function we need to make the value change also a function so that the
    // updates can be chained together.

    startTimer = () => {
        this.setState((state) => ({
            seconds:state.seconds+1
        }))
    }

    render() {
        return (
            <h2>It has been {this.state.seconds} since you arrived to the page</h2>
        )
    }
}