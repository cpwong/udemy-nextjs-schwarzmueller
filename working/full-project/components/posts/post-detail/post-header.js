import Image from "next/legacy/image";
import styles from './post-header.module.css';

export default function PostHeader({ title, image }) {
  return (
    <header className={styles.header}>
      <h1>{title}</h1>
      <Image src={image} alt={title} width={200} height={150} />
    </header>
  );
}
