import React, { useState, useEffect } from 'react';
// import { useState } from 'react';    /* to add functionality to our contactList */ 
// import { useEffect } from 'react';  /* to use local storage; whenever the value changes, the "useEffect helps us to render the values again. */
import { v4 as uuidv4 } from 'uuid';  /* to provide unique Id to each of contactItems */
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Header from './components/Header';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import ContactDetails from './components/ContactDetails';
import DeleteConfirm from './components/DeleteConfirmation';

// "Switches are changed to "Routes ::
// https://stackoverflow.com/questions/63124161/attempted-import-error-switch-is-not-exported-from-react-router-dom



function App() {

  /*
  //render a list
  // just to show that our UI works properly
  const contactItems = [
    { id: "1" , "name": "nik" , "email" : "nik@yu.com" },
    { id: "1" , "name": "nik" , "email" : "nik@yu.com" }
  ]
  */

  // to add functionality, we use react Hook
  const LOCAL_STORAGE_KEY = "contactItems";
  // const [contactItems, setContacts] = useState([]); /*we create an "empty" array called contactItems*/ 

  // this is to get values from local storage
  const [ contactItems, setContacts ] = useState( () => {
    const retrievedContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if(retrievedContacts) return (retrievedContacts);
    else return [];
  });

  // brings contactItem from contactForm
  const contactHandler = (contactItem) => {
    // console.log(contactItem);
    setContacts([...contactItems,{ id: uuidv4(), ...contactItem }]); /* we give unique to each contactItem */
  }

  // we use useEffect; dependencies=contactItems; input=arrow function;
  
  // this is to store values to local storage
  useEffect( () => {
    localStorage.setItem(LOCAL_STORAGE_KEY,JSON.stringify(contactItems));       
  },[contactItems]);
  
  // // this is to get values from local storage
  // useEffect( () => {
  //   const retrievedContacts = JSON.parse(localStorage.getItem("contactItems"));
  //   // console.log(retrievedContacts); 
  //   setContacts(retrievedContacts);
  // },[]);


  // for the functonality of delete button
  const removeContact = (id) => {
    
    // create a new list with all the contact details except the one that is to be deleted
    const newContactList = contactItems.filter( (contactItem) => {
      return contactItem.id !== id;
    })
    setContacts(newContactList);
  };

  return (
    <div className="ui container">
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<ContactList contactProp={contactItems} getContactId={removeContact} />} />
          <Route path='/add' element={<ContactForm addHandler={contactHandler} />} />
          <Route path='contact-list/contact-details/:id' element={<ContactDetails />} />
          <Route path='/contact-list/contact-details/contact-delete/:id' element={<DeleteConfirm getContactId={removeContact}/>} />          
        </Routes>
      </Router>
      {/* Without using Routes :: */}
        {/* <ContactForm addHandler={contactHandler} />  this is required since we have to get data from ContactForm i.e from child to parent */}
        {/* <ContactList contactProp={contactItems} getContactId={removeContact} />  { /* PropertyName=contactProp, here we pass contacts array to ContactList */}
    </div>
  );
}

export default App;