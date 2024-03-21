import '@/styles/globals.css'

import { Lato } from "next/font/google"

const lato = Lato({
    subsets: ['latin'],
    weight: ['100', '300', '400', '700', '900']
})

export default function App({ Component, pageProps }) {
    return (
        <div className={lato.className}>
            <Component {...pageProps} />
        </div>
    )
}
