import axios from 'axios';

export const serverClient = (context) => {
    if(typeof window === 'undefined') {
        return axios.create({
            baseURL: 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
            headers: context.req.headers
            })
    }

    return axios.create({
        baseURL: '/'
        })
}
