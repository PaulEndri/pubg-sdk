import API from '../api/PubgApi';
import env from '../env/env';

export default class ApiModel{
    constructor(id, region, autoload = true) {
        this.api = API;
        this.isRecord = false;
        this.region = region || env.region;

        if(typeof this.get === 'function' && id && autoload) {
            return this.get(id, this.region);
        } else if (id) {
            this.id = id
        }
    }

    /**
     * Set the local primary key
     * @private
     *
     * @param {*} val
     */
    set id(val) {
        if(this.primaryKey == 'id') {
            return this._id = val;
        }
        return this[this.primaryKey] = val;
    }

    /**
     * @type {string}
     */
    get id() {
        if(this.primaryKey == 'id') {
            return this._id;
        }

        return this[this.primaryKey];
    }

    static callAPI(route, region) {
        return API.get(route, region);
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
            return this.get(this.id, this.region);
        }
    }

    wrapResponse(obj) {
        obj._metaData = Object.keys(obj);        
        obj.isRecord  = true;
        return Object.assign(Object.create(Object.getPrototypeOf(this)), this, obj);
    }
};