import Link from "next/link";
import { RiSearch2Line } from "react-icons/ri";
import { FaOpencart } from "react-icons/fa";
import styles from "./styles.module.scss";
import { useSelector } from "react-redux";

function Main() {
  const { cart } = useSelector((state) => ({ ...state }));
  return (
    <div className={styles.main}>
      <div className={styles.main_container}>
        <Link href="/">
          <span className={styles.logo}>
            <img src="" alt="" />
          </span>
        </Link>
        <div className={styles.search}>
          <input type="text" placeholder="Search..." />
          <div className={styles.search_icon}>
            <RiSearch2Line />
          </div>
        </div>
        <Link href="/cart">
          <div className={styles.cart}>
            <FaOpencart />
            <span> {cart.length}</span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Main;
