import axios from 'axios';
import env   from '../env/env';

const API_ROOT = `https://api.playbattlegrounds.com/shards/${env.region}`;
const HEADER   = {
    'Authorization': `Bearer ${env.apiKey}`,
    'Content-Type': 'application/json',
    'Accept': 'application/vnd.api+json'
}

/**
 * Simple api connector that wraps around the basic axios object
 */
export default class PubgApi {
    /**
     * Makes a GET request to the requested route
     * @param {string} route 
     */
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
