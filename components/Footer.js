import styles from "../styles/Home.module.scss";

export default function Footer() {
  return (
    <>
      <div className={styles.footer_container}>
        <ul>
          <li>ABOUT</li>
          <li>CONTACT</li>
          <li>FAQS</li>
          <li>SHIPPING</li>
        </ul>
      </div>
    </>
  );
}
