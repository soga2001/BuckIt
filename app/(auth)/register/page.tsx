import styles from './register.module.scss'

import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Register',
    description: 'The Registration Page',
}

export default function Register() {

    return (
        <div className={styles.main}>Register</div>
    )
}