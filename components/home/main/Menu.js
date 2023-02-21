import styles from "./styles.module.scss";
import { BiCategory } from "react-icons/bi";
import { menuArr } from "@/data/home";
import Link from "next/link";

export default function Menu() {
  return (
    <div className={styles.menu}>
      <ul>
        <li>
          <a className={styles.menuHeader}>
            <BiCategory />
            <b>Categories</b>
          </a>
        </li>
        <div className={styles.menu_list}>
          {menuArr.map((item) => (
            <li key={item.name}>
              <Link href={item.link}>
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </div>
      </ul>
    </div>
  );
}
