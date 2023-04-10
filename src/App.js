import React, { useState, useEffect } from 'react';
// import { useState } from 'react';    /* to add functionality to our contactList */ 
// import { useEffect } from 'react';  /* to use local storage; whenever the value changes, the "useEffect helps us to render the values again. */
import { v4 as uuidv4 } from 'uuid';  /* to provide unique Id to each of contactItems */
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import ContactDetails from './components/ContactDetails';
import DeleteConfirm from './components/DeleteConfirmation';
import EditContact from './components/EditContact';
import Client from '../src/components/AxiosCreate';


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

  // 1. this is to get values of contactItems from localstorage
  // const [ contactItems, setContacts ] = useState( () => {
    // const retrievedContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));

    // if(retrievedContacts) return (retrievedContacts);
    // else return [];
  // });

  // 2. this is to get values of contactItems from server
  const [ contactItems, setContacts ] = useState([]);

  useEffect( () => {
    Client.get('').then( (response) => {
      setContacts(response.data);
    })
  },[]);


  // brings contactItem from contactForm
  // to add new contact
  const contactHandler = (contactItem) => {
    let id = uuidv4();
    let contact = [ { "id":id, "name":contactItem.name, "email":contactItem.email } ];
    // console.log(contact);
    // console.log(...contact);
    // console.log({...contact});
    // console.log(contactItem);
    // console.log({...contactItem});
    // console.log(contact[0].name);
    // console.log(contact[0].id);
    // console.log(contactItems);
    // 2. to post values to the server
    Client.post('',...contact).then( (response) => {
      setContacts([...contactItems, response.data ]); /* we give unique to each contactItem */       
    });    
    // console.log(contactItems);  // ????
  }

  // we use useEffect; dependencies=contactItems; input=arrow function;
  // 1. this is to store values to local storage
  useEffect( () => {
    localStorage.setItem(LOCAL_STORAGE_KEY,JSON.stringify(contactItems));       
  },[contactItems]); 
  

// edit ContactItem without changing Id
const editContact = (contact) => {  
  
  // 1. editContact ( in coordination with localStorage )
  // const newContactList = contactItems.filter( (contactItem) => {      
    //   if(contactItem.id === contact[0].id)
    //   {
      //     contactItem.name = contact.name;
      //     contactItem.email = contact.email;
      //     return contactItem;
      //   }
      //   else return contactItem.id !== contact[0].id;
      // });
      // setContacts(newContactList);

      // 2. editContact/ UpdateContact (with server)
      let contact_ = [ { "id": contact[0].id, "name":contact.name, "email":contact.email } ]; 
      Client.put(`${contact_[0].id}`,...contact_).then( () => {
        Client.get('').then( (response) => {
          setContacts(response.data);
        });
      });
  return;
}


  // Delete Contact from ContactList
  const removeContact = (id) => {
    // 1. create a new list with all the contact details except the one that is to be deleted (in coordination with localStorage)
    // const newContactList = contactItems.filter( (contactItem) => {      
    //   return contactItem.id !== id;
    // });
    // setContacts(newContactList);
    
    // 2. delete contact from server and load the remaining data from server
    Client.delete(`${id}`);
    Client.get('').then( (response) => {
      setContacts(response.data);
    });
  }


  // search functainality
  const [ searchTerm, setSearchTerm ] = useState("");
  const [ searchResults, setSearchResults ] = useState([]);

  const searchItems = (searchKeyWord) => {
    setSearchTerm(searchKeyWord);
    if(searchKeyWord !== "" )
    {
      setSearchTerm(searchKeyWord);
      const newContactList = contactItems.filter( (contactItem) => {
        // console.log(Object.values(contactItem).join("").slice(36));
        return Object.values(contactItem).join("").slice(36).toLowerCase().includes(searchKeyWord.toLowerCase());
        /* slice=toExcludeIdWhileSearching */
      });
      setSearchResults(newContactList);      
    }
  }


  return (
    <div className="ui container">
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<ContactList contactProp={searchTerm.length < 1 ? contactItems : searchResults } searchItem={searchTerm} searchHandler={searchItems} />} />
          <Route path='/add' element={<ContactForm addHandler={contactHandler} />} />
          <Route path='contact-list/contact-details/:id' element={<ContactDetails />} />
          <Route path='contact-list/contact-details/contact-edit/:id' element={<EditContact editHandler={editContact}/>} />
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