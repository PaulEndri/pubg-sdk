import ApiModel from '../apiModel';
import axios from 'axios'
/**
 * @class Match
 * @extends ApiModel
 */
export default class Match extends ApiModel {
    /**
     * A new match can be called by newing up with an ID or calling a static Match.get(id)
     * @constructs
     * @param {string} id id to search for
     * @param {string} region
     * @param {bool} autoload if searching for an id, set this to false to not immediately make an api call to popualte the match data
     */
    constructor(id, region, autoload = true) {
        super(id, region, autoload);

        if(!this.isRecord) {
            this.included = [{
                attributes: {}
            }];
        }
    }

    get primaryKey() {
        return "id";
    }

    /**
     * @type object
     */
    get relationships() {
        return this.data.relationships;
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
     * @type {[]}
     */
    get players() {
        return this.getPlayers(true)
    }

    /**
     * @type {[]}
     */
    get rosters() {
        return this.getRosters(true)
    }

    /**
     * Fetch a match by id
     *
     * @memberOf {Match}
     * @param {string} id
     * @param {string} region
     * @return {Promise}
     * @fulfill {Match}
     */
    static get(id, region) {
        return new Match(id, region);
    }

    get route() {
        return "matches";
    }

    /**
     * Fetch for a specific match
     * WARNING: This will overwrite this object's internal data
     * @param {string} id
     * @param {string} region
     * @return {Match} 
     */
    async get(id, region) {
        let data = await this.api.get(`${this.route}/${id}`, region);
        data.id  = id;

        return this.wrapResponse(data);
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

        return this.included.find(i => i.attributes.stats.name === name);
    }

    /**
     * Fetch for a specific player's data from within a match record
     * @private
     * @param {string} id
     * @return {object}
     */
    getPlayerById(id) {
        if(this.isRecord === false) {
            return {};
        }

        return this.included.find(i => i.id === id);
    }

    /**
     * Return a list of rosters
     * @param {Boolean} full if set to true, will parse the data and return each roster with the player data
     * @returns {Roster[]} 
     */
    getRosters(full = false) {
        if(this.isRecord === false) {
            return [];
        }

        const rosters = this.included.filter(i => i.type === "roster");

        if(!full) {
            return rosters;
        }

        return rosters.map(r => {
            const roster = {
                rank: r.attributes.stats,
                players: r.relationships.participants.data.map(d => {
                    const player = this.getPlayerById(d.id);

                    return player.attributes.stats;
                })
            }
        })
    }

    getPlayers(simplified = true) {
        const players = this.included.filter(i => i.type === "participant");

        if(simplified) {
            return players.map(p => p.attributes.stats)
        }

        return players
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
            const id = this.data.relationships.assets.data[0].id
            const asset = this.included.find(i => i.id === id)

           if(full) {
               const {data} = await axios.get(asset.attributes.URL);

               return data;
           }

           return asset.attributes.URL;
        } catch(e) {
            return full ? {} : '';
        }
    }
}