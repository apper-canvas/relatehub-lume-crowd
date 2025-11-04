import Label from "@/components/atoms/Label";
import Input from "@/components/atoms/Input";

const FormField = ({ label, error, required, ...inputProps }) => {
  return (
    <div className="space-y-1">
      {label && <Label required={required}>{label}</Label>}
      <Input error={error} {...inputProps} />
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export default FormField;