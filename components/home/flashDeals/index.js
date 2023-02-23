import Countdown from "@/components/countdown";
import { MdFlashOn } from "react-icons/md";
import styles from "./styles.module.scss";
import { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Navigation } from "swiper";
import FlashCard from "./Card";
import { flashDealsArr } from "@/data/home";

export default function FlashDeals() {
  return (
    <div className={styles.flashDeals}>
      <div className={styles.flashDeals_header}>
        <h1>
          FLASH SALE
          <MdFlashOn />
        </h1>
        <Countdown date={new Date(2023, 3, 8, 25)} />
      </div>
      <Swiper
        slidesPerView={1}
        spaceBetween={25}
        navigation={true}
        modules={[Navigation]}
        breakpoints={{
          450: {
            slidesPerView: 2,
          },
          660: {
            slidesPerView: 3,
          },
          // treba ubaciti jos proizvoda i prilagoditi jos breakpointa
        }}
        className="flashDeals_swiper"
      >
        <div className={styles.flashDeals_list}>
          {flashDealsArr.map((product, i) => (
            <SwiperSlide key={i}>
              <FlashCard product={product} key={i} />
            </SwiperSlide>
          ))}
        </div>
      </Swiper>
    </div>
  );
}
