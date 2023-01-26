import Head from 'next/head'
import styles from '../styles/layout.module.scss'
import Header from '../components/navbar';
import Footer from '../components/footer';
import Content from './stations';

<Head>
  <title>CityBike</title>
  <link rel="icon" href="/logo.png" />
</Head>

export default function Home() {//Higest level componen that just places components on page
  return (
    <div className={styles.container}> 
      <Header />
      {/* List of stations */}
      <Content />
      <Footer />
    </div>
  )
}