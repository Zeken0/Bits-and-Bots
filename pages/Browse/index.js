import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/NavBar";
import styles from "/styles/Home.module.scss";
import axios from "axios";
import { GridLoader } from "react-spinners";
import { Tabs } from "@mantine/core";
import Footer from "@/components/Footer";
import {
  saveToLocalStorage,
  getFromLocalStorage,
  getUser,
} from "@/components/libs/localHelpers";

if (getUser("user") === null) {
  window.location = "/";
}

export async function getStaticProps() {
  const response = await axios.get("http://127.0.0.1:1337/api/bits-and-botss");
  const data = await response.data;

  return {
    props: { games: data.data },
  };
}

if (typeof window !== "undefined") {
  console.log(JSON.parse(localStorage.cart));
}

export default function Browse({ games }) {
  const toggleGameToLocalStorage = (id, Title, image_url, Price) => {
    const newGame = {
      Id: id,
      Title: Title,
      Image: image_url,
      Price: Price,
    };

    let cartItems = getFromLocalStorage("cart");

    let isInStorage = cartItems.find((item) => {
      return item.Id === id;
    });

    if (isInStorage === undefined) {
      cartItems.push(newGame);
      saveToLocalStorage("cart", cartItems);
    } else {
      let removedcartItemsArray = cartItems.filter((item) => {
        return item.Id !== id;
      });
      saveToLocalStorage("cart", removedcartItemsArray);
    }
    // window.location.reload(false);
  };

  let isInStorage = getFromLocalStorage("cart").find((item) => {
    return item.Id;
  });
  // console.log("isInStorage", isInStorage.Id);
  // console.log("games", games[2].id);

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
            <Link href={"/cart/"}>
              <button>View Cart</button>
            </Link>
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
                      console.log("game", game.id);
                      return (
                        <div className={styles.game_container} key={game.id}>
                          <Link href={"/Browse/" + game.id}>
                            <Image
                              src={game.attributes.image_url}
                              height={200}
                              width={140}
                              alt="image of a game cover"
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

                              <button
                                onClick={() => {
                                  toggleGameToLocalStorage(
                                    game.id,
                                    game.attributes.Title,
                                    game.attributes.image_url,
                                    game.attributes.Price
                                  );
                                }}
                              >
                                {isInStorage === game.id ? (
                                  <>Added To Cart</>
                                ) : (
                                  <>Add To Cart</>
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </Tabs.Panel>
              <Tabs.Panel value="rpg" pt="lg">
                <div className={styles.games_filters}>
                  {!games ? (
                    <div className={styles.loader}>
                      <GridLoader color="#E5560E" size={20} />
                    </div>
                  ) : (
                    games.map((game) => {
                      if (game.attributes.Genre === "RPG") {
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
                      }
                    })
                  )}
                </div>
              </Tabs.Panel>
              <Tabs.Panel value="action" pt="lg">
                <div className={styles.games_filters}>
                  {!games ? (
                    <div className={styles.loader}>
                      <GridLoader color="#E5560E" size={20} />
                    </div>
                  ) : (
                    games.map((game) => {
                      if (game.attributes.Genre === "Action") {
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
                      }
                    })
                  )}
                </div>
              </Tabs.Panel>
              <Tabs.Panel value="shooter" pt="lg">
                <div className={styles.games_filters}>
                  {!games ? (
                    <div className={styles.loader}>
                      <GridLoader color="#E5560E" size={20} />
                    </div>
                  ) : (
                    games.map((game) => {
                      if (game.attributes.Genre === "Shooter") {
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
                      }
                    })
                  )}
                </div>
              </Tabs.Panel>
              <Tabs.Panel value="racing" pt="lg">
                <div className={styles.games_filters}>
                  {!games ? (
                    <div className={styles.loader}>
                      <GridLoader color="#E5560E" size={20} />
                    </div>
                  ) : (
                    games.map((game) => {
                      if (game.attributes.Genre === "Racing") {
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
                      }
                    })
                  )}
                </div>
              </Tabs.Panel>
            </Tabs>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
