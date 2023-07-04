import Navbar from "@/components/NavBar";
import Head from "next/head";
import React from "react";
import styles from "/styles/Home.module.scss";

export const getStaticPaths = async () => {
  let paths = [];
  try {
    const response = await axios.get(
      "http://127.0.0.1:1337/api/bits-and-botss"
    );
    const games = await response.data;

    paths = games.map((game) => {
      return {
        params: { gameId: game.id },
      };
    });
  } catch (error) {
    console.warn("failed to fetch games");
  }

  return {
    paths: paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  let props = { game: {} };
  try {
    const id = context.params.gameId;
    const response = await axios.get(
      "http://127.0.0.1:1337/api/bits-and-botss/" + id
    );
    const game = await response.data;
    props = { game: game };
  } catch (error) {
    console.warn("failed to fetch data");
  }

  return {
    props: props,
  };
};

export default function Details({ game }) {
  console.log(game);
  return (
    <>
      <Head>
        <title> | Bits & Bots</title>
        <meta
          name="description"
          content="This is the browse page for the Bits & bots online game store"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <div className={styles.details_container}>details</div>
    </>
  );
}
