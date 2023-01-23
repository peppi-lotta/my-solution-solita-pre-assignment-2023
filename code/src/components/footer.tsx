//style imports
import styles from '../styles/layout.module.scss';
//functional imports
import React from "react";
//component imports
import Image from "next/image"; 

// Footer functional component
export default function Footer() {
    return (
        <footer className={styles.footer}>
            {/* Link to front page */}
            <a href="/">
                <div className={styles.logo}>
                    {/* Render Bike logo as an image with width and height of 70 */}
                    <Image
                        src="/logo.png"
                        alt="bike logo"
                        width={100}
                        height={60}
                    />
                </div>
            </a>
        </footer>
    );
}



