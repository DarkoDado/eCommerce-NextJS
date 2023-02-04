import styles from "./styles.module.scss";
import Top from "./Top";

function Header() {
  return (
    <header className={styles.header}>
      <Top />
    </header>
  );
}

export default Header;
