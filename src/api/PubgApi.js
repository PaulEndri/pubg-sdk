import axios from 'axios';
import env   from '../env/env';

const API_ROOT = `https://api.playbattlegrounds.com/shards/{{region}}`;
const HEADER   = {
    'Authorization': `Bearer ${env.apiKey}`,
    'Content-Type': 'application/json',
    'Accept': 'application/vnd.api+json'
}

/**
 * Simple api connector that wraps around the basic axios object
 * @class PubgApi
 */
export default class PubgApi {
    /**
     * Makes a GET request to the requested route
     * @param {string} route
     * @param {string} region
     * @fulfil {object} PUBG Api Data
     * @error {object} Axios error object
     * @return {Promise}
     */
    static get(route, region) {
        return new Promise((resolve, reject) => {
            const _region = region || env.region;
            axios({
                baseURL: API_ROOT.replace('{{region}}', _region),
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