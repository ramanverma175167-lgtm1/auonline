import { useState } from "react";
import "./AdminPanel.css";
import { Link } from "react-router-dom";


export default function AdminPanel() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="admin-container">
    
    
      {/* Main Content */}
      <main className="admin-content">
        <h1>Welcome to the Admin Panel</h1>
        <p>Manage folders, files, and system settings here.</p>
      </main>
    </div>
  );
}
