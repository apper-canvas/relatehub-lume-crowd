import { NavLink } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const DesktopSidebar = () => {
  const navItems = [
    { to: "/", label: "Contacts", icon: "Users" },
    { to: "/companies", label: "Companies", icon: "Building2" }
  ];

  return (
    <aside className="hidden lg:flex lg:flex-col w-60 bg-white border-r border-gray-200 min-h-screen">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
            <ApperIcon name="Users" size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900">RelateHub</h1>
            <p className="text-xs text-gray-500">CRM Dashboard</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/"}
            className={({ isActive }) =>
              cn(
                "flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200",
                isActive
                  ? "bg-gradient-to-r from-blue-50 to-indigo-50 text-primary font-medium"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              )
            }
          >
            {({ isActive }) => (
              <>
                <ApperIcon
                  name={item.icon}
                  size={20}
                  className={isActive ? "text-primary" : "text-gray-400"}
                />
                <span className="text-sm">{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default DesktopSidebar;