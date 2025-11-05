import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styles from "./CalendarWidget.module.css";

// Dados mock para simular os horários disponíveis
const availableTimes = [
  { time: '10:00 AM', available: false },
  { time: '11:00 AM', available: true },
  { time: '01:00 PM', available: true },
  { time: '02:00 PM', available: false }, // Exemplo de horário ocupado
  { time: '03:00 PM', available: true },
  { time: '04:00 PM', available: true },
];

export default function CalendarWidget({
  date,
  setDate,
   clients = [],
   onTimeClick = () => {},
   selectedTime
  }) {
  const hours = ["08:00", "09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00"];

  // pega horários ocupados (seguro)
  const occupied = (clients || []).map((c) => c.time?.split(" - ")[0]);

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Agendamentos</h3>

      <Calendar
        value={date}
        onChange={setDate}
        className={styles.calendar}
        tileClassName={({ date: d, view }) => {
          if (view === "month") {
            const today = new Date();

            const isToday =
              d.getDate() === today.getDate() &&
              d.getMonth() === today.getMonth() &&
              d.getFullYear() === today.getFullYear();

            const hasAppointment = clients.some((c) => {
              const clientDate = new Date(c.date);
              return (
                clientDate.getDate() === d.getDate() &&
                clientDate.getMonth() === d.getMonth() &&
                clientDate.getFullYear() === d.getFullYear()
              );
            });

            if (isToday) return styles.today;
            if (hasAppointment) return styles.hasAppointment;
          }

          return null;
        }}
        />

      <div className={styles.timeSection}>
        <h4 className={styles.title}>Horários disponíveis</h4>
        <div className={styles.timeButtons}>
          {hours.map((h) => {
            const isOccupied = occupied.includes(h);
            const isSelected = h === selectedTime;

            return (
              <button
                key={h}
                disabled={isOccupied}
                onClick={() => !isOccupied && onTimeClick(h)}
                className={`
                  ${styles.timeButton}
                  ${isOccupied ? styles.occupied : ""}
                  ${isSelected ? styles.selectedTime : ""}
                  `}
              >
                {isOccupied ? "⛔ " : ""}{h}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}


