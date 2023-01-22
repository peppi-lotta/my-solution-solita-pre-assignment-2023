import Head from 'next/head'
import styles from '../../styles/layout.module.scss'
import Header from '../../components/navbar';
import Footer from '../../components/footer';
import Content from './content'

export default function Home() { //Higest level componen that just places components on page
  return (
    <div className={styles.container}>
      <Header />
      <Content />
      <Footer />
    </div>
  )
}