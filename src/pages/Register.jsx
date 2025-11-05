import { Link } from "react-router-dom";
import styles from "../components/Form/Form.module.css";
import Sign_Up  from '../assets/img/password.svg'
import Input from "../components/Form/Input"
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

    // Inicializa o motor das partículas
   const particlesInit = async (engine) => {
     await loadFull(engine);
   };


 export default function Register() {

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

         <div className={styles.loginCard}>
             <div className={styles.image_side}>
                   <img  src={ Sign_Up } alt="registrar" />
                    <h2 className={styles.subtitle}><span>Bem-vindo de volta,</span> Diana!</h2>
                 </div>
          <div className={styles.leftContent}>
          </div>
          <div className={styles.rightContent}>
          <div className={styles.form_box}>
          <h1 className={styles.title}>REGISTRAR</h1>
          <div className={styles.form}>
          </div>
          <form className={styles.input} >
            <Input
              text="Nome"
              type="text"
              name="name"
              placeholder="Digite seu nome"
            />
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
            <Input
              text="Confirmação de Senha"
              type="password"
              name="confirmPassword"
              placeholder="Confirme sua senha"
            />
            <div className={styles.botoes_grupo}>
            <button type="submit" className={styles.btn_login_sucess}>
              Cadastrar
            </button>
            </div>
          <div className={styles.links}>
            <p><Link to="/">Voltar ao login</Link></p>
             <p><Link to="/forgotpassword">Esqueceu a senha?</Link></p>
        </div>
         </form>
        </div>
      </div>
      </div>
       <div className={styles.backgroundPattern}></div>
        </div>
       </>
  )
}
