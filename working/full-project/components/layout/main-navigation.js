import styles from './main-navigation.module.css';
import Link from 'next/link';
import Logo from './logo';

export default function MainNavigation() {
  return (
    <header className={styles.header}>
      <Link href='/'>
        {/* <a> */}
        <Logo />
        {/* </a> */}
      </Link>
      <ul>
        <li>
          <Link href='/posts'>Posts</Link>
        </li>
        <li>
          <Link href='/contact'>Contact</Link>
        </li>
      </ul>
    </header>
  );
}
