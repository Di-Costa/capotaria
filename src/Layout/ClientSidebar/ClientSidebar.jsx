import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./ClientSidebar.module.css";

import {
  PieChart,
  CalendarDays,
  Users,
  FlaskConical,
  ClipboardList,
  Settings,
  Menu,
  X,
} from "lucide-react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => setIsOpen((prev) => !prev);

  const sidebarItems = [
    { path: "/", label: "Dashboard", icon: PieChart },
    { path: "/appointments", label: "Agendamentos", icon: CalendarDays },
    { path: "/clients", label: "ClientList", icon: Users },
    { path: "/services", label: "Serviços", icon: FlaskConical },
    { path: "/reports", label: "Relatórios", icon: ClipboardList },
    { path: "/settings", label: "Configurações", icon: Settings },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <aside
      className={`${styles.sidebar} ${
        isOpen ? styles.expanded : styles.collapsed
      }`}
    >
      {/* Logo e botão de toggle */}
      <div className={styles.topSection}>
        <div className={styles.logo}>{isOpen ? " Auto Car" : ""}</div>
        <button className={styles.toggleButton} onClick={toggleSidebar}>
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Navegação */}
      <nav className={styles.sideNav}>
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`${styles.navItem} ${
                isActive(item.path) ? styles.active : ""
              }`}
            >
              <Icon size={22} />
              {isOpen && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

