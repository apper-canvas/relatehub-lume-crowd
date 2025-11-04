import { useNavigate } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="relative">
          <div className="text-[120px] font-bold text-transparent bg-clip-text bg-gradient-to-br from-blue-500 to-indigo-600">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <ApperIcon name="Search" size={64} className="text-blue-300 opacity-20" />
          </div>
        </div>
        
        <div className="space-y-3">
          <h1 className="text-3xl font-bold text-gray-900">Page Not Found</h1>
          <p className="text-secondary text-lg">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
          <Button onClick={() => navigate(-1)} variant="secondary">
            <ApperIcon name="ArrowLeft" size={18} className="mr-2" />
            Go Back
          </Button>
          <Button onClick={() => navigate("/")} variant="primary">
            <ApperIcon name="Home" size={18} className="mr-2" />
            Go to Contacts
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;