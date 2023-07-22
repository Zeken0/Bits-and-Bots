import Head from "next/head";
import Navbar from "@/components/NavBar";
import styles from "/styles/Home.module.scss";
import axios from "axios";
import Footer from "@/components/Footer";
import Image from "next/image";
import { getUser } from "@/components/libs/localHelpers";

if (getUser("user") === null) {
  window.location = "/";
}

export const getStaticPaths = async () => {
  let paths = [];
  try {
    const response = await axios.get(
      "http://127.0.0.1:1337/api/bits-and-botss"
    );
    const games = await response.data;

    paths = games.map((game) => {
      return {
        params: { id: game.id },
      };
    });
  } catch (error) {
    console.warn("failed to fetch games", error.message);
  }

  return {
    paths: paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  let props = { game: {} };
  try {
    const id = context.params.id;
    const response = await axios.get(
      "http://127.0.0.1:1337/api/bits-and-botss/" + id
    );
    const game = await response.data;
    props = { game: game };
  } catch (error) {
    console.warn("failed to fetch data", error.message);
  }

  return {
    props: props,
  };
};

export default function Detail({ game }) {
  console.log("game:", game.data.attributes.Title);
  return (
    <>
      <Head>
        <title>{game.data.attributes.Title} | Bits & Bots</title>
        <meta
          name="description"
          content="This is the details page for the Bits & bots online game store"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <div className={styles.details_container}>
        <main>
          <h1>{game.data.attributes.Title}</h1>
          <div className={styles.details_content}>
            <Image
              src={game.data.attributes.image_url}
              height={400}
              width={300}
              alt="Picture of a game cover"
            />
            <div className={styles.details_info}>
              <p>{game.data.attributes.Details}</p>
              <h2>${game.data.attributes.Price}</h2>
              <button>Add To Cart</button>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
