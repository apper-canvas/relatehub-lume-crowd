import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const Empty = ({ 
  icon = "Inbox",
  title = "No data found", 
  description = "Get started by adding your first item",
  actionLabel,
  onAction 
}) => {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center space-y-4 max-w-md">
        <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-50 to-indigo-100 rounded-full flex items-center justify-center">
          <ApperIcon name={icon} size={40} className="text-primary" />
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
          <p className="text-secondary text-sm">{description}</p>
        </div>
        {actionLabel && onAction && (
          <Button onClick={onAction} variant="primary">
            <ApperIcon name="Plus" size={16} className="mr-2" />
            {actionLabel}
          </Button>
        )}
      </div>
    </div>
  );
};

export default Empty;