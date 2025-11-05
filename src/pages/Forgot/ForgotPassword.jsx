import { Link } from 'react-router-dom'
import styles from "./ForgotPassword.module.css";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";


export default function ForgotPassword() {
  // Inicializa o motor das partículas
  const particlesInit = async (engine) => {
    await loadFull(engine);
  };

  return (
         <>
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: { color: "transparent" },
          fpsLimit: 60,
          particles: {
            number: { value: 60, density: { enable: true, value_area: 800 } },
            color: { value: ["#00f0ff", "#ff00ea", "#00ff6a", "#ffea00"] },
            shape: { type: "circle" },
            opacity: {
              value: 0.9,
              animation: { enable: true, speed: 2, minimumValue: 0.2, sync: false }
            },
            size: {
              value: 3,
              animation: { enable: true, speed: 4, minimumValue: 0.5, sync: false }
            },
            links: {
              enable: true,
              color: "#00ffff",
              opacity: 0.6,
              width: 1.2,
              distance: 150
            },
            move: {
              enable: true,
              speed: 1.5,
              direction: "none",
              random: false,
              straight: false,
              outModes: "bounce",
              trail: { enable: true, length: 5, fillColor: "#000" }
            }
          },
          detectRetina: true
        }}
      />

          <div className={`${styles.loginLayout} cyberpunk`}>
              <div className={styles.card}>
                <h1 className={styles.logo}>AUTO CAR</h1>
                <h2 className={styles.title}>Recuperar senha</h2>
                <p className={styles.subtitle}>
                  Informe seu e-mail ou CPF para receber as instruções de recuperação.
                </p>

                <form className={styles.form_box}>

                  <input type="text" placeholder="Digite seu e-mail ou CPF" />

                  <button type="submit" className={styles.btn}>
                    Enviar link de recuperação
                  </button>
                </form>

                <div className={styles.links}>
                  <Link to="/">Voltar ao login</Link>
                </div>
              </div>
        </div>
    </>
  );
}

