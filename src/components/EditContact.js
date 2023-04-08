import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const EditContact = (props) => {

    const location = useLocation();
    const navigate = useNavigate();
    let contactState = [ { id: location.state.id , name: location.state.name, email: location.state.email } ];
    
    const edit = (e) => {
        e.preventDefault();
        if(contactState.name === "" || contactState.email === "")
        {
            alert("All the fields are mandatory!");
            return;
        }
        
        props.editHandler(contactState);    // send values to App.js
        contactState = [ { id:'', name:'', email: '' } ];
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        name.value = "";
        email.value = "";
        navigate('/');
    }

    return (
        <div className="ui main">
            <form onSubmit={edit}>  { /* on submitting the form, the "submit" functin comes into play */ }
                <h2>Add Contact</h2>
                <div>
                    <hr />
                    <div>
                        <label><strong>Username</strong></label>
                        <input id="name" type="text" placeholder="Enter Username" name="name" onChange={ (e) => { contactState.name = e.target.value } }/>
                        <br/>
                        <label><strong>Email</strong></label>
                        <input id="email" type="email" placeholder="Enter email" name="email" onChange={ (e) => { contactState.email = e.target.value } } />
                    </div>
                    <button type="submit" className="ui blue button" >Edit</button>  
                </div>                      
            </form>
        </div>
    );   
}

export default EditContact;