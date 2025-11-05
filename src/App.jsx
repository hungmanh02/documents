import Sidebar from "./components/layouts/Sidebar";
import Header from "./components/layouts/Header";
import { useState } from "react";
import Dashboard from "./pages/Dashboard/Dashboard";
import Analytics from "./pages/Analytics/Analytics";
import Inventory from "./pages/Inventory/Inventory";
import DocumentForm from "./pages/Documents/DocumentForm";
import DocumentReceivePage from "./pages/Documents/DocumentReceivePage";
import OutgoingDocumentPage from "./pages/Documents/OutgoingDocumentPage";
import IncomingDocumentPage from "./pages/Documents/IncomingDocumentPage";
import ConfigurationPage from "./pages/Documents/ConfigurationPage";

function App() {
  const [sideBarCollapsed, setSideBarCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState("dashboard");
  return (
    <div className="min-h-screen bg-linear-to-r  from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-all duration-500">
      <div className="flex h-screen overflow-hidden">
        <Sidebar
          collapsed={sideBarCollapsed}
          onToggle={() => setSideBarCollapsed(!sideBarCollapsed)}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header
            sideBarCollapsed={sideBarCollapsed}
            onToggleSidebar={() => setSideBarCollapsed(!sideBarCollapsed)}
          />
          <main className="flex-1 overflow-y-auto bg-white">
            {currentPage === "dashboard" && (
              <div className="p-6 space-y-6">
                <Dashboard />
              </div>
            )}
            {/*
           
            <div className="p-6 space-y-6">
              {currentPage === "analytics" && <Analytics />}
            </div>
            <div className="p-6 space-y-6">
              {currentPage === "inventory" && <Inventory />}
            </div> */}
            {currentPage === "ban_hanh_van_ban" && (
              <div className=" space-y-6 ">
                <DocumentForm />
              </div>
            )}
            {currentPage === "tiep_nhan_van_ban" && (
              <div className="space-y-6">
                <DocumentReceivePage />
              </div>
            )}
            {currentPage === "so_van_ban_di" && (
              <div className="space-y-6">
                <OutgoingDocumentPage />
              </div>
            )}
            {currentPage === "so_van_ban_den" && (
              <div className="space-y-6">
                <IncomingDocumentPage />
              </div>
            )}
            {currentPage === "cau_hinh_so_vb" && (
              <div className="space-y-6">
                <ConfigurationPage />
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
