const HelloFunc = (props) => {

    let name = "Func";
    if (props.name) {
        name = props.name;
    }
    return (
        <h1>Hello {name}</h1>
    )
}

export default HelloFunc;
