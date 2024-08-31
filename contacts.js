import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const dbPath = path.join("db", "contacts.json");
console.log(dbPath);

const listContacts = async () => {
  try {
    const contactList = await fs.readFile(dbPath);
    return JSON.parse(contactList);
  } catch (error) {
    console.error(error.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const result = contacts.find((contact) => contact.id === contactId);
    return result;
  } catch (error) {
    console.error("Error encounter", error.message);
  }
};

const deleteContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex((contact) => contact.id === contactId);
    if (index === -1) {
      return null;
    }
    const deletedContact = contacts.splice(index, 1);
    await fs.writeFile(dbPath, JSON.stringify(contacts, null, 2));
    return deletedContact;
  } catch (error) {
    console.error("Error encounter", error.message);
  }
};

const addContact = async (name, email, phone) => {
  try {
    const contacts = await listContacts();
    const userDetails = {
      id: nanoid(),
      name,
      email,
      phone,
    };
    const allContacts = [...contacts, userDetails];
    await fs.writeFile(dbPath, JSON.stringify(allContacts, null, 2));
    return userDetails;
  } catch (error) {
    console.error("Error encounter", error.message);
  }
};

export { listContacts, getContactById, deleteContact, addContact };
