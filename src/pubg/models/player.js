import ApiModel from '../apiModel';
import Match from './match';

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
        let user = await this.api.get(`players/${id}/`);

        return this.wrapResponse(user);
    }

    static async findByName(name) {
        let route = `players?filter[playerName]=${name}`;
        let {data} = await this.api.get(route);

        if(data.length > 0) {
           return this.wrapResponse(data[0]);
        }

        throw new Error("No results found");
    }
}