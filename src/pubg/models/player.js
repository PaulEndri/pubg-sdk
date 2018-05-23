import ApiModel from '../apiModel';
import Match from './match';
import Api from '../../api/PubgApi';
import Season from './season';

/**
 * @class Player
 * @extends ApiModel
 */
export default class Player extends ApiModel {
    /**
     * A new player can be called by newing up with an ID or calling a static Player.get(id)
     *
     * @param {string} id id to search for
     * @param {bool} autoload if searching for an id, set this to false to not immediately make an api call to popualte the player data
     */
    constructor(id, autoload = true) {
        super(id, autoload);

        if(this.isRecord === false && !id) {
            this.relationships = {
                matches: {
                    data: []
                }
            };
        }
    }

    get primaryKey() {
       return "id";
    }

    /**
     * @type {Match[]}
     */
    get matches() {
        return this.isRecord === true
            ? this.relationships.matches.data.map(match => new Match(match.id, false))
            : [];
    }
    
    /**
     * Returns a fetched Player response
     *
     * @param {string} id 
     * @return {Promise}
     * @fulfill {Player}
     */
    async get(id) {
        let {data} = await this.api.get(`players/${id}`);

        return this.wrapResponse(data);
    }

    /**
     * Fetch a player by id
     *
     * @param {string} id 
     * @fulfil {Player}
     * @returns {Promise}
     */
    static async get(id) {
        return await new Player(id);
    }

    /**
     * Load a player's seasonal stats
     *
     * @param {string} season if left null, defaults to the current season 
     * @fulfil {object}
     * @returns {Promise}
     */
    async loadSeason(season) {
        if(!season) {
            const latestSeason = await Season.getCurrent();

            return this.internalLoadSeason(latestSeason.id);
        }

        return this.internalLoadSeason(season);
    }

    /**
     * @private
     * @param {string} season
     * @returns {Promise}
     */
    async internalLoadSeason(season) {
        const {data} = await this.api.get(`players/${this.id}/seasons/${season}`);

        this.relationships.attributes[season] = data.attributes.gameModeStats;

        return data.attributes.gameModeStats;
    }

    /**
     * Search for a player by name
     *
     * @param {string} name
     * @fulfil {Player}
     * @returns {Promise}
     */
    static async findByName(name) {
        let route = `players?filter[playerName]=${name}`;
        let {data} = await Api.get(route);

        if(data) {
            return Object.assign(new Player(false, false), data[0], {isRecord: true});
        }

        throw new Error("No results found");
    }
}