import React from "react";

class ContactForm extends React.Component {

    // "state" is a reserved word, "state" is an object.
    state = {
        name : '',
        email: '',
    };

    submit = (e) => {
        e.preventDefault();
        if(this.state.name === "" || this.state.email === "")
        {
            alert("All the fields are mandatory!");
            return;
        }
        // console.log(this.state);
        this.props.addHandler(this.state);  // send the state values to App.js
        // to clear values after submission
        this.setState({ name: '' , email: '' });
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        name.value = "";
        email.value = "";
    }

    render() {
        return (
            <div className="ui main">
                <form onSubmit={this.submit}>  { /* on submitting the form, the submit functin comes into play */ }
                    <h2>Add Contact</h2>
                    <div>
                        <hr />
                        <div>
                            <label><strong>Username</strong></label>
                            <input id="name" type="text" placeholder="Enter Username" name="name" onChange={ (e) => this.setState({ name: e.target.value }) }/>
                            <br/>
                            <label><strong>Email</strong></label>
                            <input id="email" type="email" placeholder="Enter email" name="email" onChange={ (e) => this.setState({ email: e.target.value })} />
                        </div>
                        <button type="submit">Submit</button>  
                    </div>                      
                </form>
            </div>
        );
    }
}

export default ContactForm;