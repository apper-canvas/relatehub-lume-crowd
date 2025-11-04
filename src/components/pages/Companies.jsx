import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "@/components/organisms/Header";
import CompaniesTable from "@/components/organisms/CompaniesTable";
import Modal from "@/components/organisms/Modal";
import ConfirmDialog from "@/components/organisms/ConfirmDialog";
import CompanyForm from "@/components/organisms/CompanyForm";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { companyService } from "@/services/api/companyService";

const Companies = () => {
  const { onMenuToggle } = useOutletContext();
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");
      const companiesData = await companyService.getAll();
      setCompanies(companiesData);
      setFilteredCompanies(companiesData);
    } catch (err) {
      setError("Failed to load companies. Please try again.");
      toast.error("Failed to load companies");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query) => {
    if (!query.trim()) {
      setFilteredCompanies(companies);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const filtered = companies.filter((company) =>
      company.name.toLowerCase().includes(lowerQuery) ||
      company.industry.toLowerCase().includes(lowerQuery) ||
      (company.description && company.description.toLowerCase().includes(lowerQuery))
    );
    setFilteredCompanies(filtered);
  };

  const handleAddCompany = async (companyData) => {
    try {
      const newCompany = await companyService.create(companyData);
      setCompanies((prev) => [...prev, newCompany]);
      setFilteredCompanies((prev) => [...prev, newCompany]);
      setIsAddModalOpen(false);
      toast.success("Company added successfully");
    } catch (err) {
      toast.error("Failed to add company");
      throw err;
    }
  };

  const handleEditCompany = async (companyData) => {
    try {
      const updatedCompany = await companyService.update(selectedCompany.Id, companyData);
      setCompanies((prev) =>
        prev.map((c) => (c.Id === selectedCompany.Id ? updatedCompany : c))
      );
      setFilteredCompanies((prev) =>
        prev.map((c) => (c.Id === selectedCompany.Id ? updatedCompany : c))
      );
      setIsEditModalOpen(false);
      setSelectedCompany(null);
      toast.success("Company updated successfully");
    } catch (err) {
      toast.error("Failed to update company");
      throw err;
    }
  };

  const handleDeleteCompany = async () => {
    try {
      await companyService.delete(selectedCompany.Id);
      setCompanies((prev) => prev.filter((c) => c.Id !== selectedCompany.Id));
      setFilteredCompanies((prev) => prev.filter((c) => c.Id !== selectedCompany.Id));
      setIsDeleteDialogOpen(false);
      setSelectedCompany(null);
      toast.success("Company deleted successfully");
    } catch (err) {
      toast.error("Failed to delete company");
    }
  };

  const openEditModal = (company) => {
    setSelectedCompany(company);
    setIsEditModalOpen(true);
  };

  const openDeleteDialog = (company) => {
    setSelectedCompany(company);
    setIsDeleteDialogOpen(true);
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadData} />;

  return (
    <div className="flex-1 flex flex-col">
      <Header
        title="Companies"
        onSearch={handleSearch}
        onAdd={() => setIsAddModalOpen(true)}
        addLabel="Add Company"
        onMenuToggle={onMenuToggle}
      />

      <div className="flex-1 p-4 sm:p-6 lg:p-8">
        {filteredCompanies.length === 0 && companies.length === 0 ? (
          <Empty
            icon="Building2"
            title="No companies yet"
            description="Get started by adding your first company to organize your business contacts"
            actionLabel="Add Your First Company"
            onAction={() => setIsAddModalOpen(true)}
          />
        ) : filteredCompanies.length === 0 ? (
          <Empty
            icon="Search"
            title="No companies found"
            description="Try adjusting your search criteria or add a new company"
            actionLabel="Add Company"
            onAction={() => setIsAddModalOpen(true)}
          />
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <CompaniesTable
              companies={filteredCompanies}
              onEdit={openEditModal}
              onDelete={openDeleteDialog}
            />
          </div>
        )}
      </div>

      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Company"
        size="medium"
      >
        <CompanyForm
          onSubmit={handleAddCompany}
          onCancel={() => setIsAddModalOpen(false)}
        />
      </Modal>

      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedCompany(null);
        }}
        title="Edit Company"
        size="medium"
      >
        <CompanyForm
          company={selectedCompany}
          onSubmit={handleEditCompany}
          onCancel={() => {
            setIsEditModalOpen(false);
            setSelectedCompany(null);
          }}
        />
      </Modal>

      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => {
          setIsDeleteDialogOpen(false);
          setSelectedCompany(null);
        }}
        onConfirm={handleDeleteCompany}
        title="Delete Company"
        message={`Are you sure you want to delete ${selectedCompany?.name}? This action cannot be undone.`}
        confirmLabel="Delete"
        variant="danger"
      />
    </div>
  );
};

export default Companies;