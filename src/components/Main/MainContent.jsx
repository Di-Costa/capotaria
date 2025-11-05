import styles from './MainContent.module.css';

function MainContent({ children }) {
  return <main className={styles.main}>{children}</main>;
}

export default MainContent;
