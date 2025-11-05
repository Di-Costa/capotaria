import CalendarWidget from "../Calendar/CalendarWidget";
import styles from "./RightPanel.module.css";
import { useState } from "react";

export default function RightPanel({clients, onTimeClick, selectedTime }) {
  const [date, setDate] = useState(new Date());

  return (
    <aside className={styles.rightPanel}>

      <div className={styles.widget}>
         <CalendarWidget
        date={date}
        setDate={setDate}
        clients={clients}
        onTimeClick={onTimeClick}
        selectedTime={selectedTime}
      />
      </div>
    </aside>
  );
}

