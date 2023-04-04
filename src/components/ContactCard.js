import React from "react";

const ContactCard = (props) => {
    // console.log(props);
    return (
        <div className="item">
            <div className="content">
                <div className="header"> { props.contact.name } </div>
                <div className="header"> { props.contact.email } </div>
            </div>
            <i className="trash alternate outline icon red" onClick={ () => props.clickTrash(props.contact.id) }></i>
        </div>
    );
}

export default ContactCard;