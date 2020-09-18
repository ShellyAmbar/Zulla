import React, { PureComponent } from 'react';
import "./toolBar.css";

const ToolBar = props => {
   

   
        return (
            <header>
                <nav>
                    <div className="btnMenu">

                    </div>
                    <div className="logo">
                        <a>ZULLA</a>
                    </div>
                    <div className="listItems">
                    <ul>
                        <li>Participents</li>
                        <li>Chat</li>
                        <li><a href="/">Exit groop</a></li>

                    </ul>
                    </div>
                </nav>
            </header>
        )
    
}

export default ToolBar