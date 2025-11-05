import {useState} from "react"
import styles from "./AppointmentModal.module.css";

export default function AppointmentModal({ time, onClose, onConfirm }) {

  const [name, setName] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value.trim();
    if (!name.trim()) return alert("Por favor, digite o nome do cliente.");
    onConfirm(name, status);
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h3>Novo agendamento</h3>
        <p>Horário selecionado: <strong>{time}</strong></p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Nome do cliente"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={styles.input}
          />

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className={styles.input}
          >
            <option value="">Selecione o status</option>
            <option value="Aprovado">Aprovado</option>
            <option value="Cancelado">Cancelado</option>
            <option value="Remarcado">Remarcado</option>
            <option value="Outros">Outros</option>
          </select>
          <div className={styles.buttons}>
            <button className={styles.confirm} onClick={() => onConfirm(name, status)}>
              Confirmar
            </button>
            <button className={styles.cancel} onClick={onClose}>
              Cancelar
            </button >
          </div>
        </form>
      </div>
    </div>
  );
}

