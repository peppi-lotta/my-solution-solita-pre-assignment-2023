import React from "react";
import styles from '../styles/layout.module.scss';
import Image from "next/image";

export default function Footer() {

    return (
        <footer className={styles.footer}>
            <a href="/"><div className={styles.logo}>
            <Image
                src="/road.png"
                alt="bike logo"
                width={70}
                height={70}
            />
                <h3>CityBike</h3>
            </div></a>
        </footer>
    );
}