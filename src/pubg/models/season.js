import Api from '../../api/PubgApi';
import ApiModel from '../apiModel';
import { Module } from 'module';

/**
 * @class Season
 * @extends ApiModel
 */
class Season extends ApiModel {
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
        const {data} =  this.callAPI(`seasons`);

        return data;
    }


    /**
     * Get Current Season
     *
     * @returns {Promise}
     * @fulfill {Season}
     */
    static getCurrent() {
        const data = Season.get();

        return data.filter(d => d.attributes.isCurrentSeason === true).shift() 
    }
}

module.exports = Player