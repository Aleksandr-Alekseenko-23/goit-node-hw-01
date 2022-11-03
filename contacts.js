const path = require("path");
const contactsPath = path.join(__dirname, "./db/contacts.json");
const fs = require("fs/promises");
const { nanoid } = require("nanoid");

const updateContacts = async (contacts) =>
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 3));

const listContacts = async () => {
  const result = await fs.readFile(contactsPath);
  return JSON.parse(result);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === contactId);
  return result || null;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await updateContacts(contacts);
  return result;
};

const addContact = async ({ name, email, phone }) => {
  const contacts = await listContacts();

  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  const contactsList = [newContact, ...contacts];

  await updateContacts(contactsList);
  return newContact;
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
