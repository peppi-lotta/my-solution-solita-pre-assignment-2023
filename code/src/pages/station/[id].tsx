import styles from '../../styles/layout.module.scss'
import Header from '../../components/navbar';
import Footer from '../../components/footer';
import Content from './content';
import { useRouter } from 'next/router';

export default function Home() {
    const router = useRouter();
    const { id } = router.query;
    return (
        <div className={styles.container}>
            <Header />
            <Content id={ id } />
            <Footer />
        </div>
    )
}