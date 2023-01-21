import styles from '../../styles/layout.module.scss'
import Header from '../../components/navbar';
import Footer from '../../components/footer';
import Content from './content';

export default function Home() {

    return (
        <div className={styles.container}>
            <Header />
            <Content />
            <Footer />
        </div>
    )
}