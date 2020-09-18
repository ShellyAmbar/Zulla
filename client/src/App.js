import React, { PureComponent } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import JoinPage from './pages/join/joinPage';
import ChatRoom from './pages/chatRoom/chatRoomPage';
import AllRooms from './pages/allRooms/allRoomsPage';

class App extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            
        }
    }

    render() {
        return (
            <Router>
                <Route path="/"  exact component={JoinPage}/>
                <Route path="/chatRoom"  exact component={ChatRoom}/>
                <Route path="/allRooms"  exact component={AllRooms}/>
            
            </Router>
        )
    }
}

export default App;