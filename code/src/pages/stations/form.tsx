import { useState } from 'react'
import styles from '../../styles/layout.module.scss'

export default function Form() {
    const [postDataBody, SetPostDataBody] = useState([]);
    
    return (
        <div className={styles.wrap}>
            <form action="/send-data-here" method="post">
                <label for="first">First name:</label>
                <input type="text" id="first" name="first" />
                <label for="last">Last name:</label>
                <input type="text" id="last" name="last" />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}