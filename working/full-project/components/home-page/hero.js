import Image from "next/legacy/image";
import styles from './hero.module.css';

function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.image}>
        <Image src='/images/site/cp.jpg' alt='cp' width={300} height={300} />
      </div>
      <h1>Hi, I'm CP</h1>
      <p>I am a life-long learner and love everything about tech!</p>
    </section>
  );
}

export default Hero;
