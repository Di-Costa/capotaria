import { useState } from "react";
import { Link } from "react-router-dom";
import
{
  Menu,
  X,
  Home,
  Users,
  CalendarClock,
  LogOut
} from "lucide-react";
import styles from "./AdminSidebar.module.css";


export default function AdminSidebar({ isOpen, setIsOpen }) {
  const width = isOpen ? 250 : 80;
  const toggleSidebar = () => setIsOpen(!isOpen);

  const menuItems = [
    { path: "/admin", icon: Home, label: "Dashboard" },
    { path: "/admin/clients", icon: Users, label: "Clientes" },
    { path: "/admin/schedules", icon: CalendarClock, label: "Agendamentos" },
  ];

  return (
    <aside className={`${styles.sidebar} ${isOpen ? styles.open : ""}`} style={{ width }}>

      <button className={styles.toggleBtn} onClick={toggleSidebar}>
        {isOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      <nav className={styles.menu}>
        {menuItems.map((item) => (
          <Link to={item.path} key={item.path} className={styles.item}>
            <item.icon size={22} />
            {isOpen && <span>{item.label}</span>}
            {!isOpen && <span className={styles.tooltip}>{item.label}</span>}
          </Link>
        ))}

        <div className={styles.logoutContainer}>
          <button className={styles.item}>
            <LogOut size={22} />
            {isOpen && <span>Sair</span>}
          </button>
        </div>
      </nav>
    </aside>
  );
}
