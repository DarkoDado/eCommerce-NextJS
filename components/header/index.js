import Main from "./Main";
import styles from "./styles.module.scss";
import Top from "./Top";

function Header({ country }) {
  return (
    <header className={styles.header}>
      <Top country={country}/>
      <Main />
    </header>
  );
}

export default Header;
