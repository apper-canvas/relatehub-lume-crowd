import { useState } from "react";
import { Outlet } from "react-router-dom";
import DesktopSidebar from "@/components/organisms/DesktopSidebar";
import MobileSidebar from "@/components/organisms/MobileSidebar";

const Layout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background">
      <DesktopSidebar />
      <MobileSidebar 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />
      
      <main className="flex-1 flex flex-col min-w-0">
        <Outlet context={{ onMenuToggle: () => setIsMobileMenuOpen(true) }} />
      </main>
    </div>
  );
};

export default Layout;