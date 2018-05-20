import API from '../api/PubgApi';

export default class ApiModel{
    constructor(id, autoload = true) {
        this.api = API;
        this.isRecord = false;

        if(typeof this.get === 'function' && !isNaN(id) && autoload) {
            return this.get(id);
        } 
    }

    set id(val) {
        if(this.primaryKey == 'id') {
            return this._id = val;
        }
        return this[this.primaryKey] = val;
    }

    get id() {
        if(this.primaryKey == 'id') {
            return this._id;
        }

        return this[this.primaryKey];
    }

    static callAPI(route) {
        return API.get(route);
    }

    clean() {
        if(this.isRecord === false) {
            return false;
        }

        let cleanObject = {};

        for(var key of this._metaData) {
            cleanObject[key] = this[key];
        }

        return cleanObject;
    }

    load() {
        if(this.isRecord === false) {
            return this.get(this.id);
        }
    }

    processId(id) {
        if(!id && this.isRecord === true && this.primaryKey !== false) {
            return this.id;
        } else if(this.primaryKey === false && !id && this.record === true) {
            throw Error("Please specify a primary key on a custom api model if it is to act as a proxy.");
        }

        return id;
    }

    recordCall(route, key, id, sub = false) {
        let callId  = this.processId(id);
        
        return this.api
            .get(route.replace("{id}", callId))
            .then(results => {
                if(this.isRecord === true) {
                    if(sub !== false) {
                        results = results[sub];
                    }
        
                    this[key] = results;
                
                    return this;
                }
        
                return results;
            });
    }

    wrapResponse(obj) {
        obj._metaData = Object.keys(obj);        
        obj.isRecord  = true;
        return Object.assign(Object.create(Object.getPrototypeOf(this)), this, obj);
    }
};