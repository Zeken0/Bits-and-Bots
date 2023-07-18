import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Drawer, Burger } from "@mantine/core";
import styles from "../styles/Home.module.scss";

function Navbar() {
  const [opened, setOpened] = useState(false);

  return (
    <div className={styles.nav_container}>
      <div className={styles.nav_content}>
        <div className={styles.nav_logo}>
          <Link href="/Browse">
            <Image src="/images/logo.png" height={20} width={110} alt="Logo" />
          </Link>
        </div>

        <ul className={styles.nav_actions}>
          <li>
            <Link href="/Browse">
              <span className={styles.nav_actions_styling}>B</span>rowse
            </Link>
          </li>
          <li>
            <Link href="/cart">
              <span className={styles.nav_actions_styling}>C</span>art
            </Link>
          </li>
          <Link href="/">
            <button
              onClick={() => {
                if (typeof window !== "undefined") {
                  localStorage.removeItem("user");
                }
              }}
              className={styles.nav_actions_button}
            >
              Logout
            </button>
          </Link>
        </ul>

        <div className={styles.nav_burger}>
          <Burger
            size={20}
            opened={opened}
            onClick={() => setOpened((o) => !o)}
          />
        </div>
        <div className={styles.nav_drawer}>
          <Drawer
            position="left"
            opened={opened}
            onClose={() => setOpened(false)}
            padding="xl"
            size="xl"
          >
            {
              <ul className={styles.nav_actions_mobile}>
                <li>
                  <Link href="/Browse">
                    <span className={styles.nav_actions_styling}>B</span>
                    rowse
                  </Link>
                </li>

                <li>
                  <Link href="/cart">
                    <span className={styles.nav_actions_styling}>C</span>
                    art
                  </Link>
                </li>
                <Link href={"/"}>
                  <button className={styles.nav_actions_button}>Logout</button>
                </Link>
              </ul>
            }
          </Drawer>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
