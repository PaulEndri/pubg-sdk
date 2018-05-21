import ApiModel from '../apiModel';

/**
 * @class Match
 */
export default class Match extends ApiModel {
    /**
     * A new match can be called by newing up with an ID or calling a static Match.get(id)
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

    get route() {
        return "matches";
    }

    get primaryKey() {
        return "id";
    }

    get type() {
        try {
            return this.data.attributes.gameMode;
        } catch(e) {
            return null;
        }
    }

    get map() {
        try {
            return this.data.attributes.mapname;
        } catch(e) {
            return null;
        }
    }

    /**
     * Fetch a match by id
     * @param {*} id 
     */
    static get(id) {
        return this.callAPI(`${this.route}/${id}/`);
    }

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
     * @param {string} name 
     */
    getPlayerByName(name) {
        if(this.isRecord === false) {
            return {};
        }

        return this.included.find(i => i.attributes.name === name);
    }
} 