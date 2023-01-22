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
                        src="/road.png"
                        alt="bike logo"
                        width={70}
                        height={70}
                    />
                    {/* Render CityBike title */}
                    <h3>CityBike</h3>
                </div>
            </a>
        </footer>
    );
}



