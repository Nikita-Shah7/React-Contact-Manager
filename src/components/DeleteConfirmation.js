import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const DeleteConfirm = (props) => {
    // console.log(props);
    const location = useLocation();
    // console.log(location.state);
    const navigate = useNavigate();

    const Func = (e) => {        
        // console.log(e.target.id);
        var id = e.target.id;
        if( id === "yes" ) {
            // console.log(location.state.id);
            props.getContactId(location.state.id);
        }    
        navigate('/');
    }
            

    return (
        <div className="ui center-div">
            <h1>Are you sure you want to delete following contact details??</h1>
            <h2>{location.state.name}</h2>
            <p>{location.state.email}</p>
            <button id="yes" className="ui button blue" onClick={ Func } >Yes</button> { /* pass value "1" onClick */ }
            <button id="no" className="ui button grey" onClick={ Func } >No</button> { /* pass value "0" onClick */ }
        </div>
    );
}

export default DeleteConfirm;