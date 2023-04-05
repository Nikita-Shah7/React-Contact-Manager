import React from "react";
import ContactCard from "./ContactCard";
import { Link } from "react-router-dom";

const ContactList = (props) => {
    // console.log(props);
    
//     const contactProp = [
//         {
//             id: "1", "name":"nik", email:"jkl@hj.as",
//         }, 
// ]
    
    // here, we will have a function which will take props of contacts and we will map them
    // the function will return a JSX block
    const renderContactList = props.contactProp.map( (contactItem) => {

        const passIdToAppJS = (id) => {
            props.getContactId(id);
        };

        return (
            /*
            <div className="item">
                <div className="content">
                    <div className="header"> { contactItem.name } </div>
                    <div className="header"> { contactItem.email } </div>
                </div>
                <i className="trash alternate outline icon red"></i>
            </div>

            // here, we see that this part is gonna repeat for many times and so whta we can do is we can make a separate component for this as ContactCard
            */
            <ContactCard contact={ contactItem } clickTrash={ passIdToAppJS } />
        );
    }
)

    return (
        <div className="ui celled list">
            <h2>Contact List
                <Link to='/add'>
                    <button className="ui blue right button">AddContact</button>
                </Link>
            </h2>
            { renderContactList }
        </div>
    );
}

export default ContactList;