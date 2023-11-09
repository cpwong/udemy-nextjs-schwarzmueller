import styles from './all-posts.module.css';
import PostGrid from './post-grid';

export default function AllPosts({ posts }) {
  return (
    <section>
      <h1>All Posts</h1>
      <PostGrid posts={posts} />
    </section>
  )
}
