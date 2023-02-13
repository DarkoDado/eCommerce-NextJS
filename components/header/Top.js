import styles from "./styles.module.scss";
import { MdSecurity } from "react-icons/md";
import { BsSuitHeart } from "react-icons/bs";
import { RiAccountPinCircleLine, RiArrowDropDownLine } from "react-icons/ri";
import Link from "next/link";
import { useState } from "react";
import UserMenu from "./UserMenu";
import { useSession } from "next-auth/react";

function Top({ country }) {
  const { data: session } = useSession();
  const [visible, setVisible] = useState(false);

  return (
    <>
      <div className={styles.top}>
        <div className={styles.container}>
          <div></div>
          <ul className={styles.list}>
            <li className={styles.li}>
              <img src={country.flag} alt="" />
              <span>{country.name}</span>
            </li>
            <li className={styles.li}>
              <MdSecurity />
              <span>Buyer protection</span>
            </li>
            <li className={styles.li}>
              <span>Customer Service</span>
            </li>
            <li>
              <span>Help</span>
            </li>
            <li className={styles.li}>
              <BsSuitHeart />
              <Link href="/profile/whishlist">
                <span>Wishlist</span>
              </Link>
            </li>
            <li
              className={styles.li}
              onMouseOver={() => setVisible(true)}
              onMouseLeave={() => setVisible(false)}
            >
              {session ? (
                <div className={styles.flex}>
                  <img
                    src={session.user.image}
                    alt="profile"
                  />

                  <span>{session.user.name}</span>
                  <RiArrowDropDownLine />
                </div>
              ) : (
                <div className={styles.flex}>
                  <RiAccountPinCircleLine />
                  <span>Account</span>
                  <RiArrowDropDownLine />
                </div>
              )}
              {visible && <UserMenu session={session} />}
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Top;
