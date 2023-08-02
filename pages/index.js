import Head from "next/head";
import styles from "@/styles/Home.module.scss";
import { Tabs } from "@mantine/core";
import { useFormik } from "formik";
import * as Yup from "yup";
import LoginTab from "@/components/LoginTab";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Image from "next/image";

export default function LandingPage() {
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

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoPlay: true,
    autoplaySpeed: 2000,
    draggable: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
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
      <div className={styles.LandingPage_container}>
        <main>
          <div className={styles.user_form}>
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
          </div>
          <Slider {...settings} className={styles.slider}>
            <div>
              <Image
                src={"/../public/images/image1.jpg"}
                alt="Image of people playing video games"
                height={330}
                width={512}
                priority
              />
            </div>
            <div>
              <Image
                src={"/../public/images/image2.jpg"}
                alt="Image of people playing video games"
                height={330}
                width={512}
                priority
              />
            </div>
            <div>
              <Image
                src={"/../public/images/image3.jpg"}
                alt="Image of people playing video games"
                height={330}
                width={512}
                priority
              />
            </div>
            <div>
              <Image
                src={"/../public/images/image4.jpg"}
                alt="Image of people playing video games"
                height={330}
                width={512}
                priority
              />
            </div>
            <div>
              <Image
                src={"/../public/images/image5.jpg"}
                alt="Image of people playing video games"
                height={330}
                width={512}
                priority
              />
            </div>
          </Slider>
        </main>
      </div>
    </>
  );
}
