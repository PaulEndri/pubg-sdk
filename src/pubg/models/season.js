import Api from '../../api/PubgApi';
import ApiModel from '../apiModel';

export default class Season extends ApiModel {
    constructor() {
        super(false, false)

        return Season.get()
    }

    static get primaryKey() {
        return "id";
    }

    static async get() {
        const {data} =  this.callAPI(`seasons`);

        return data;
    }

    static getCurrent() {
        const data = Season.get();

        return data.filter(d => d.attributes.isCurrentSeason === true).shift() 
    }
} 