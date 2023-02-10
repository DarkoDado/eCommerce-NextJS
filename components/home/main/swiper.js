import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { Autoplay, Navigation, Pagination, Mousewheel, Keyboard } from "swiper";

export default function MainSwiper() {
  return (
    <>
      <Swiper
        cssMode={true}
        navigation={true}
        pagination={true}
        mousewheel={true}
        keyboard={true}
        autoplay={{
          delay: 3000,
        }}
        modules={[Autoplay, Navigation, Pagination, Mousewheel, Keyboard]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img
            src="https://ae01.alicdn.com/kf/S449f34613f6c419ab1e91f6118bc5a50L.jpg_Q90.jpg_.webp"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://ae01.alicdn.com/kf/Sbda0d66a758041c5874717097c723e10k.jpg_Q90.jpg_.webp"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://ae01.alicdn.com/kf/Sa94da73554fb40aea6e0f127c15df632R.jpg_Q90.jpg_.webp"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://ae01.alicdn.com/kf/H7f457742e3fe410794e2ab2c9e47bf1bb.jpg_Q90.jpg_.webp"
            alt=""
          />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
