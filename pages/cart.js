import Navbar from "@/components/NavBar";
import Head from "next/head";
import styles from "/styles/Home.module.scss";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import { GrClose } from "react-icons/gr";
import {
  getFromLocalStorage,
  saveToLocalStorage,
  getUser,
} from "@/components/libs/localHelpers";

if (getUser("user") === null) {
  window.location = "/";
}

export default function Cart() {
  let cartFromLocalStorage = getFromLocalStorage("cart");
  let totalAmount = 0;
  for (let i = 0; i < cartFromLocalStorage.length; i++) {
    totalAmount += Number(cartFromLocalStorage[i].Price);
  }

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
            {cartFromLocalStorage.length <= 0 ? (
              <div className={styles.cart_item}>
                <div className={styles.cart_item_left}>The cart is empty!</div>
                <div className={styles.cart_item_mid}>
                  <input type="text" defaultValue={"-"} aria-label="quantity" />
                </div>
                <div className={styles.cart_item_right}>$0.00</div>
              </div>
            ) : (
              cartFromLocalStorage.map((gameFromLocalStorage) => {
                return (
                  <div
                    className={styles.cart_item}
                    key={gameFromLocalStorage.Id}
                  >
                    <div className={styles.cart_item_left}>
                      <GrClose
                        className={styles.cart_item_icon}
                        onClick={() => {
                          window.location.reload();

                          const cartItems = getFromLocalStorage("cart");

                          let removedcartItemsArray = cartItems.filter(
                            (item) => {
                              return item.Id !== gameFromLocalStorage.Id;
                            }
                          );
                          saveToLocalStorage("cart", removedcartItemsArray);
                        }}
                      />
                      <Link href={"/Browse/" + gameFromLocalStorage.Id}>
                        <Image
                          src={gameFromLocalStorage.Image}
                          className={styles.cart_item_image}
                          alt="image of a game cover"
                          height={210}
                          width={145}
                          priority
                        />
                      </Link>
                      <span className={styles.cart_item_title}>
                        <Link href={"/Browse/" + gameFromLocalStorage.Id}>
                          {gameFromLocalStorage.Title}
                        </Link>
                      </span>
                    </div>
                    <div className={styles.cart_item_mid}>
                      <input
                        type="text"
                        defaultValue={"-"}
                        aria-label="quantity"
                      />
                    </div>
                    <div className={styles.cart_item_right}>
                      ${gameFromLocalStorage.Price}.00
                    </div>
                  </div>
                );
              })
            )}
          </div>
          <div className={styles.cart_actions}>
            <div>
              <span>Subtotal:</span>
              {cartFromLocalStorage.length <= 0 ? (
                <span className={styles.cart_total}>$0.00</span>
              ) : (
                <span className={styles.cart_total}>${totalAmount}</span>
              )}
            </div>
            {cartFromLocalStorage.length <= 0 ? (
              <button className={styles.btn_disabled}>Checkout</button>
            ) : (
              <Link href={"/checkout"}>
                <button>Checkout</button>
              </Link>
            )}
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
