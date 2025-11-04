import contactsData from "@/services/mockData/contacts.json";

let contacts = [...contactsData];

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const contactService = {
  async getAll() {
    await delay(300);
    return [...contacts];
  },

  async getById(id) {
    await delay(200);
    const contact = contacts.find((c) => c.Id === parseInt(id));
    return contact ? { ...contact } : null;
  },

  async create(contactData) {
    await delay(400);
    const maxId = contacts.length > 0 ? Math.max(...contacts.map((c) => c.Id)) : 0;
    const newContact = {
      ...contactData,
      Id: maxId + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    contacts.push(newContact);
    return { ...newContact };
  },

  async update(id, contactData) {
    await delay(400);
    const index = contacts.findIndex((c) => c.Id === parseInt(id));
    if (index === -1) return null;
    
    contacts[index] = {
      ...contacts[index],
      ...contactData,
      Id: contacts[index].Id,
      createdAt: contacts[index].createdAt,
      updatedAt: new Date().toISOString()
    };
    return { ...contacts[index] };
  },

  async delete(id) {
    await delay(300);
    const index = contacts.findIndex((c) => c.Id === parseInt(id));
    if (index === -1) return false;
    
    contacts.splice(index, 1);
    return true;
  }
};