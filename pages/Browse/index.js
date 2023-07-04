import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/NavBar";
import styles from "/styles/Home.module.scss";
import axios from "axios";
import { GridLoader } from "react-spinners";
import { Tabs } from "@mantine/core";
import Footer from "@/components/Footer";

export async function getStaticProps() {
  const response = await axios.get("http://127.0.0.1:1337/api/bits-and-botss");
  const data = await response.data;

  return {
    props: { games: data.data },
  };
}

export default function Browse({ games }) {
  console.log(games);
  return (
    <>
      <Head>
        <title>Browse | Bits & Bots</title>
        <meta
          name="description"
          content="This is the browse page for the Bits & bots online game store"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />

      <div className={styles.browse_container}>
        <main>
          <div className={styles.browse_actions}>
            <h1>Browse our games</h1>
            <button>View Cart</button>
          </div>
          <div className={styles.browse_content}>
            <Tabs color="orange" radius="xs" defaultValue="all">
              <Tabs.List grow>
                <Tabs.Tab value="all">All Games</Tabs.Tab>
                <Tabs.Tab value="rpg">RPG</Tabs.Tab>
                <Tabs.Tab value="action">Action</Tabs.Tab>
                <Tabs.Tab value="shooter">Shooters</Tabs.Tab>
                <Tabs.Tab value="racing">Racing</Tabs.Tab>
              </Tabs.List>

              <Tabs.Panel value="all" pt="lg">
                <div className={styles.games_filters}>
                  {!games ? (
                    <div className={styles.loader}>
                      <GridLoader color="#E5560E" size={20} />
                    </div>
                  ) : (
                    games.map((game) => {
                      return (
                        <div className={styles.game_container} key={game.id}>
                          <Link href={"/Browse/" + game.id}>
                            <Image
                              src={game.attributes.image_url}
                              height={200}
                              width={140}
                              alt="image of a game"
                            />
                          </Link>
                          <div className={styles.game_info}>
                            <Link href={"/Browse/" + game.id}>
                              <h2>{game.attributes.Title}</h2>
                            </Link>
                            <div className={styles.game_actions}>
                              <Link href={"/Browse/" + game.id}>
                                <span>Details</span>
                              </Link>
                              <button>Add To Cart</button>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </Tabs.Panel>
              <Tabs.Panel value="rpg" pt="lg">
                ewf
              </Tabs.Panel>
              <Tabs.Panel value="action" pt="lg"></Tabs.Panel>
              <Tabs.Panel value="shooter" pt="lg"></Tabs.Panel>
              <Tabs.Panel value="racing" pt="lg"></Tabs.Panel>
            </Tabs>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
