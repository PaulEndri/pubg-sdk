import Api from '../../api/PubgApi';
import ApiModel from '../apiModel';
import { Module } from 'module';

/**
 * @class Season
 * @extends ApiModel
 */
export default class Season extends ApiModel {
    constructor() {
        super(false, false)

        return Season.get()
    }

    static get primaryKey() {
        return "id";
    }

    /**
     * Get all Seasons
     * @returns {Promise}
     * @fulfil {Season[]}
     */
    static async get() {
        const {data} =  await this.callAPI(`seasons`, 'pc-na');

        return data;
    }


    /**
     * Get Current Season
     *
     * @returns {Promise}
     * @fulfill {Season}
     */
    static async getCurrent() {
        const data = await Season.get();

        return data.filter(d => d.attributes.isCurrentSeason === true).shift() 
    }
}