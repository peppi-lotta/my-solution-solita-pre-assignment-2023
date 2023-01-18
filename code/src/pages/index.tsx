import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Header from '../components/navbar';
import Footer from '../components/footer';

<Head>
  <title>CityBike</title>
  <link rel="icon" href="/road." />
</Head>

export default function Home() {
  return (
    <div className={styles.container}>
      <Header />
      
      <Footer />
    </div>
  )
}