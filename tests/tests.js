const expect = require('chai').expect;
const SDK = require('../lib')
const telemetry = require('./telemetry.json')
const shroud = 'account.d50fdc18fcad49c691d38466bed6f8fd'
let matchId = ''
describe('Player', () => {
    it('Pull Shroud\'s profile via constructor', async () => {
        const Shroud = await new SDK.Player(shroud, 'pc-na')

        matchId = Shroud.matches[0].id

        expect(Shroud.isRecord).to.be.true

        it('Matches', async () => {
            const Match = await new SDK.Match(matchId, 'pc-na')
        
            expect(Match.isRecord).to.be.true
        })
    })

    it('Pull Shroud\'s profile via static get', async() => {
        const Shroud = await SDK.Player.get(shroud, 'pc-na')
    })
})



describe('Season', () => {
    it('Pull Seasons', async () => {
        const seasons = await SDK.Season.get()
        
        expect(seasons).to.be.an('Array')
    })

    it('Pull Current Season', async () => {
        const currentSeason = await SDK.Season.getCurrent()
    
        expect(currentSeason).to.not.be.null
    })
})


describe('Telemetry', () => {
    it('Parses', async () => {
        const parser = new SDK.TelemetryParser(telemetry)

        const data = await parser.parse()

        expect(data).to.not.be.null
    })
})