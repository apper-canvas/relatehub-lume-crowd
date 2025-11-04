import React, { useState } from "react";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import { cn } from "@/utils/cn";

const ContactsTable = ({ contacts, companies, onEdit, onDelete, onViewDetails }) => {
  const [sortField, setSortField] = useState("Name");
  const [sortDirection, setSortDirection] = useState("asc");

  const getCompanyName = (companyId) => {
    const company = companies.find((c) => c.Id === companyId);
    return company ? company.Name : "N/A";
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

const sortedContacts = [...contacts].sort((a, b) => {
    let aValue = a[sortField];
    let bValue = b[sortField];

    if (sortField === "CompanyId") {
      aValue = getCompanyName(a.CompanyId);
      bValue = getCompanyName(b.CompanyId);
    }

    if (typeof aValue === "string") {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }

    if (sortDirection === "asc") {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const SortIcon = ({ field }) => {
    if (sortField !== field) {
      return <ApperIcon name="ChevronsUpDown" size={14} className="text-gray-400" />;
    }
    return sortDirection === "asc" ? (
      <ApperIcon name="ChevronUp" size={14} className="text-primary" />
    ) : (
      <ApperIcon name="ChevronDown" size={14} className="text-primary" />
    );
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
<th className="px-6 py-3 text-left">
              <button
                onClick={() => handleSort("Name")}
                className="flex items-center gap-2 text-xs font-semibold text-gray-700 uppercase tracking-wider hover:text-primary transition-colors"
              >
                Name
                <SortIcon field="Name" />
              </button>
            </th>
<th className="px-6 py-3 text-left">
              <button
                onClick={() => handleSort("Email")}
                className="flex items-center gap-2 text-xs font-semibold text-gray-700 uppercase tracking-wider hover:text-primary transition-colors"
              >
                Email
                <SortIcon field="Email" />
              </button>
            </th>
<th className="px-6 py-3 text-left">
              <button
                onClick={() => handleSort("Phone")}
                className="flex items-center gap-2 text-xs font-semibold text-gray-700 uppercase tracking-wider hover:text-primary transition-colors"
              >
                Phone
                <SortIcon field="Phone" />
              </button>
            </th>
<th className="px-6 py-3 text-left">
              <button
                onClick={() => handleSort("CompanyId")}
                className="flex items-center gap-2 text-xs font-semibold text-gray-700 uppercase tracking-wider hover:text-primary transition-colors"
              >
                Company
                <SortIcon field="CompanyId" />
              </button>
            </th>
            <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
<tbody className="bg-white divide-y divide-gray-200">
          {sortedContacts.map((contact) => (
            <tr
              key={contact.Id}
onClick={() => onViewDetails(contact)}
                className="cursor-pointer hover:bg-gray-50 transition-colors"
              className="group hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                    <span className="text-sm font-medium text-primary">
                      {contact.Name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">{contact.Name}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-600">{contact.Email}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-600">{contact.Phone}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-600">{getCompanyName(contact.CompanyId)}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right">
                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit(contact);
                    }}
                    className="p-2 rounded-lg hover:bg-blue-50 transition-colors"
                    title="Edit contact"
                  >
                    <ApperIcon name="Edit" size={16} className="text-gray-400 hover:text-primary transition-colors" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(contact);
                    }}
                    className="p-2 rounded-lg hover:bg-red-50 transition-colors"
                    title="Delete contact"
                  >
                    <ApperIcon name="Trash2" size={16} className="text-gray-400 hover:text-red-500 transition-colors" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContactsTable;