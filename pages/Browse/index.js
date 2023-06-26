import Head from "next/head";
import Link from "next/link";
import Navbar from "@/components/NavBar";
import styles from "/styles/Home.module.scss";

export async function getStaticProps() {
  let hotels = [];
  try {
    const response = await axios.get("http://localhost:1337/api/hotels");
    const data = await response.data;
    hotels = data.data;
  } catch (err) {
    console.log(err);
  }
  return {
    props: {
      hotels: hotels,
    },
  };
}

export default function Browse() {
  return (
    <>
      <Head>
        <title>Browse | Bits & Bots</title>
        <meta
          name="description"
          content="This is the browse page for the Bits & bots online game store"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />

      <div className={styles.browse_container}>
        <main>
          <div className={styles.browse_actions}>
            <h1>Browse our games</h1>
            <button>View Cart</button>
          </div>
          <div className={styles.browse_content}>
            <div className={styles.browse_filters}>filters</div>
            <div className={styles.browse_games}>games</div>
          </div>
        </main>
      </div>
    </>
  );
}
