import Navbar from "@/components/NavBar";
import Head from "next/head";
import styles from "/styles/Home.module.scss";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function cart() {
  let cartFromLocalStorage = "";
  if (typeof window !== "undefined") {
    cartFromLocalStorage = localStorage.getItem("cart");
  }
  console.log(cartFromLocalStorage);

  return (
    <>
      <Head>
        <title>Cart | Bits & Bots</title>
        <meta
          name="description"
          content="This is the shopping cart page for the Bits & bots online game store"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <div className={styles.cart_container}>
        <main>
          <h1>Shopping Cart</h1>
          <div className={styles.cart_info}>
            <div className={styles.cart_info_left}>Item</div>
            <div className={styles.cart_info_mid}>Quantity</div>
            <div className={styles.cart_info_right}>Price</div>
          </div>
          <div className={styles.cart_content}>
            <div className={styles.cart_item}>
              <div className={styles.cart_item_left}>The cart is empty!</div>
              <div className={styles.cart_item_mid}>
                <input type="text" value={"-"} aria-label="quantity" />
              </div>
              <div className={styles.cart_item_right}>$0.00</div>
            </div>
          </div>
          <div className={styles.cart_actions}>
            <div>
              <span>Subtotal:</span>
              <span className={styles.cart_total}>$0.00</span>
            </div>
            {!cartFromLocalStorage === [] || 0 ? (
              <Link href={"/checkout"}>
                <button>Checkout</button>
              </Link>
            ) : (
              <button className={styles.btn_disabled}>Checkout</button>
            )}
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
