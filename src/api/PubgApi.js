import axios from 'axios';
import env   from '../env/env';

const API_ROOT = `https://api.playbattlegrounds.com/shards/${env.region}`;
const HEADER   = {
    'Authorization': `Bearer ${env.apiKey}`,
    'Content-Type': 'application/json',
    'Accept': 'application/vnd.api+json'
}

export default class PubgApi {
    static get(route) {
        return new Promise((resolve, reject) => {
            axios({
                baseURL: API_ROOT,
                headers: HEADER,
                url:     route
            })
                .then(({data}) => resolve(data))
                .catch(e => {
                    console.log(e);
                    reject(e.errors);
                })
        })
    }

}
