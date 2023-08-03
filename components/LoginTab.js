import styles from "@/styles/Home.module.scss";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";

export default function LoginTab() {
  const router = useRouter();

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
      login_email: "",
      login_password: "",
    },
    validationSchema: Yup.object({
      login_email: Yup.string()
        .required("Email required")
        .email("Invalid email"),

      login_password: Yup.string()
        .max(30, "Password must be shorter than 30 characters")
        .min(3, "Password must be higher than 3 characters")
        .required("Password required"),
    }),
    onSubmit: (values) => {
      let localStorageData = JSON.parse(localStorage.getItem("user"));

      if (
        values.login_email === localStorageData.email &&
        values.login_password === localStorageData.password
      ) {
        router.push("/browse");
        alert("Login successful, Rederacting to the browse page!");
        resetForm();
      } else {
        alert("Incorrect username or password");
      }
    },
  });

  return (
    <>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <div>
          <label htmlFor="login_email">Email address</label>
          <input
            type="email"
            id="login_email"
            placeholder="test@hotmail.com"
            value={values.login_email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.login_email && errors.login_email ? (
            <div className={styles.text_danger}>{errors.login_email}</div>
          ) : null}
        </div>
        <div>
          <label htmlFor="login_password">Password</label>
          <input
            type="password"
            id="login_password"
            placeholder="password"
            value={values.login_password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.login_password && errors.login_password ? (
            <div className={styles.text_danger}>{errors.login_password}</div>
          ) : null}
        </div>
        <button type="submitt">Login</button>
      </form>
    </>
  );
}
