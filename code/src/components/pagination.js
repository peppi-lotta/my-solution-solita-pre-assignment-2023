import styles from '../styles/layout.module.scss';

const Pagination = ({ items, pageSize, currentPage, onPageChange }) => {
    const pagesCount = Math.ceil(items / pageSize); // 100/10

    if (pagesCount === 1) return null;
    const allPages = Array.from({ length: pagesCount }, (_, i) => i + 1);
    const last = allPages[allPages.length - 1];
    const showPages = Array.from({ length: ((currentPage + 5) - currentPage) }, (_, i) => currentPage + i);

    return (
        <div>
            <ul className={styles.pagination}>
                <li className={styles.text}><a className={styles.pageLink} onClick={() => onPageChange(currentPage - 1)}>
                    Edellinen
                </a></li>
                <li><a onClick={() => onPageChange(1)}>1</a></li>
                <li>...</li>
                {showPages.map((page) => (
                    <li
                        key={page}
                        className={
                            page === currentPage ? styles.pageItemActive : styles.pageItem
                        }
                    >
                        <a onClick={() => onPageChange(page)}>
                            {page}
                        </a>
                    </li>
                ))}
                <li>...</li>
                <li><a onClick={() => onPageChange(last)}>{last}</a></li>
                <li className={styles.text}><a className={styles.pageLink} onClick={() => onPageChange(currentPage + 1)}>
                    Seuraava
                </a></li>
            </ul>
        </div>
    );
};

export default Pagination;