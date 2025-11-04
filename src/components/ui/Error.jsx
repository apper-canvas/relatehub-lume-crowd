import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const Error = ({ message = "Something went wrong", onRetry }) => {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center space-y-4 max-w-md">
        <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center">
          <ApperIcon name="AlertCircle" size={32} className="text-red-500" />
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-900">Error Loading Data</h3>
          <p className="text-secondary text-sm">{message}</p>
        </div>
        {onRetry && (
          <Button onClick={onRetry} variant="primary">
            <ApperIcon name="RefreshCw" size={16} className="mr-2" />
            Try Again
          </Button>
        )}
      </div>
    </div>
  );
};

export default Error;