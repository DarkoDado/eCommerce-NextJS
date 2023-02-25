import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.scss";
import Header from "@/components/header";
import Footer from "@/components/footer";
import axios from "axios";
import Main from "../components/home/main";
import { useSession, signIn, signOut } from "next-auth/react";
import FlashDeals from "@/components/home/flashDeals";
import Category from "@/components/home/category";
import { women_accessories, women_dresses, women_shoes } from "@/data/home";
import { useMediaQuery } from "react-responsive";
import db from "../utils/db";
import Product from "../models/Product";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ country, products }) {
  console.log("products", products);
  const { data: session } = useSession();
  const isMedium = useMediaQuery({ query: "(max-width: 850px)" });
  return (
    <>
      <Header country={country} />
      <div className={styles.home}>
        <div className={styles.container}>
          <Main />
          <FlashDeals />
          <div className={styles.home_category}>
            <Category
              header="Dresses"
              products={women_dresses}
              background="#5a31f4"
            />
            {!isMedium && (
              <Category
                header="Accessories"
                products={women_accessories}
                background="green"
              />
            )}
            <Category
              header="Shoes"
              products={women_shoes}
              background="black"
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
export async function getServerSideProps() {
  db.connectDb();
  let products = await Product.find().sort({ createdAt: -1 }).lean();
  console.log(products);
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
      products: JSON.parse(JSON.stringify(products)),
      // country: {name: data.name, flag: data.flag.emojitwo},
      country: { name: "Bosnia", flag: "test" },
    },
  };
}
