const { program } = require("commander");

const contacts = require("./contacts");

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "listContacts":
      const allContacts = await contacts.listContacts();
      console.table(allContacts);
      break;
    case "getContactById":
      const oneContact = await contacts.getContactById(id);
      console.log(oneContact);
      break;
    case "addContact":
      const newContact = await contacts.addContact({ name, email, phone });
      console.log(newContact);
      break;
    case "removeContact":
      const removeContact = await contacts.removeContact(id);
      console.log(removeContact);
      break;
    default:
      console.log("Unknown action");
  }
};

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();
invokeAction(options);
