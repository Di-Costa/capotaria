import styles from './Navbar.module.css';
import { Bell, UserCircle } from "lucide-react";


export default function Navbar({ sidebarWidth }) {
   return (
      <header
            className={styles.navbar}
            style={{ marginLeft: sidebarWidth }}
            >
       <h1 className={styles.title}>Painel Administrativo</h1>
       <div className={styles.actions}>
         <Bell size={22} className={styles.icon} />
         <UserCircle size={26} className={styles.icon} />
         <span className={styles.user}>Bem-vinda, Diana 👋</span>
       </div>
     </header>
   );
}