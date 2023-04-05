import React from "react";
import { useLocation , Link } from "react-router-dom";
import image from '../images/img2.png';

const ContactDetails = (props) => {
    const location = useLocation();
    // console.log(location.state);

    return (
        <div className="main">
            <div className="ui card centered">
                <div className="image"><img src={image} alt="profilePic" /></div>
                <h2 className="header">{location.state.name}</h2>
                <p className="description">{location.state.email}</p>
            </div>
            <div className="center-div">
                <Link to='/' >
                    <button className="ui blue button">Back</button>
                </Link>
            </div>
        </div>
    );
}

export default ContactDetails;