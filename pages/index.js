import Head from "next/head";
import styles from "@/styles/Home.module.scss";
import { Tabs } from "@mantine/core";
import { useFormik } from "formik";
import * as Yup from "yup";
import LoginTab from "@/components/LoginTab";

export default function LandingPage() {
  if (typeof window !== "undefined") {
    localStorage.setItem("cart", "[]");
  }

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
      register_email: "",
      register_password: "",
    },
    validationSchema: Yup.object({
      register_email: Yup.string()
        .required("Email required")
        .email("Invalid email"),

      register_password: Yup.string()
        .max(30, "Password must be shorter than 30 characters")
        .min(3, "Password must be higher than 3 characters")
        .required("Password required"),
    }),
    onSubmit: () => {
      localStorage.setItem("user", JSON.stringify(userData));
      alert("Registeration successful");
      resetForm();
    },
  });

  const userData = {
    email: values.register_email,
    password: values.register_password,
  };

  return (
    <>
      <Head>
        <title>Home | Bits & Bots</title>
        <meta
          name="description"
          content="This is the landing page for the Bits & bots online game store"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main_landingPage}>
        <div className={styles.overlay}></div>

        <h1>Welcome To Bits & bots</h1>

        <Tabs color="orange" radius="xs" defaultValue="login">
          <Tabs.List grow>
            <Tabs.Tab value="login">Login</Tabs.Tab>
            <Tabs.Tab value="register">Register</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="login" pt="lg">
            <LoginTab />
          </Tabs.Panel>

          <Tabs.Panel value="register" pt="lg">
            <form className={styles.registerForm} onSubmit={handleSubmit}>
              <div>
                <label htmlFor="register_email">Email address</label>
                <input
                  type="email"
                  id="register_email"
                  placeholder="test@hotmail.com"
                  value={values.register_email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.register_email && errors.register_email ? (
                  <div className={styles.text_danger}>
                    {errors.register_email}
                  </div>
                ) : null}
              </div>
              <div>
                <label htmlFor="register_password">Password</label>
                <input
                  type="password"
                  id="register_password"
                  placeholder="password"
                  value={values.register_password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.register_password && errors.register_password ? (
                  <div className={styles.text_danger}>
                    {errors.register_password}
                  </div>
                ) : null}
              </div>
              <button type="submit">Register</button>
            </form>
          </Tabs.Panel>
        </Tabs>
      </main>
    </>
  );
}
