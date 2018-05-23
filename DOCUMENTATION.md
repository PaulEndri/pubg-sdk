## Classes

<dl>
<dt><a href="#PubgApi">PubgApi</a></dt>
<dd></dd>
<dt><a href="#Season">Season</a> ⇐ <code>ApiModel</code></dt>
<dd></dd>
<dt><a href="#Player">Player</a> ⇐ <code>ApiModel</code></dt>
<dd></dd>
<dt><a href="#Player">Player</a></dt>
<dd></dd>
<dt><a href="#Match">Match</a> ⇐ <code>ApiModel</code></dt>
<dd></dd>
<dt><a href="#Match">Match</a></dt>
<dd></dd>
</dl>

<a name="PubgApi"></a>

## PubgApi
**Kind**: global class  

* [PubgApi](#PubgApi)
    * [new PubgApi()](#new_PubgApi_new)
    * [.get(route)](#PubgApi.get) ⇒ <code>Promise</code>

<a name="new_PubgApi_new"></a>

### new PubgApi()
Simple api connector that wraps around the basic axios object

<a name="PubgApi.get"></a>

### PubgApi.get(route) ⇒ <code>Promise</code>
Makes a GET request to the requested route

**Kind**: static method of [<code>PubgApi</code>](#PubgApi)  
**Fulfil**: <code>object</code> PUBG Api Data  
**Error**: <code>object</code> Axios error object  

| Param | Type |
| --- | --- |
| route | <code>string</code> | 

<a name="Season"></a>

## Season ⇐ <code>ApiModel</code>
**Kind**: global class  
**Extends**: <code>ApiModel</code>  

* [Season](#Season) ⇐ <code>ApiModel</code>
    * [.get()](#Season.get) ⇒ <code>Promise</code>
    * [.getCurrent()](#Season.getCurrent) ⇒ <code>Promise</code>

<a name="Season.get"></a>

### Season.get() ⇒ <code>Promise</code>
Get all Seasons

**Kind**: static method of [<code>Season</code>](#Season)  
**Fulfil**: <code>Season[]</code>  
<a name="Season.getCurrent"></a>

### Season.getCurrent() ⇒ <code>Promise</code>
Get Current Season

**Kind**: static method of [<code>Season</code>](#Season)  
**Fulfill**: [<code>Season</code>](#Season)  
<a name="Player"></a>

## Player ⇐ <code>ApiModel</code>
**Kind**: global class  
**Extends**: <code>ApiModel</code>  

* [Player](#Player) ⇐ <code>ApiModel</code>
    * [new Player(id, autoload)](#new_Player_new)
    * _instance_
        * [.matches](#Player+matches) : [<code>Array.&lt;Match&gt;</code>](#Match)
        * [.get(id)](#Player+get) ⇒ <code>Promise</code>
        * [.loadSeason(season)](#Player+loadSeason) ⇒ <code>Promise</code>
    * _static_
        * [.get(id)](#Player.get) ⇒ <code>Promise</code>
        * [.findByName(name)](#Player.findByName) ⇒ <code>Promise</code>

<a name="new_Player_new"></a>

### new Player(id, autoload)
A new player can be called by newing up with an ID or calling a static Player.get(id)


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| id | <code>string</code> |  | id to search for |
| autoload | <code>bool</code> | <code>true</code> | if searching for an id, set this to false to not immediately make an api call to popualte the player data |

<a name="Player+matches"></a>

### player.matches : [<code>Array.&lt;Match&gt;</code>](#Match)
**Kind**: instance property of [<code>Player</code>](#Player)  
<a name="Player+get"></a>

### player.get(id) ⇒ <code>Promise</code>
Returns a fetched Player response

**Kind**: instance method of [<code>Player</code>](#Player)  
**Fulfill**: [<code>Player</code>](#Player)  

| Param | Type |
| --- | --- |
| id | <code>string</code> | 

<a name="Player+loadSeason"></a>

### player.loadSeason(season) ⇒ <code>Promise</code>
Load a player's seasonal stats

**Kind**: instance method of [<code>Player</code>](#Player)  
**Fulfil**: <code>object</code>  

| Param | Type | Description |
| --- | --- | --- |
| season | <code>string</code> | if left null, defaults to the current season |

<a name="Player.get"></a>

### Player.get(id) ⇒ <code>Promise</code>
Fetch a player by id

**Kind**: static method of [<code>Player</code>](#Player)  
**Fulfil**: [<code>Player</code>](#Player)  

| Param | Type |
| --- | --- |
| id | <code>string</code> | 

<a name="Player.findByName"></a>

### Player.findByName(name) ⇒ <code>Promise</code>
Search for a player by name

**Kind**: static method of [<code>Player</code>](#Player)  
**Fulfil**: [<code>Player</code>](#Player)  

| Param | Type |
| --- | --- |
| name | <code>string</code> | 

<a name="Player"></a>

## Player
**Kind**: global class  

* [Player](#Player)
    * [new Player(id, autoload)](#new_Player_new)
    * _instance_
        * [.matches](#Player+matches) : [<code>Array.&lt;Match&gt;</code>](#Match)
        * [.get(id)](#Player+get) ⇒ <code>Promise</code>
        * [.loadSeason(season)](#Player+loadSeason) ⇒ <code>Promise</code>
    * _static_
        * [.get(id)](#Player.get) ⇒ <code>Promise</code>
        * [.findByName(name)](#Player.findByName) ⇒ <code>Promise</code>

<a name="new_Player_new"></a>

### new Player(id, autoload)
A new player can be called by newing up with an ID or calling a static Player.get(id)


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| id | <code>string</code> |  | id to search for |
| autoload | <code>bool</code> | <code>true</code> | if searching for an id, set this to false to not immediately make an api call to popualte the player data |

<a name="Player+matches"></a>

### player.matches : [<code>Array.&lt;Match&gt;</code>](#Match)
**Kind**: instance property of [<code>Player</code>](#Player)  
<a name="Player+get"></a>

### player.get(id) ⇒ <code>Promise</code>
Returns a fetched Player response

**Kind**: instance method of [<code>Player</code>](#Player)  
**Fulfill**: [<code>Player</code>](#Player)  

| Param | Type |
| --- | --- |
| id | <code>string</code> | 

<a name="Player+loadSeason"></a>

### player.loadSeason(season) ⇒ <code>Promise</code>
Load a player's seasonal stats

**Kind**: instance method of [<code>Player</code>](#Player)  
**Fulfil**: <code>object</code>  

| Param | Type | Description |
| --- | --- | --- |
| season | <code>string</code> | if left null, defaults to the current season |

<a name="Player.get"></a>

### Player.get(id) ⇒ <code>Promise</code>
Fetch a player by id

**Kind**: static method of [<code>Player</code>](#Player)  
**Fulfil**: [<code>Player</code>](#Player)  

| Param | Type |
| --- | --- |
| id | <code>string</code> | 

<a name="Player.findByName"></a>

### Player.findByName(name) ⇒ <code>Promise</code>
Search for a player by name

**Kind**: static method of [<code>Player</code>](#Player)  
**Fulfil**: [<code>Player</code>](#Player)  

| Param | Type |
| --- | --- |
| name | <code>string</code> | 

<a name="Match"></a>

## Match ⇐ <code>ApiModel</code>
**Kind**: global class  
**Extends**: <code>ApiModel</code>  

* [Match](#Match) ⇐ <code>ApiModel</code>
    * [new Match(id, autoload)](#new_Match_new)
    * [.relationships](#Match+relationships) : <code>object</code>
    * [.type](#Match+type) : <code>string</code>
    * [.map](#Match+map) : <code>string</code>
    * [.get(id)](#Match+get) ⇒ [<code>Match</code>](#Match)
    * [.getPlayerByName(name)](#Match+getPlayerByName) ⇒ <code>object</code>
    * [.getTelemetry(full)](#Match+getTelemetry) ⇒

<a name="new_Match_new"></a>

### new Match(id, autoload)
A new match can be called by newing up with an ID or calling a static Match.get(id)


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| id | <code>string</code> |  | id to search for |
| autoload | <code>bool</code> | <code>true</code> | if searching for an id, set this to false to not immediately make an api call to popualte the match data |

<a name="Match+relationships"></a>

### match.relationships : <code>object</code>
**Kind**: instance property of [<code>Match</code>](#Match)  
<a name="Match+type"></a>

### match.type : <code>string</code>
**Kind**: instance property of [<code>Match</code>](#Match)  
<a name="Match+map"></a>

### match.map : <code>string</code>
**Kind**: instance property of [<code>Match</code>](#Match)  
<a name="Match+get"></a>

### match.get(id) ⇒ [<code>Match</code>](#Match)
Fetch for a specific match
WARNING: This will overwrite this object's internal data

**Kind**: instance method of [<code>Match</code>](#Match)  

| Param | Type |
| --- | --- |
| id | <code>string</code> | 

<a name="Match+getPlayerByName"></a>

### match.getPlayerByName(name) ⇒ <code>object</code>
Fetch for a specific player's data from within a match record

**Kind**: instance method of [<code>Match</code>](#Match)  

| Param | Type |
| --- | --- |
| name | <code>string</code> | 

<a name="Match+getTelemetry"></a>

### match.getTelemetry(full) ⇒
Return a match's telemetry data

**Kind**: instance method of [<code>Match</code>](#Match)  
**Returns**: promise  
**Fulfil**: <code>URL</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| full | <code>bool</code> | <code>false</code> | set to true to make the call, otherwise return the URL |

<a name="Match"></a>

## Match
**Kind**: global class  

* [Match](#Match)
    * [new Match(id, autoload)](#new_Match_new)
    * [.relationships](#Match+relationships) : <code>object</code>
    * [.type](#Match+type) : <code>string</code>
    * [.map](#Match+map) : <code>string</code>
    * [.get(id)](#Match+get) ⇒ [<code>Match</code>](#Match)
    * [.getPlayerByName(name)](#Match+getPlayerByName) ⇒ <code>object</code>
    * [.getTelemetry(full)](#Match+getTelemetry) ⇒

<a name="new_Match_new"></a>

### new Match(id, autoload)
A new match can be called by newing up with an ID or calling a static Match.get(id)


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| id | <code>string</code> |  | id to search for |
| autoload | <code>bool</code> | <code>true</code> | if searching for an id, set this to false to not immediately make an api call to popualte the match data |

<a name="Match+relationships"></a>

### match.relationships : <code>object</code>
**Kind**: instance property of [<code>Match</code>](#Match)  
<a name="Match+type"></a>

### match.type : <code>string</code>
**Kind**: instance property of [<code>Match</code>](#Match)  
<a name="Match+map"></a>

### match.map : <code>string</code>
**Kind**: instance property of [<code>Match</code>](#Match)  
<a name="Match+get"></a>

### match.get(id) ⇒ [<code>Match</code>](#Match)
Fetch for a specific match
WARNING: This will overwrite this object's internal data

**Kind**: instance method of [<code>Match</code>](#Match)  

| Param | Type |
| --- | --- |
| id | <code>string</code> | 

<a name="Match+getPlayerByName"></a>

### match.getPlayerByName(name) ⇒ <code>object</code>
Fetch for a specific player's data from within a match record

**Kind**: instance method of [<code>Match</code>](#Match)  

| Param | Type |
| --- | --- |
| name | <code>string</code> | 

<a name="Match+getTelemetry"></a>

### match.getTelemetry(full) ⇒
Return a match's telemetry data

**Kind**: instance method of [<code>Match</code>](#Match)  
**Returns**: promise  
**Fulfil**: <code>URL</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| full | <code>bool</code> | <code>false</code> | set to true to make the call, otherwise return the URL |

