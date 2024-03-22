import React from "react";
import "./Sidebar.css";
import {link} from 'react-router-dom'


const Sidebar = () => {
    return (
        <div className="sidebar">
            <link to={'/addproduct'} style={{textDecoration:"none"}}>
                <div className="sidebar-item">
                    <img src="" alt=""/>
                    </div>

            </link>
        </div>
    );
}

export default Sidebar;