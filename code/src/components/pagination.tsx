//This file has pagination html and funtionality to change the current page

import styles from '../styles/layout.module.scss'; //style import
import React from 'react'; //funtional import

interface Props { //defining Props interface
    items: number; //total number of items
    pageSize: number; //number of items per page
    currentPage: number; //current page number
    onPageChange: (page: number) => void; // function that handles page change
}

const Pagination: React.FC<Props> = ({ items, pageSize, currentPage, onPageChange }) => { //Pagination functional component
    const pagesCount = Math.ceil(items / pageSize); //calculating total number of pages

    if (pagesCount === 1) return null; //if only one page, return null
    const allPages = Array.from({ length: pagesCount }, (_, i) => i + 1); //generating an array of all pages
    const last = allPages[allPages.length - 1]; //getting the last page
    const showPages = Array.from({ length: ((currentPage + 5) - currentPage) }, (_, i) => currentPage + i); //generating an array of pages to show

    return (
        <div>
            <ul className={styles.pagination}>
                {/* previous page button */}
                <li className={styles.text}><a className={styles.pageLink} onClick={() => onPageChange(currentPage - 1)}>
                    Edellinen
                </a></li>
                {/* buttons that show current page and next 4 pages */}
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
                {/* next page button */}
                <li className={styles.text}><a className={styles.pageLink} onClick={() => onPageChange(currentPage + 1)}>
                    Seuraava
                </a></li>
            </ul>
        </div>
    );
};

export default Pagination;
