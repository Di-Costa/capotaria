import { useState } from "react";
import AdminSidebar from "../../Layout/AdminSidebar/AdminSidebar";
import Navbar from "../Navbar/Navbar";
import styles from "./AdminLayout.module.css";


export default function AdminLayout({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const sidebarWidth = isOpen ? 250 : 80; 

  return (
    <div className={styles.layout}>
      <AdminSidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      <div
        className={styles.contentWrapper}
        style={{ marginLeft: sidebarWidth }}
      >
        <Navbar sidebarWidth={sidebarWidth} />

        <main className={styles.pageContent}>
          {children}
        </main>
      </div>
    </div>
  );
}
