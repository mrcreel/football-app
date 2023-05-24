const {
  schoolsData,
  seasonsData,
  gamesData
} = require( '../../scraper/rawData/exports')

const School = require('../models/School')
const Season = require('../models/Season')
const Game = require('../models/Game')

const {
  GraphQLBoolean,
  GraphQLID,
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
} = require( 'graphql' )

// Game Type
const GameType = new GraphQLObjectType({
  name: 'Game',
  fields: () => ({
    gameSeason: {
      type: SeasonType,
      resolve(parent, args){
        return seasonsData.find(season => season.slug === parent.gameTeamSlug && season.season === parent.gameSeason)
      }
    },
    gameSeasonWeek: {type: GraphQLInt},
    gameDate: {type: GraphQLString},
    gameTeamName: {type: GraphQLString},
    gameTeamSlug: {type: GraphQLString},
    gameTeamMascot: {type: GraphQLString},
    gameLocation: {
      type: GraphQLString,
      enum: ['H', 'A', 'N']
    },
    gameOpponentName: {type: GraphQLString},
    gameisDistrictGame: {type: GraphQLBoolean},
    gameResult: {
      type: GraphQLString,
      enum: ['W', 'L', 'T']
    },
    gamePointsFor: {type: GraphQLInt},
    gamePointsAgainst: {type: GraphQLInt}
   })
})

// School Type
const SchoolType = new GraphQLObjectType( {
  name: 'School',
  fields: () => ( {
    slug: { type: GraphQLID },
    name: { type: GraphQLString },
    inState: { type: GraphQLBoolean },
    seasons: {
      type: new GraphQLList(SeasonType),
      resolve(parent, args){
        return seasonsData.filter(season => season.slug === parent.slug)
      }
    }
  } )
} )

// Season Type
const SeasonType = new GraphQLObjectType( {
  name: 'Season',
  fields: () => ( {
    season: { type: GraphQLInt },
    slug: {
      type: SchoolType,
      resolve(parent, args){
        return schoolsData.find(school => school.slug === parent.slug)
      }
    },
    district: {type: GraphQLString},
    divisionWins: {type: GraphQLInt},
    divisionLosses: {type: GraphQLInt},
    divisionTies: {type: GraphQLInt},
    overallWins: {type: GraphQLInt},
    overallLosses: {type: GraphQLInt},
    overallTies: {type: GraphQLInt},
    playoffWins: {type: GraphQLInt},
    playoffLosses: {type: GraphQLInt},
    teamPointsFor: {type: GraphQLInt},
    teamPointsAgainst: {type: GraphQLInt},
    teamPointsPerGameFor: {type: GraphQLFloat},
    teamPointsPerGameAgainst: {type: GraphQLFloat},
  } )
} )

const RootQuery = new GraphQLObjectType( {
  name: 'RootQueryType',
  fields: {
    games: {
      type: new GraphQLList( GameType ),
      resolve ( parent, args ) {
        return Game.find()
      }
    },
    schools: {
      type: new GraphQLList( SchoolType ),
      resolve ( parent, args ) {
        return School.find()
      }
    },
    school: {
      type: SchoolType,
      args: { slug: { type: GraphQLID } },
      resolve ( parent, args ) {
        const slug = args.slug
        return School.findOne( {slug} )
      }
    },
    seasons: {
      type: new GraphQLList( SeasonType ),
      resolve ( parent, args ) {
        return Season.find()
      }
    },
    seasonsBySchool: {
      type: new GraphQLList( SeasonType ),
      args: { slug: { type: GraphQLID } },
      resolve ( parent, args ) {
        const slug = args.slug
        return Season.find({slug})
      }
    },
    seasonsBySeason: {
      type: new GraphQLList( SeasonType ),
      args: { season: { type: GraphQLInt } },
      resolve ( parent, args ) {
        const season = args.season
        return Season.find({season})
      }
    },
  }
} )

module.exports = new GraphQLSchema( {
  query: RootQuery
} )