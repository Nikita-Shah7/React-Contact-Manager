import React from "react";
import { redirect, useNavigate } from "react-router-dom";

const ContactForm = (props) => {
    
        let contactState = [ { name: '', email: '', } ]
        // console.log(contactState);

        // for programmatic navigation from one component to another
        const navigate = useNavigate();

        const submit = (e) => {
        e.preventDefault();
        if(contactState.name === "" || contactState.email === "")
        {
            alert("All the fields are mandatory!");
            return;
        }
        // console.log(this.state);
        props.addHandler(contactState);  // send the state values to App.js
        // to clear values after submission
        contactState = [ { name: '', email: '', } ]
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        name.value = "";
        email.value = "";
        console.log(props);              
        // console.log("nik");   
        navigate('/');
    }
    
        return (
            <div className="ui main">
                <form onSubmit={submit}>  { /* on submitting the form, the "submit" functin comes into play */ }
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
                        <button type="submit" className="ui blue button" >Submit</button>  
                    </div>                      
                </form>
            </div>
        );    
}

export default ContactForm;