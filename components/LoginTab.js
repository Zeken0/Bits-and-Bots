import styles from "@/styles/Home.module.scss";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function LoginTab() {
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
    onSubmit: () => {
      console.log("localStorage:", JSON.parse(localStorage.user));
      alert("Login successful, Rederacting to the browse page!");
      //   resetForm();
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
            placeholder="admin@admin.com"
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
          <input type="password" id="login_password" placeholder="Pass1234" />
        </div>
        <button>Login</button>
      </form>
    </>
  );
}
