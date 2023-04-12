import React, { useEffect } from 'react';
import { Container, Title, ContactList } from './App.styled';
import { Contacts } from './Contacts/Contacts';
import { ContactsForm } from './ContactsForm/ContactsForm';
import { Filter } from './Filter/Filter';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectContacts,
  addContact,
  deleteContact,
  setFilter,
  fetchContacts,
} from './contactsSlice/contactsSlice';

function App() {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const filter = useSelector((state) => state.contacts.filter);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleAddNewContact = (newContact) => {
    dispatch(addContact(newContact));
  };

  const handleDeleteContact = (id) => {
    dispatch(deleteContact(id));
  };

  const handleFilterChange = (event) => {
    dispatch(setFilter(event.currentTarget.value));
  };

  const filterContacts = () =>
    contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );

  return (
    <>
      <Container>
        <Title>Phonebook</Title>
        <ContactsForm addNewContact={handleAddNewContact} />
      </Container>
      <Container>
        <Title>Contacts</Title>
        <Filter findByFilter={handleFilterChange} value={filter} />
        <ContactList>
          <Contacts
            contacts={filterContacts()}
            deleteContact={handleDeleteContact}
          />
        </ContactList>
      </Container>
    </>
  );
}
// 00
export default App;