import React from 'react'
import './Navbar.css'

class Navbar extends React.Component {
    render() {
        const { payload } = this.props
        return (
            <nav className="navbar navbar-default navbar-dark bg-dark navbar-fixed-top">
                <div className="container-header">
                    <div className="navbar-header">
                        <a href="index.html">
                            <img id="os-navbar-logo" src="./os-logo.png" alt="Oakland Schools" title="Oakland Schools"></img>
                        </a>
                        <a className="navbar-brand" href="./index.html" alt="REACT TEMPLATE">REACT TEMPLATE</a>
                        <div id="serverStatus">
                            <p>Server Status: {payload.serverStatus}</p>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
}
export default Navbar