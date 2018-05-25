import axios from 'axios';
import {List, Map} from 'immutable';
import { isNullOrUndefined } from 'util';
import Items from '../data/items';
import DamageCauserName from '../data/damageCauserName';

const typeMap = {
    LogPlayerCreate:     'parseLogin',
    LogPlayerAttack:     'parseAttack',
    LogPlayerKill:       'parseKill',
    LogPlayerTakeDamage: 'parseDamage'
}

/**
 * @class Telemetry
 */
export default class Telemetry {
    constructor({players, rosters}) {
        this.players = players;
        this.rosters = rosters;
    }

    getLeaderboard() {
        const keys = Object.keys(this.players);

        return keys
            .sort((a, b) => {
                const rosterA = this.rosters[this.players[a].teamId];
                const rosterB = this.rosters[this.players[b].teamId];

                return rosterA.ranking - rosterB.ranking;
            })
            .map(k => {
                const player = this.players[k];
                const roster = this.rosters[player.teamId];

                return {
                    ranking: roster.ranking,
                    kills: player.kills || 0,
                    data: player
                }
            });
    }

    getPlayer(name) {
        return Object.values(this.players).find(p => p.name === name);
    }
}