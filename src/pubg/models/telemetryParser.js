import axios from 'axios';
import { isNullOrUndefined } from 'util';
import Items from '../data/items';
import DamageCauserName from '../data/damageCauserName';
import Telemetry from './telemetry';

const typeMap = {
    LogPlayerCreate:     'parseLogin',
    LogPlayerAttack:     'parseAttack',
    LogPlayerKill:       'parseKill',
    LogPlayerTakeDamage: 'parseDamage'
}

/**
 * @class TelemetryParser
 */
export default class TelemetryParser {
    constructor(data) {
        this.players = {};
        this.rosters = {};

        if(typeof data === 'string') {
            axios
                .get(data)
                .then(({data}) => {
                    this.data = data;
                });
        } else {
            this.data = data;
        }

        this.parseDamage.bind(this);
        this.parseAttack.bind(this);
        this.parseLogin.bind(this);
        this.parseKill.bind(this);
        this.getPlayerWeaponRecord.bind(this);
        this.createPlayerWeaponRecord.bind(this);
    }

    getPlayerWeaponRecord(player, weapon) {
        const record = this.players[player][weapon];

        if(record !== undefined) {
            return record;
        }

        return this.createPlayerWeaponRecord(player, weapon)
    }

    createPlayerWeaponRecord(player, weapon) {
        this.players[player][weapon] = {
            usage: 0,
            kills: 0,
            damage: 0,
            hit: 0,
            distance: 0
        };

        return this.players[player][weapon];
    }

    parseLogin({character}) {
        if(!this.rosters[character.teamId]) {
            this.rosters[character.teamId] = {
                'roster': {
                    [character.accountId]: character
                }
            };
        } else {
            this.rosters[character.teamId].roster[character.accountId] = character;
        }

        this.players[character.accountId] = character;
    }

    parseAttack({attacker, attackId, attackType, weapon, vehicle}) {
        if(attackType !== 'Weapon' || !attacker.accountId) {
            return;
        }
        
        const record = this.getPlayerWeaponRecord(attacker.accountId, Items[weapon.itemId]);

        record.usage++;
    }

    parseDamage({victim, attacker, attackId, damageReason, damageTypeCategory, damage, damageCauserName}) {
        if(attackId === -1 || damageTypeCategory !== "Damage_Gun" || isNullOrUndefined(attacker)) {
            return;
        }

        let record = this.getPlayerWeaponRecord(attacker.accountId, DamageCauserName[damageCauserName]);

        record.hit = record.hit++;
        record.damage = record.damage+=damage;
    }

    parseKill({killer, victim, damageCauserName, distance}) {
        if(victim.ranking !== 0) {
            this.rosters[victim.teamId].ranking = victim.ranking;
        }
 
        if(isNullOrUndefined(killer) || !killer.accountId) {
            this.players[victim.accountId].shamefurDispray = true;
            // wah wah
            return;
        }

        let record = this.getPlayerWeaponRecord(killer.accountId, DamageCauserName[damageCauserName]);

        this.players[killer.accountId].kills = (this.players[killer.accountId].kills || 0) + 1;
        record.kills = record.kills++;
        record.distance = Math.max(distance, record.distance)
    }

    async parse() {
        this.data.forEach(datum => {
            if(!isNullOrUndefined(typeMap[datum._T])) {
                this[typeMap[datum._T]](datum);
            }
        });

        return new Telemetry({players: this.players, rosters: this.rosters})
    }
}