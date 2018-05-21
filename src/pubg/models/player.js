import ApiModel from '../apiModel';
import Match from './match';
import Api from '../../api/PubgApi';

export default class Player extends ApiModel{
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

    get matches() {
        return this.isRecord === true
            ? this.relationships.matches.data.map(match => new Match(match.id, false))
            : [];
    }
    
    async get(id) {
        let {data} = await this.api.get(`players/${id}/`);

        return this.wrapResponse(data);
    }

    async loadSeason(season) {
        if(!season) {
            const latestSeason = await this.api.get(`seasons`)
        }
    }

    async internalLoadSeason(season) {

    }
    static async findByName(name) {
        let route = `players?filter[playerName]=${name}`;
        let {data} = await Api.get(route);

        if(data) {
            return Object.assign(new Player(false, false), data[0], {isRecord: true});
        }

        throw new Error("No results found");
    }
}