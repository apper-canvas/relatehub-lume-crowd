import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect } from "react";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Modal from "@/components/organisms/Modal";

const ContactDetailModal = ({ isOpen, onClose, contact, companies, onEdit, onDelete }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
}, [isOpen]);

  if (!contact) {
    return null;
  }
  
  const company = companies?.find(c => c.Id === contact.companyId);

  const handleEdit = () => {
    onEdit(contact);
    onClose();
  };

  const handleDelete = () => {
    onDelete(contact);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="relative bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-primary/5 to-accent/5">
              <h2 className="text-xl font-semibold text-gray-900">Contact Details</h2>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-white/80 transition-colors"
              >
                <ApperIcon name="X" size={20} className="text-gray-500" />
              </button>
            </div>
            
            <div className="px-6 py-6 overflow-y-auto max-h-[calc(90vh-180px)]">
              <div className="space-y-6">
                {/* Contact Information Section */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <ApperIcon name="User" size={20} className="mr-2 text-primary" />
                    Contact Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
<div>
                      <p className="text-sm font-medium text-gray-500 mb-1">Full Name</p>
<p className="text-base text-gray-900 font-medium">{contact?.name || 'Unknown'}</p>
                    </div>
                    <div>
<p className="text-sm font-medium text-gray-500 mb-1">Company</p>
                      <p className="text-base text-gray-900">{company?.name || 'No company assigned'}</p>
                    </div>
<div>
<p className="text-sm font-medium text-gray-500 mb-1">Email</p>
                      <p className="text-base text-gray-900">{contact?.email || 'Not provided'}</p>
                    </div>
                    <div>
<p className="text-sm font-medium text-gray-500 mb-1">Phone</p>
                      <p className="text-base text-gray-900">{contact?.phone || 'Not provided'}</p>
                    </div>
<div className="md:col-span-2">
<p className="text-sm font-medium text-gray-500 mb-1">Job Title</p>
                      <p className="text-base text-gray-900">{contact?.jobTitle || 'Not specified'}</p>
                    </div>
                  </div>
                </div>

                {/* Notes Section */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <ApperIcon name="FileText" size={20} className="mr-2 text-primary" />
                    Notes
                  </h3>
<div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
{contact?.notes ? (
                      <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{contact.notes}</p>
                    ) : (
                      <p className="text-gray-400 italic">No notes available for this contact</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons Footer */}
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between gap-3">
              <Button
                variant="outline"
                onClick={onClose}
                className="flex-1"
              >
                <ApperIcon name="X" size={16} className="mr-2" />
                Close
              </Button>
              <Button
                variant="primary"
                onClick={handleEdit}
                className="flex-1"
              >
                <ApperIcon name="Edit" size={16} className="mr-2" />
                Edit Contact
              </Button>
              <Button
                variant="danger"
                onClick={handleDelete}
                className="flex-1"
              >
                <ApperIcon name="Trash2" size={16} className="mr-2" />
                Delete
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ContactDetailModal;