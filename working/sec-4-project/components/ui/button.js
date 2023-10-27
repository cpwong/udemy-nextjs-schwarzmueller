import Link from 'next/link';
import styles from './button.module.css';

export default function Button({ link, children, onClick }) {
  if (link) {
    return (
      <>
        <Link className={styles.btn} href={link}>
          {children}
        </Link>
      </>
    );
  }
  return <button className={styles.button} onClick={onClick}>{children}</button>
}
