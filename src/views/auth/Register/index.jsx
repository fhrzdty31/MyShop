import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"

import styles from "./register.module.scss"

const RegisterView = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const { push } = useRouter()

    /**
     * 
     * @param { import("react").FormEvent<HTMLFormElement> } event 
     */
    const handlerSubmit = async event => {
        event.preventDefault()
        setIsLoading(true)
        setError('')
        const data = {
            email: event.target.email.value,
            fullname: event.target.fullname.value,
            phone: event.target.phone.value,
            password: event.target.password.value
        }

        const result = await fetch('/api/user/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        if (result.status == 200) {
            event.target.reset()
            setIsLoading(false)
            push('/auth/login')
        } else {
            setIsLoading(false)
            setError('Email is alredy registered')
        }
    }

    return (
        <div className={styles.register}>
            <h1 className={styles.register__title}>Register</h1>
            { error && (
                <p className={styles.register__error}>{ error }</p>
            ) }
            <div className={styles.register__form}>
                <form onSubmit={handlerSubmit}>
                <div className={styles.register__form__item}>
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" className={styles.register__form__item__input} />
                    </div>
                    <div className={styles.register__form__item}>
                        <label htmlFor="fullname">Full Name</label>
                        <input type="text" name="fullname" id="fullname" className={styles.register__form__item__input} />
                    </div>
                    <div className={styles.register__form__item}>
                        <label htmlFor="phone">Phone</label>
                        <input type="tel" name="phone" id="phone" className={styles.register__form__item__input} />
                    </div>
                    <div className={styles.register__form__item}>
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" className={styles.register__form__item__input} />
                    </div>
                    <div>
                        <button type="submit" className={styles.register__form__button}>
                            { isLoading ? 'Loading...' : 'Register' }
                        </button>
                    </div>
                </form>
            </div>
            <p className={styles.register__link}>Have an account? Sign in <Link href="/auth/login">here</Link> </p>
        </div>
    )
}

export default RegisterView