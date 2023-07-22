import Navbar from "@/components/NavBar";
import Head from "next/head";
import Footer from "@/components/Footer";
import styles from "/styles/Home.module.scss";
import { useFormik } from "formik";
import * as Yup from "yup";
import { getUser } from "@/components/libs/localHelpers";

if (getUser("user") === null) {
  window.location = "/";
}

export default function Checkout() {
  const {
    handleSubmit,
    handleChange,
    values,
    touched,
    errors,
    handleBlur,
    resetForm,
  } = useFormik({
    initialValues: {
      name: "",
      email: "",
      credit_card: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .trim()
        .min(2, "Must be higher than 2 characters")
        .max(40, "Must be shorter than 40 characters")
        .required("Name is required"),

      email: Yup.string().required("Email required").email("Invalid email"),

      credit_card: Yup.string()
        .trim()
        .max(16, "Must be shorter than 17 characters")
        .min(16, "Must be higher than 15 characters")
        .required("Card number required"),
    }),
    onSubmit: () => {
      alert("Purchase successful");
      resetForm();
    },
  });

  return (
    <>
      <Head>
        <title>Checkout | Bits & Bots</title>
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
          <div>
            <div className={styles.checkout_form}>
              <form onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    placeholder="test name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.name && errors.name ? (
                    <div className={styles.text_danger}>{errors.name}</div>
                  ) : null}
                </div>
                <div>
                  <label htmlFor="email">Email address</label>
                  <input
                    type="email"
                    id="email"
                    placeholder="test@hotmail.com"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.email && errors.email ? (
                    <div className={styles.text_danger}>{errors.email}</div>
                  ) : null}
                </div>
                <div>
                  <label htmlFor="credit_card">Card Number</label>
                  <input
                    type="tel"
                    id="credit_card"
                    placeholder="1234 5678 9010 1112"
                    value={values.credit_card}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.credit_card && errors.credit_card ? (
                    <div className={styles.text_danger}>
                      {errors.credit_card}
                    </div>
                  ) : null}
                </div>
                <button type="submit">Confirm Purchase</button>
              </form>
            </div>
            <div className={styles.checkout_items}>items</div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
