import React, { useState, useEffect } from 'react';
// import { useState } from 'react';    /* to add functionality to our contactList */ 
// import { useEffect } from 'react';  /* to use local storage; whenever the value changes, the "useEffect helps us to render the values again. */
import { v4 as uuidv4 } from 'uuid';  /* to provide unique Id to each of contactItems */
import Header from './components/Header';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';

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
  const [contactItems, setContacts] = useState([]); {/*we create an "empty" array called contactItems*/ }

  // brings contactItem from contactForm
  const contactHandler = (contactItem) => {
    // console.log(contactItem);
    setContacts([...contactItems,{ id: uuidv4(), ...contactItem }]); /* we give unique to each contactItem */
  }

  // we use useEffect; dependencies=contactItems; input=arrow function;
  
  // this is to store values to local storage
  useEffect( () => {
    localStorage.setItem(LOCAL_STORAGE_KEY,JSON.stringify(contactItems));
    // console.log(JSON.stringify(contactItems));
    // console.log(JSON.parse(localStorage.getItem("contactList")));
    // const retrievedContacts = JSON.parse(localStorage.getItem("contactList"));
    // console.log(retrievedContacts);        
  },[contactItems]);
  
  // // this is to get values from local storage
  // useEffect( () => {
  //   // console.log("mik")
  //   const retrievedContacts = JSON.parse(localStorage.getItem("contactItems"));
  //   // console.log(retrievedContacts); 
  //   setContacts(retrievedContacts);
  //   // console.log("nik");
  // },[]);




  // useEffect(() => {
  //   const retriveContacts = JSON.parse(localStorage.getItem(contactItems));
  //   if (retriveContacts) setContacts(retriveContacts);
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contactItems));
  // }, [contactItems]);


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
      <Header />
      <ContactForm addHandler={contactHandler} />  {/* this is required since we have to get data from ContactForm i.e from child to parent */}
      <ContactList contactProp={contactItems} getContactId={removeContact} />  { /* PropertyName=contactProp, here we pass contacts array to ContactList */}
    </div>
  );
}

export default App;
