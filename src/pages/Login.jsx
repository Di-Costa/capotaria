import { Link } from "react-router-dom";
import styles from "../components/Form/Form.module.css";
import Input from '../components/Form/Input';
import login_amico from '../assets/img/login_amico.svg';
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

    // Inicializa o motor das partículas
   const particlesInit = async (engine) => {
     await loadFull(engine);
   };


export default function Login() {

  return (
      <>
          {/* Partículas como background global */}
          <Particles
            id="tsparticles"
            init={particlesInit}
            options={{
              background: { color: "transparent" },
              fpsLimit: 60,
              particles: {
                number: { value: 60, density: { enable: true, value_area: 800 }},
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

                 {/* Lado direito com o formulário */}
          <div className={styles.loginCard}>
              <div className={styles.image_side}>
                <h2 className={styles.subtitle}><span>Bem-vindo de volta,</span> Diana!</h2>
                     <img  src={login_amico} alt="Login" />
                   </div>
            <div className={styles.leftContent}>
            </div>
            <div className={styles.rightContent}>
              <div className={styles.form_box}>
                <h1 className={styles.title}>LOGIN</h1>
                <div className={styles.form}>
                </div>
                <form className={styles.input} >
                  <Input
                    text="E-mail"
                    type="email"
                    name="email"
                    placeholder="Digite o seu e-mail"
                  />

                  <Input
                    text="Senha"
                    type="password"
                    name="password"
                    placeholder="Digite a sua senha"
                  />
                  <div className={styles.botoes_grupo_login}>
                    <button type="submit" className={styles.btn_login_sucess}>
                      Entrar
                    </button>
                  </div>
                   <div className={styles.links}>
              <p>< Link to="/forgotpassword">Esqueceu sua senha?</Link></p>
              <p>< Link to="/clients">Voltar pra home</Link></p>
            </div>
                </form>
              </div>
            </div>
          </div>

          {/* O fundo pode ser uma div separada para o efeito de blur/pattern, se necessário */}
          <div className={styles.backgroundPattern}></div>
        </div>
        </>
   );
 }