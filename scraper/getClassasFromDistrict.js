const seasonsList = require( './rawData/seasons.json' )

function parseDistricts ( ele ) {
  const seasonClassDistrict = dstrictBySeasonArray[ 0 ].split( '|' )

  const season = seasonClassDistrict[ 0 ]
  const district = seasonClassDistrict[ 1 ]
  const cls = seasonClassDistrict[ 1 ].split( /-(.*)/s )[ 1 ]

  return [ season, district, cls ]
}

const districtssBySeasonSet = new Set()

seasonsList.forEach( distBySeas => {
  districtssBySeasonSet.add( `${ distBySeas.season }|${ distBySeas.district }` )
} )

let dstrictBySeasonArray = [ ...districtssBySeasonSet ].sort()
const seasonClassDistrict = dstrictBySeasonArray[ 0 ].split( '|' )

const season = seasonClassDistrict[ 0 ]
const district = seasonClassDistrict[ 1 ]
const cls = seasonClassDistrict[ 1 ].split( /-(.*)/s )[ 1 ]

console.log( [ season, district, cls ] )
console.log( parseDistricts( dstrictBySeasonArray[ 0 ] ) )