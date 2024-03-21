import { singUp } from "@/libs/firebase/service"

/**
 * 
 * @param { import('next').NextApiRequest } req 
 * @param { import('next').NextApiResponse } res 
 */
export default async function handler(req, res) {
    if (req.method === "POST") {
        await singUp(
            req.body,
            status => {
                if (status) {
                    res.status(200).json({ status: true, statusCode: 200, message: 'success' })
                } else {
                    res.status(400).json({ status: false, statusCode: 400, message: 'failed' })
                }
            }
        )
    } else {
        res.status(405).json({ status: false, statusCode: 405, message: 'Method not allowed' })
    }
}