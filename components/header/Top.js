import styles from "./styles.module.scss";
import { MdSecurity } from "react-icons/md";
import { BsSuitHeart } from "react-icons/bs";
import { RiAccountPinCircleLine, RiArrowDropDownLine } from "react-icons/ri";
import Link from "next/link";
import { useState } from "react";
import UserMenu from "./UserMenu";

function Top({ country }) {
  const [loggedIn, setLoggedIn] = useState(true);
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
              {loggedIn ? (
                <div className={styles.flex}>
                  <img
                    src="https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
                    alt="profile"
                  />

                  <span>Not logged in</span>
                  <RiArrowDropDownLine />
                </div>
              ) : (
                <div className={styles.flex}>
                  <RiAccountPinCircleLine />
                  <span>Account</span>
                  <RiArrowDropDownLine />
                </div>
              )}
              {visible && <UserMenu loggedIn={loggedIn} />}
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Top;
