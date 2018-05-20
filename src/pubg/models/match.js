import ApiModel from '../apiModel';

export default class Match extends ApiModel {
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
        
                return this.wrapResponse(group);
            });
    }

    getPlayerByName(name) {
        if(this.isRecord === false) {
            return {};
        }

        return this.included.find(i => i.attributes.name === name);
    }
} 