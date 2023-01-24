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
    const last = Math.ceil(items / pageSize); //getting the last page

    let showPages = Array.from({ length: 6 }, (_, i) => ((currentPage - 2) + i)); //generating an array of pages to show
    if (currentPage > (last - 4)) {
        showPages = Array.from({ length: 6 }, (_, i) => ((last - 5) + i)); //generating an array of pages to show
    }
    if (currentPage < 4) {
        showPages = Array.from({ length: (last < 6 ) ? last : 6 }, (_, i) => (1 + i)); //generating an array of pages to show
    }


    return (
        <div>
            <ul className={styles.pagination}>
                {/* previous page button. Disabled on first page */}
                <li className={currentPage === 1 ? styles.text_disabled : styles.text}><a className={styles.pageLink} onClick={() => onPageChange(currentPage - 1)} >
                    Edellinen
                </a></li>
                {/* first page button. Only show first page button if it is not otherwise visible */}
                {(showPages[0] != 1) &&
                    <li className={styles.text}>
                        <a className={styles.pageLink} onClick={() => onPageChange(1)}>Alkuun</a>
                    </li>
                }
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
                {/* last page button. Only show last page button if it is not otherwise visible */}
                {((showPages[5] != last) && (showPages.length == 6)) &&
                    <li className={styles.text}><a className={styles.pageLink} onClick={() => onPageChange(last)}>
                        Loppuun
                    </a></li>
                }

                {/* next page button. disabeld on last page */}
                <li className={currentPage === last ? styles.text_disabled : styles.text}>
                    <a className={styles.pageLink} onClick={() => onPageChange(currentPage + 1)}>Seuraava</a>
                </li>
            </ul>
        </div>
    );
};

export default Pagination;
