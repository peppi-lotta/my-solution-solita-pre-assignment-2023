import Head from 'next/head'
import styles from '../styles/layout.module.scss'
import Header from '../components/navbar';
import Footer from '../components/footer';
import Content from './stations';

<Head>
  <title>CityBike</title>
  <link rel="icon" href="/logo.png" />
</Head>

export default function Home() {
  return (
    <div className={styles.container}>
      <Header />
      <Content />
      <Footer />
    </div>
  )
}