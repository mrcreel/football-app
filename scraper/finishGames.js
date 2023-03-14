const schoolsList = require( './rawData/schools.json' )
const seasonsList = require( './rawData/seasons.json' )
const gamesList = require( './rawData/games.json' )

/* Get 25 random games for testing */

const numGames = gamesList.length
const gamesArray = []

for ( let i = 0; i < 25; i++ ) {
  gamesArray.push( gamesList[ Math.floor( Math.random() * numGames ) ] )
}

console.log( '****************' )
gamesArray.forEach( game => {
  if ( game.gameOpponentName !== 'open' ) {
    const opp = game.gameOpponentName.trim()
    console.log( opp === "Hamilton" )
  }
} )
console.log( '****************' )
console.log( schoolsList[ 0 ].name === 'Aberdeen' )
