import express from 'express'
import axios from 'axios'
import querystring from 'querystring'
import dotenv from 'dotenv'

dotenv.config()

const {
    PAYPAL_CLIENT_ID: clientId,
    PAYPAL_SECRET_KEY: secretKey
} = process.env

const router = express.Router()

router.get('/token', async (req, res) => {
    if (!clientId || !secretKey) {
        return res.status(400).json({
            error: 'client id or secret key is not provided'
        })
    }
    try {
        const body = querystring.stringify({
            grant_type: 'client_credentials'
        })
        const response = await axios.post('https://api-m.sandbox.paypal.com/v1/oauth2/token', body, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            auth: {
                username: clientId ?? '',
                password: secretKey ?? ''
            }
        })
        return res.json({
            ...response.data
        })
    } catch (e) {
        console.error(e)
        return res.status(500).json({
            error: e
        })
    }
})

export default router