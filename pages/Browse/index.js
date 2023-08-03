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
import { useState, useEffect } from "react";

if (getUser("user") === null) {
  window.location = "/";
}

export async function getStaticProps() {
  try {
    const response = await axios.get(
      "https://bitsbotsapi.onrender.com/api/bits-and-botss"
    );
    const data = await response.data;

    return {
      props: { games: data.data },
    };
  } catch (error) {
    console.warn("failed to fetch games:", error.message);
  }
}

export default function Browse({ games }) {
  const [isInCart, setIsInCart] = useState(false);

  useEffect(() => {
    const gameInStorage = getFromLocalStorage("cart").find(
      (item) => item.Id === games.id
    );
    setIsInCart(!!gameInStorage);
  }, [games]);

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
      setIsInCart(true);
    } else {
      let removedcartItemsArray = cartItems.filter((item) => {
        return item.Id !== id;
      });
      saveToLocalStorage("cart", removedcartItemsArray);
      setIsInCart(false);
    }
  };

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
                      <GridLoader color="#E5560E" size={15} />
                    </div>
                  ) : (
                    games.map((game) => {
                      const gameInStorage = getFromLocalStorage("cart").find(
                        (item) => {
                          return item.Id === game.id;
                        }
                      );

                      return (
                        <div className={styles.game_container} key={game.id}>
                          <Link href={"/Details/" + game.id}>
                            <Image
                              src={game.attributes.image_url}
                              height={210}
                              width={145}
                              alt="image of a game cover"
                              priority
                            />
                          </Link>
                          <div className={styles.game_info}>
                            <Link href={"/Details/" + game.id}>
                              <h2>{game.attributes.Title}</h2>
                            </Link>
                            <div className={styles.game_actions}>
                              <Link href={"/Details/" + game.id}>
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
                                {gameInStorage ? (
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
                      <GridLoader color="#E5560E" size={15} />
                    </div>
                  ) : (
                    games.map((game) => {
                      const gameInStorage = getFromLocalStorage("cart").find(
                        (item) => {
                          return item.Id === game.id;
                        }
                      );
                      if (game.attributes.Genre === "RPG") {
                        return (
                          <div className={styles.game_container} key={game.id}>
                            <Link href={"/browse/" + game.id}>
                              <Image
                                src={game.attributes.image_url}
                                height={200}
                                width={140}
                                alt="image of a game"
                                priority
                              />
                            </Link>
                            <div className={styles.game_info}>
                              <Link href={"/browse/" + game.id}>
                                <h2>{game.attributes.Title}</h2>
                              </Link>
                              <div className={styles.game_actions}>
                                <Link href={"/browse/" + game.id}>
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
                                  {gameInStorage ? (
                                    <>Added To Cart</>
                                  ) : (
                                    <>Add To Cart</>
                                  )}
                                </button>
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
                      <GridLoader color="#E5560E" size={15} />
                    </div>
                  ) : (
                    games.map((game) => {
                      const gameInStorage = getFromLocalStorage("cart").find(
                        (item) => {
                          return item.Id === game.id;
                        }
                      );
                      if (game.attributes.Genre === "Action") {
                        return (
                          <div className={styles.game_container} key={game.id}>
                            <Link href={"/browse/" + game.id}>
                              <Image
                                src={game.attributes.image_url}
                                height={200}
                                width={140}
                                alt="image of a game"
                                priority
                              />
                            </Link>
                            <div className={styles.game_info}>
                              <Link href={"/Bbrowse/" + game.id}>
                                <h2>{game.attributes.Title}</h2>
                              </Link>
                              <div className={styles.game_actions}>
                                <Link href={"/browse/" + game.id}>
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
                                  {gameInStorage ? (
                                    <>Added To Cart</>
                                  ) : (
                                    <>Add To Cart</>
                                  )}
                                </button>
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
                      <GridLoader color="#E5560E" size={15} />
                    </div>
                  ) : (
                    games.map((game) => {
                      const gameInStorage = getFromLocalStorage("cart").find(
                        (item) => {
                          return item.Id === game.id;
                        }
                      );
                      if (game.attributes.Genre === "Shooter") {
                        return (
                          <div className={styles.game_container} key={game.id}>
                            <Link href={"/browse/" + game.id}>
                              <Image
                                src={game.attributes.image_url}
                                height={200}
                                width={140}
                                alt="image of a game"
                                priority
                              />
                            </Link>
                            <div className={styles.game_info}>
                              <Link href={"/browse/" + game.id}>
                                <h2>{game.attributes.Title}</h2>
                              </Link>
                              <div className={styles.game_actions}>
                                <Link href={"/browse/" + game.id}>
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
                                  {gameInStorage ? (
                                    <>Added To Cart</>
                                  ) : (
                                    <>Add To Cart</>
                                  )}
                                </button>
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
                      <GridLoader color="#E5560E" size={15} />
                    </div>
                  ) : (
                    games.map((game) => {
                      const gameInStorage = getFromLocalStorage("cart").find(
                        (item) => {
                          return item.Id === game.id;
                        }
                      );
                      if (game.attributes.Genre === "Racing") {
                        return (
                          <div className={styles.game_container} key={game.id}>
                            <Link href={"/browse/" + game.id}>
                              <Image
                                src={game.attributes.image_url}
                                height={200}
                                width={140}
                                alt="image of a game"
                                priority
                              />
                            </Link>
                            <div className={styles.game_info}>
                              <Link href={"/browse/" + game.id}>
                                <h2>{game.attributes.Title}</h2>
                              </Link>
                              <div className={styles.game_actions}>
                                <Link href={"/browse/" + game.id}>
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
                                  {gameInStorage ? (
                                    <>Added To Cart</>
                                  ) : (
                                    <>Add To Cart</>
                                  )}
                                </button>
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
