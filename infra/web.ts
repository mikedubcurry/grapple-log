import { api } from "./api"

export const web = new sst.aws.StaticSite('grapple-log-web', {
    path: 'web',
    build: {
        command: 'npm run build',
        output: 'dist',
    },
    environment: {
        VITE_API_URL: api.url
    }
})
