import { useState, useEffect } from "react";
import FormField from "@/components/molecules/FormField";
import Label from "@/components/atoms/Label";
import Textarea from "@/components/atoms/Textarea";
import Button from "@/components/atoms/Button";

const CompanyForm = ({ company, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    industry: "",
    description: ""
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (company) {
      setFormData({
        name: company.name || "",
        industry: company.industry || "",
        description: company.description || ""
      });
    }
  }, [company]);

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
      newErrors.name = "Company name is required";
    }

    if (!formData.industry.trim()) {
      newErrors.industry = "Industry is required";
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
      await onSubmit(formData);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormField
        label="Company Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        error={errors.name}
        required
        placeholder="Acme Corporation"
      />

      <FormField
        label="Industry"
        name="industry"
        value={formData.industry}
        onChange={handleChange}
        error={errors.industry}
        required
        placeholder="Technology, Healthcare, Finance, etc."
      />

      <div className="space-y-1">
        <Label>Description</Label>
        <Textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Brief description of the company..."
        />
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="primary" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : company ? "Update Company" : "Add Company"}
        </Button>
      </div>
    </form>
  );
};

export default CompanyForm;