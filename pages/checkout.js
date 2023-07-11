import Navbar from "@/components/NavBar";
import Head from "next/head";
import Footer from "@/components/Footer";
import styles from "/styles/Home.module.scss";

export default function checkout() {
  return (
    <>
      <Head>
        <title>Cart | Bits & Bots</title>
        <meta
          name="description"
          content="This is the checkout page for the Bits & bots online game store"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <div className={styles.checkout_container}>
        <main>
          <h1>Checkout</h1>
        </main>
      </div>
      <Footer />
    </>
  );
}
