import styles from "./Clients.module.css";



function Clients({ clients }) {
   return (
    <div className={styles.list}>
      {clients.map((p) => (
        <div
          key={p.id}
          className={`${styles.card} ${styles[p.status.toLowerCase()]}`}
        >
          <div className={styles.info}>
            <h4>{p.name}</h4>
            <p>{p.time}</p>
            <span className={styles.status}>{p.status}</span>
          </div>
        </div>
      ))}
      </div>
  );
}

export default Clients;
