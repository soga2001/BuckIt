/** @type {import('next').NextConfig} */
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

const nextConfig = {
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
    async redirects() {
        return [
          // Basic redirect
        //   {
        //     source: '/',
        //     destination: '/home',
        //     permanent: true,
        //   },
          // Wildcard path matching
        //   {
        //     source: '/blog/:slug',
        //     destination: '/news/:slug',
        //     permanent: true,
        //   },
        ]
    }
};

export default nextConfig;
