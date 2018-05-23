Advanced PUBG SDK
======
Robust wrapper for the official PUBG Developer API using

# Key Features
..* Can be called via constructors or statically
..* Supports async/await
..* All calls return promise
..* Easy set up/usage 

## Installing
`npm i --s apubg-sdk

## Usage
### ApiKey/Region Environment Variables
Currently the api key and active region are fetched from environment variables, these are as follows:

..* apiKey - PUBG Developer Key
..* region - Region

These can be provided either directly to the environment, or via a .env file

### Static calls
The sdk can be used via static calls to the imported classes, like so:

```javascript
import {Player} from 'apubg-sdk'

// async/await
const shroud = await Player.get('account.d50fdc18fcad49c691d38466bed6f8fd')

//promise
Player.get('account.d50fdc18fcad49c691d38466bed6f8fd')
    .then(shroud => {
        // successful
    })
    .catch(exception => {
        // failed, failure response here
    })
```

### Constructor calls
Or you can just new it up like so

```javascript
const shroud = await new Player('account.d50fdc18fcad49c691d38466bed6f8fd')

Player.get('account.d50fdc18fcad49c691d38466bed6f8fd')
    .then(shroud => {
        // successful
    })
    .catch(exception => {
        // failed, failure response here
    })
```

### [AdditionalDocs]('/DOCUMENTATION.md')