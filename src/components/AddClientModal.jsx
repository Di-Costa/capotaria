import ClientForm from "../components/ClientForm/ClientForm";
import styles from "./AddClientModal.module.css";
import { FaTimes } from "react-icons/fa";

export default function AddClientModal({ client, onClose, onSave }) {
  const isEditing = !!client;

  return (
    <div className={styles.overlay} onMouseDown={onClose}>
      <div className={styles.modal} onMouseDown={(e) => e.stopPropagation()}>
        <header className={styles.modalHeader}>
          <h3>{isEditing ? "Editar Cliente" : "Adicionar Cliente"}</h3>
          <button onClick={onClose} className={styles.closeBtn}><FaTimes /></button>
        </header>
        <div className={styles.modalBody}>
          <ClientForm
            client={client}
            onClose={onClose}
            onSave={onSave}
          />
        </div>
      </div>
    </div>
  );
}