import { useState, useEffect } from "react";
import FormField from "@/components/molecules/FormField";
import Label from "@/components/atoms/Label";
import Input from "@/components/atoms/Input";
import Textarea from "@/components/atoms/Textarea";
import Button from "@/components/atoms/Button";
import { companyService } from "@/services/api/companyService";

const ContactForm = ({ contact, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    companyId: "",
    notes: ""
  });
  const [companies, setCompanies] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    loadCompanies();
  }, []);

  useEffect(() => {
    if (contact) {
      setFormData({
        name: contact.name || "",
        email: contact.email || "",
        phone: contact.phone || "",
        companyId: contact.companyId ? String(contact.companyId) : "",
        notes: contact.notes || ""
      });
    }
  }, [contact]);

  const loadCompanies = async () => {
    try {
      const data = await companyService.getAll();
      setCompanies(data);
    } catch (error) {
      console.error("Failed to load companies:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required";
    }

    if (!formData.companyId) {
      newErrors.companyId = "Please select a company";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    try {
      const submitData = {
        ...formData,
        companyId: parseInt(formData.companyId)
      };
      await onSubmit(submitData);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormField
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        error={errors.name}
        required
        placeholder="John Doe"
      />

      <FormField
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        required
        placeholder="john.doe@example.com"
      />

      <FormField
        label="Phone"
        name="phone"
        type="tel"
        value={formData.phone}
        onChange={handleChange}
        error={errors.phone}
        required
        placeholder="(555) 123-4567"
      />

      <div className="space-y-1">
        <Label required>Company</Label>
        <select
          name="companyId"
          value={formData.companyId}
          onChange={handleChange}
          className="w-full px-4 py-2 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
        >
          <option value="">Select a company</option>
          {companies.map((company) => (
            <option key={company.Id} value={company.Id}>
              {company.name}
            </option>
          ))}
        </select>
        {errors.companyId && (
          <p className="text-sm text-red-500 mt-1">{errors.companyId}</p>
        )}
      </div>

      <div className="space-y-1">
        <Label>Notes</Label>
        <Textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Additional notes about this contact..."
        />
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="primary" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : contact ? "Update Contact" : "Add Contact"}
        </Button>
      </div>
    </form>
  );
};

export default ContactForm;