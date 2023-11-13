/** @type {import('next').NextConfig} */
require('dotenv').config();


module.exports = {
    env: {
        base_url: process.env.base_url,
    },
}
