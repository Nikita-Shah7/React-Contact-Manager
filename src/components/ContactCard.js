import React from "react";
import { Link } from "react-router-dom";

const ContactCard = (props) => {
    
    return (
        <div className="item">
            <Link to={ `/contact-list/contact-details/${props.contact.id}` } state={ props.contact } >     { /* to get details of each contact */}
                <div className="content">
                    <div className="header"> { props.contact.name } </div>
                    <div className="header"> { props.contact.email } </div>
                </div>                
            </Link>
            <Link to={`contact-list/contact-details/contact-delete/${props.contact.id}` } state={  props.contact  } >
                <i className="trash alternate outline icon red"></i>
            </Link>
        </div>
    );
}

export default ContactCard;