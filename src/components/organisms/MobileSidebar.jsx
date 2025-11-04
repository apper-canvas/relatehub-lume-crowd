import { NavLink } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";
import { motion, AnimatePresence } from "framer-motion";

const MobileSidebar = ({ isOpen, onClose }) => {
  const navItems = [
    { to: "/", label: "Contacts", icon: "Users" },
    { to: "/companies", label: "Companies", icon: "Building2" }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={onClose}
          />
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-y-0 left-0 w-64 bg-white shadow-2xl z-50 lg:hidden"
          >
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                    <ApperIcon name="Users" size={20} className="text-white" />
                  </div>
                  <div>
                    <h1 className="text-lg font-bold text-gray-900">RelateHub</h1>
                    <p className="text-xs text-gray-500">CRM Dashboard</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <ApperIcon name="X" size={20} className="text-gray-500" />
                </button>
              </div>
            </div>

            <nav className="p-4 space-y-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === "/"}
                  onClick={onClose}
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
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileSidebar;