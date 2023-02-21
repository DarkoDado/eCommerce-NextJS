import { useSession } from "next-auth/react";
import Link from "next/link";
import { BsHeart } from "react-icons/bs";
import { IoSettingsOutline } from "react-icons/io5";
import { HiOutlineClipboardList } from "react-icons/hi";
import { AiOutlineMessage } from "react-icons/ai";
import styles from "./styles.module.scss";
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";


// import required modules
import { EffectCards, Navigation } from "swiper";
import { offersArr } from "@/data/home";

export default function User() {
  const { data: session } = useSession();
  return (
    <div className={styles.user}>
      <div className={styles.user_container}>
        {session ? (
          <div className={styles.user_info}>
            <h4>{session.user.name}</h4>
            <span className={styles.userImg}>
            <img src={session.user.image} alt="profile" />
            </span>
          </div>
        ) : (
          <div className={styles.user_info}>
            <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" />
            <div className={styles.user_info_btns}>
              <button>Register</button>
              <button>Login</button>
            </div>
          </div>
        )}
        <ul className={styles.user_links}>
          <li>
            <Link href="/profile">
              <IoSettingsOutline />
            </Link>
          </li>
          <li>
            <Link href="">
              <HiOutlineClipboardList />
            </Link>
          </li>
          <li>
            <Link href="">
              <AiOutlineMessage />
            </Link>
          </li>
          <li>
            <Link href="">
              <BsHeart />
            </Link>
          </li>
        </ul>
        <div className={styles.user_swiper}>
        <Swiper
        effect={"cards"}
        grabCursor={true}
        navigation={true}
        modules={[EffectCards, Navigation]}
        className="userMenuSwiper"
        styles={{maxWidth: "180px", height: "240px", marginTop: "1rem"}}
      >
        {offersArr.map((item) => {
          <SwiperSlide key={item.image}>
            <Link href="">
              <img src={item.image} alt="" />
            </Link>
            test
          </SwiperSlide>
        })}
        
      </Swiper>
        </div>
      </div>
    </div>
  );
}
