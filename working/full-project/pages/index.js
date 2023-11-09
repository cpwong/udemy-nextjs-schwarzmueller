import Head from "next/head";
import FeaturedPosts from "../components/home-page/featured-posts";
import Hero from "../components/home-page/hero";
import { getFeaturedPosts } from "../lib/posts-util";

export default function HomePage({ posts }) {
  return (
    <>
      <Head>
        <title>🚀Welcome to My First NextJS Site!</title>
      </Head>
      <Hero />
      <FeaturedPosts posts={posts} />
    </>
  )
};

export function getStaticProps() {
  const featuredPosts = getFeaturedPosts();
  return {
    props: {
      posts: featuredPosts
    }
  }
}
