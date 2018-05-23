const expect = require('chai').expect;
const SDK = require('../lib')
const shroud = 'account.d50fdc18fcad49c691d38466bed6f8fd'

describe('Player', () => {
    it('Pull Shroud\'s profile via constructor', async () => {
        const Shroud = await new SDK.Player(shroud)

        expect(Shroud.isRecord).to.be.true
    })

    it('Pull Shroud\'s profile via static get', async() => {
        const Shroud = await SDK.Player.get(shroud)

        expect(Shroud.isRecord).to.be.true
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