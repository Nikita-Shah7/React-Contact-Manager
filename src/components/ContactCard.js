import React from "react";
import { Link } from "react-router-dom";

const ContactCard = (props) => {
    // console.log(props);
    return (
        <div className="item">
            <Link to={ `/contact-list/contact-details/${props.contact.id}` } state={ props.contact } >     { /* to get details of each contact */}
                <div className="content">
                    <div className="header"> { props.contact.name } </div>
                    <div className="header"> { props.contact.email } </div>
                </div>                
            </Link>
                <i className="trash alternate outline icon red" onClick={ () => props.clickTrash(props.contact.id) }></i>
        </div>
    );
}

export default ContactCard;