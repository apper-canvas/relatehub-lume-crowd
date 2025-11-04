import { useState } from "react";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import { cn } from "@/utils/cn";

const CompaniesTable = ({ companies, onEdit, onDelete }) => {
  const [sortField, setSortField] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedCompanies = [...companies].sort((a, b) => {
    let aValue = a[sortField];
    let bValue = b[sortField];

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
                onClick={() => handleSort("name")}
                className="flex items-center gap-2 text-xs font-semibold text-gray-700 uppercase tracking-wider hover:text-primary transition-colors"
              >
                Company Name
                <SortIcon field="name" />
              </button>
            </th>
            <th className="px-6 py-3 text-left">
              <button
                onClick={() => handleSort("industry")}
                className="flex items-center gap-2 text-xs font-semibold text-gray-700 uppercase tracking-wider hover:text-primary transition-colors"
              >
                Industry
                <SortIcon field="industry" />
              </button>
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Description
            </th>
            <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sortedCompanies.map((company) => (
            <tr
              key={company.Id}
              className="hover:bg-gray-50 transition-colors duration-150 group"
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
                    <ApperIcon name="Building2" size={20} className="text-indigo-600" />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">{company.name}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="inline-flex px-3 py-1 text-xs font-medium rounded-full bg-blue-50 text-primary">
                  {company.industry}
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm text-gray-600 max-w-md truncate">
                  {company.description || "No description"}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right">
                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                  <button
                    onClick={() => onEdit(company)}
                    className="p-2 rounded-lg hover:bg-blue-50 transition-colors"
                    title="Edit company"
                  >
                    <ApperIcon name="Edit" size={16} className="text-gray-400 hover:text-primary transition-colors" />
                  </button>
                  <button
                    onClick={() => onDelete(company)}
                    className="p-2 rounded-lg hover:bg-red-50 transition-colors"
                    title="Delete company"
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

export default CompaniesTable;