import {Link} from 'react-router-dom';

const Navbar = (props) => {
    let links = <ul className="navbar-nav" ></ul>
    if(props.isLogged) {
        links = <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link to="/"> Shopping List </Link>
                    </li>
                    <li className="nav-item" style={{"marginLeft":5}}>
                        <Link to="/form">Add new item</Link>
                    </li>
                 </ul>
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{"paddingLeft":20}}>
            <p className="navbar-brand" href="#">Shopping App</p>
            {links}
        </nav>
    )
}

export default Navbar;