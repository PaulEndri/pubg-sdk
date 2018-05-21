import ApiModel from '../apiModel';
import Api from '../../api/PubgApi';

export default class Season extends ApiModel {
    constructor() {
        return Season.get()
    }

    static get primaryKey() {
        return "id";
    }

    static get() {
        return Api
            .get(`seasons`)
            .then(({data}) => data);
    }

    static getCurrent() {
        return Api
            .get('seasons')
            .then(({data}) => data.filter(d => d.attributes.isCurrentSeason === true)).shift()
    }
} 