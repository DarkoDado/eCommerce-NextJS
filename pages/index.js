import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.scss";
import Header from "@/components/header";
import Footer from "@/components/footer";
import axios from "axios";
import Main from "../components/home/main";


const inter = Inter({ subsets: ["latin"] });

export default function Home({ country }) {

  return (
    <>

      <Header country={country}/>
    <div className={styles.home}>
      <div className={styles.container}>
        <Main />
      </div>
    </div>
      <Footer/>
    </>
  );
}
export async function getServerSideProps() {
  let data = await axios
    .get("https://api.ipregistry.co/?key=m19bq3fbdu613paa")
    .then((res) => {
      return res.data.location.country;
    })
    .catch((err) => {
      console.log(err);
    });

  return {
    props: {
      // country: {name: data.name, flag: data.flag.emojitwo},
      country: {name: "Bosnia", flag: "test"},
    },
  };
}
