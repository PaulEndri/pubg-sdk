import axios from 'axios';
import { isNullOrUndefined } from 'util';
import Items from '../data/items';
import DamageCauserName from '../data/damageCauserName';
import Telemetry from './telemetry';

const typeMap = {
    LogPlayerCreate:     'parseLogin',
    LogPlayerAttack:     'parseAttack',
    LogPlayerKill:       'parseKill',
    LogPlayerTakeDamage: 'parseDamage',
    LogPlayerPosition:   'parsePosition'
}

const CQC_RANGE    = 25;
const SHORT_RANGE  = 100;
const MEDIUM_RANGE = 300;
/**
 * @class TelemetryParser
 */
export default class TelemetryParser {
    constructor(data, options = {}) {
        this.players   = {};
        this.rosters   = {};
        this.attacks   = {};
        this.positions = {};

        if(options.positions === true) {
            this.parsePositions = true
            this.interval = options.interval || 3
        }

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
        const record = this.players[player].weapons[weapon];

        if(record !== undefined) {
            return record;
        }

        return this.createPlayerWeaponRecord(player, weapon)
    }

    createPlayerWeaponRecord(player, weapon) {
        if(!this.players[player].weapons) {
            this.players[player.weapons]
        }
        this.players[player].weapons[weapon] = {
            name:      weapon,
            usage:     0,
            kills:     0,
            damage:    0,
            hit:       0,
            distance:  0,
            locations: {
                ArmShot:    0,
                TorsoShot:  0,
                HeadShot:   0,
                PelvisShot: 0,
                LegShot:    0
            }
        };

        return this.players[player].weapons[weapon];
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

        this.players[character.accountId]         = character
        this.players[character.accountId].weapons = {}
        this.players[character.accountId].ranges  = {
            cqc:    0,
            short:  0,
            medium: 0,
            long:   0
        };
    }

    parseAttack({attacker, attackId, attackType, weapon, vehicle}) {
        if(attackType !== 'Weapon' || !attacker.accountId) {
            return;
        }
        
        const record = this.getPlayerWeaponRecord(attacker.accountId, Items[weapon.itemId]);

        record.usage = record.usage + 1;
        this.attacks[attackId] = {attacker, attackType, weapon, vehicle}
    }

    parseDamage({victim, attacker, attackId, damageReason, damageTypeCategory, damage, damageCauserName}) {
        if(attackId === -1 || !attacker.accountId || isNullOrUndefined(attacker)) {
            return;
        }

        let record    = this.getPlayerWeaponRecord(attacker.accountId, DamageCauserName[damageCauserName]);
        record.hit    = record.hit + 1;
        record.damage = record.damage += damage;

        if(!isNullOrUndefined(record.locations[damageReason])) {
            record.locations[damageReason] = record.locations[damageReason] + 1;
        }
    }

    parseKill({attackId, killer, victim, damageCauserName, damageTypeCategory, distance}) {
        if(victim.ranking !== 0) {
            this.rosters[victim.teamId].ranking = victim.ranking;
        }
 
        if(isNullOrUndefined(killer) || !killer.accountId) {
            this.players[victim.accountId].shamefurDispray = true;
            // wah wah
            return;
        }

        let weapon = DamageCauserName[damageCauserName];

        // If a player bled out, give kill credit
        // to the weapon that downed them originally
        if(damageTypeCategory === "Damage_Groggy") {
            const attack = this.attacks[attackId];
            weapon       = attack ? Items[attack.weapon.itemId] : weapon;
        }

        const record       = this.getPlayerWeaponRecord(killer.accountId, weapon);
        const attacker     = this.players[killer.accountId];
        const realDistance = distance/100;
        attacker.kills     = (attacker.kills || 0) + 1;
        record.kills       = record.kills + 1;

        record.distance = Math.max(realDistance, record.distance);
        
        if (realDistance <= CQC_RANGE) {
            attacker.ranges.cqc = attacker.ranges.cqc + 1;
        } else if(realDistance <= SHORT_RANGE) {
            attacker.ranges.short = attacker.ranges.short + 1;
        } else if(realDistance <= MEDIUM_RANGE) {
            attacker.ranges.medium = attacker.ranges.medium + 1;
        } else {
            attacker.ranges.long = attacker.ranges.long + 1;
        }        
    }

    parsePosition({character, elapsedTime}) {
        if(this.parsePositions !== true || elapsedTime < 1) {
            return;
        }
        
        const playerId = character.accountId;

        if(!this.positions[playerId]) {
            this.positions[playerId] = {
                lastSeen: elapsedTime,
                accountId: playerId,
                name:      character.name,
                positions: [character.location]
            };
        } else if(elapsedTime >= this.positions[playerId].lastSeen + this.interval) {
            this.positions[playerId].positions.push(character.location);
            this.positions[playerId].lastSeen = elapsedTime;
        }
    }

    async parse() {
        this.data.forEach(datum => {
            if(!isNullOrUndefined(typeMap[datum._T])) {
                this[typeMap[datum._T]](datum);
            }
        });

        return new Telemetry({
            players: this.players,
            rosters: this.rosters,
            attacks: this.attacks,
            positions: this.positions
        })
    }
}