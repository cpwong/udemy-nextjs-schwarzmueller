import styles from './post-grid.module.css';
import PostItem from './post-item';
function PostGrid({ posts }) {
  return (
    <>
      <ul className={styles.grid}>
        {posts.map((post) => (
          <PostItem key={post.slug} post={post} />
        ))}
      </ul>
    </>
  );
}

export default PostGrid;
