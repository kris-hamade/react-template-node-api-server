import React from 'react'
import Footer from './Footer'
import Navbar from './Navbar'
import './Main.css'

let ws
/*var serverIp = location.port == '5500' ? location.hostname + ':8180' : location.host;
var protocol = location.protocol == 'https:' ? 'wss://' : 'ws://';
let wsLocation = protocol + serverIp*/

let wsLocation = 'ws://localhost:8180'

ws = new WebSocket(wsLocation)

function parseQuery(queryString) {
    const query = {};
    const pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
    for (let i = 0; i < pairs.length; i += 1) {
        const pair = pairs[i].split('=');
        query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
    }
    return query;
}

const debug = parseQuery(window.location.search).debug !== undefined;
class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            action:[],
            serverStatus: "Attempting to Connect",
        };
    }


    // single websocket instance for the own application and constantly trying to reconnect.

    componentDidMount() {

        //this.connect();
        console.log(ws)
        ws.onopen = function () {
            console.log('Connected to WebSocket Server.')
            this.setState({serverStatus: "Connected"})
            ws.send(JSON.stringify({
                action: 'setClientId',
                data: parseQuery(window.location.search).id
            }));
        }.bind(this)
        ws.onmessage = (e) => {
            const payload = JSON.parse(e.data);
            console.log(payload)
            if (payload.action === 'refresh') {
                window.location.reload()
                console.log(payload)
            }
            if (payload.action === 'setSession') {
                //app.session = payload.data;
            }
        }
        // If socket is closed, retry connection every 5 seconds
        ws.onclose = function () {
            if (debug) console.log('session closed');
            this.setState({serverStatus: "Lost Connection"})
        }.bind(this)
    }

    timeout = 250; // Initial timeout duration as a class variable
    render() {
        return (
            <div>

            <div className="siteContainer">
            <header id="navbar">
                <Navbar payload={this.state}/>
            </header>
                <div className="siteContent">

                </div>
            </div>
            <footer id="sticky-footer" className="py-4 bg-dark">
                    <Footer />
                </footer>
            </div>

        )
    }

}






export default Main;