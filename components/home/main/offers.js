import styles from './styles.module.scss'
import { offersArr } from '../../../data/home';
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";


// import required modules
import { Navigation, Pagination } from "swiper";
import Link from 'next/link';

export default function Offers() {
  return (
    <div className={styles.offers}>
      <Swiper
        slidesPerView={3}
        spaceBetween={15}
        pagination={{
          clickable: true,
        }}
        modules={[ Pagination, Navigation]}
        className="offers_slider"
      >
    
    {offersArr.map((offer) => (
      <SwiperSlide key={offer.image}>
        <Link href="">
        <img src={offer.image} alt="" />
        </Link>
        <span>{offer.price}$</span>
        <span>-{offer.discount}%</span>
      </SwiperSlide>
    ))}
       
      </Swiper>
    </div>
  );
}
