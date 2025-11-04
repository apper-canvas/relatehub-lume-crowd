import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "@/components/organisms/Header";
import ContactsTable from "@/components/organisms/ContactsTable";
import Modal from "@/components/organisms/Modal";
import ConfirmDialog from "@/components/organisms/ConfirmDialog";
import ContactForm from "@/components/organisms/ContactForm";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { contactService } from "@/services/api/contactService";
import { companyService } from "@/services/api/companyService";

const Contacts = () => {
  const { onMenuToggle } = useOutletContext();
  const [contacts, setContacts] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");
      const [contactsData, companiesData] = await Promise.all([
        contactService.getAll(),
        companyService.getAll()
      ]);
      setContacts(contactsData);
      setCompanies(companiesData);
      setFilteredContacts(contactsData);
    } catch (err) {
      setError("Failed to load contacts. Please try again.");
      toast.error("Failed to load contacts");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query) => {
    if (!query.trim()) {
      setFilteredContacts(contacts);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const filtered = contacts.filter((contact) => {
      const company = companies.find((c) => c.Id === contact.companyId);
      const companyName = company ? company.name.toLowerCase() : "";
      
      return (
        contact.name.toLowerCase().includes(lowerQuery) ||
        contact.email.toLowerCase().includes(lowerQuery) ||
        contact.phone.toLowerCase().includes(lowerQuery) ||
        companyName.includes(lowerQuery)
      );
    });
    setFilteredContacts(filtered);
  };

  const handleAddContact = async (contactData) => {
    try {
      const newContact = await contactService.create(contactData);
      setContacts((prev) => [...prev, newContact]);
      setFilteredContacts((prev) => [...prev, newContact]);
      setIsAddModalOpen(false);
      toast.success("Contact added successfully");
    } catch (err) {
      toast.error("Failed to add contact");
      throw err;
    }
  };

  const handleEditContact = async (contactData) => {
    try {
      const updatedContact = await contactService.update(selectedContact.Id, contactData);
      setContacts((prev) =>
        prev.map((c) => (c.Id === selectedContact.Id ? updatedContact : c))
      );
      setFilteredContacts((prev) =>
        prev.map((c) => (c.Id === selectedContact.Id ? updatedContact : c))
      );
      setIsEditModalOpen(false);
      setSelectedContact(null);
      toast.success("Contact updated successfully");
    } catch (err) {
      toast.error("Failed to update contact");
      throw err;
    }
  };

  const handleDeleteContact = async () => {
    try {
      await contactService.delete(selectedContact.Id);
      setContacts((prev) => prev.filter((c) => c.Id !== selectedContact.Id));
      setFilteredContacts((prev) => prev.filter((c) => c.Id !== selectedContact.Id));
      setIsDeleteDialogOpen(false);
      setSelectedContact(null);
      toast.success("Contact deleted successfully");
    } catch (err) {
      toast.error("Failed to delete contact");
    }
  };

  const openEditModal = (contact) => {
    setSelectedContact(contact);
    setIsEditModalOpen(true);
  };

  const openDeleteDialog = (contact) => {
    setSelectedContact(contact);
    setIsDeleteDialogOpen(true);
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadData} />;

  return (
    <div className="flex-1 flex flex-col">
      <Header
        title="Contacts"
        onSearch={handleSearch}
        onAdd={() => setIsAddModalOpen(true)}
        addLabel="Add Contact"
        onMenuToggle={onMenuToggle}
      />

      <div className="flex-1 p-4 sm:p-6 lg:p-8">
        {filteredContacts.length === 0 && contacts.length === 0 ? (
          <Empty
            icon="Users"
            title="No contacts yet"
            description="Get started by adding your first contact to manage your business relationships"
            actionLabel="Add Your First Contact"
            onAction={() => setIsAddModalOpen(true)}
          />
        ) : filteredContacts.length === 0 ? (
          <Empty
            icon="Search"
            title="No contacts found"
            description="Try adjusting your search criteria or add a new contact"
            actionLabel="Add Contact"
            onAction={() => setIsAddModalOpen(true)}
          />
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <ContactsTable
              contacts={filteredContacts}
              companies={companies}
              onEdit={openEditModal}
              onDelete={openDeleteDialog}
            />
          </div>
        )}
      </div>

      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Contact"
        size="medium"
      >
        <ContactForm
          onSubmit={handleAddContact}
          onCancel={() => setIsAddModalOpen(false)}
        />
      </Modal>

      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedContact(null);
        }}
        title="Edit Contact"
        size="medium"
      >
        <ContactForm
          contact={selectedContact}
          onSubmit={handleEditContact}
          onCancel={() => {
            setIsEditModalOpen(false);
            setSelectedContact(null);
          }}
        />
      </Modal>

      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => {
          setIsDeleteDialogOpen(false);
          setSelectedContact(null);
        }}
        onConfirm={handleDeleteContact}
        title="Delete Contact"
        message={`Are you sure you want to delete ${selectedContact?.name}? This action cannot be undone.`}
        confirmLabel="Delete"
        variant="danger"
      />
    </div>
  );
};

export default Contacts;