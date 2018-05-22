import ApiModel from '../apiModel';
import axios from 'axios'
/**
 * @class Match
 * @extends ApiModel
 */
class Match extends ApiModel {
    /**
     * A new match can be called by newing up with an ID or calling a static Match.get(id)
     * @constructs
     * @param {string} id id to search for
     * @param {bool} autoload if searching for an id, set this to false to not immediately make an api call to popualte the match data
     */
    constructor(id, autoload = true) {
        super(id, autoload);

        if(!this.isRecord) {
            this.included = [{
                attributes: {}
            }];
        }
    }

    /**
     * @type object
     */
    get relationships() {
        return this.data.relationshps
    }

    /**
     * @type {string}
     */
    get type() {
        try {
            return this.data.attributes.gameMode;
        } catch(e) {
            return null;
        }
    }

    /**
     * @type {string}
     */
    get map() {
        try {
            return this.data.attributes.mapname;
        } catch(e) {
            return null;
        }
    }

    /**
     * Fetch a match by id
     *
     * @memberOf {Match}
     * @param {*} id 
     * @return {Promise}
     * @fulfill {Match}
     */
    static get(id) {
        return this.callAPI(`${this.route}/${id}/`);
    }

    /**
     * Fetch for a specific match
     * WARNING: This will overwrite this object's internal data
     * @param {string} id
     * @return {Match} 
     */
    get(id) {
        return this.api
            .get(`${this.route}/${id}/`)
            .then(match => {
                if(match) {
                    match.id = id;
                }
        
                return this.wrapResponse(match);
            });
    }

    /**
     * Fetch for a specific player's data from within a match record
     *
     * @param {string} name
     * @return {object}
     */
    getPlayerByName(name) {
        if(this.isRecord === false) {
            return {};
        }

        return this.included.find(i => i.attributes.name === name);
    }

    /**
     * Return a match's telemetry data
     *
     * @param {bool} full set to true to make the call, otherwise return the URL
     * @fulfil {URL}
     * @returns promise
     */
    async getTelemetry(full = false) {
        try {
            const id = this.data.relationships.assets.data.id
            const asset = this.included.find(i => i.id === id)

           if(full) {
               const {data} = axios.get(asset.attributes.URL)

               return data;
           }

           return asset.attributes.URL
        } catch(e) {
            return full ? {} : '';
        }
    }
}

module.exports = Match