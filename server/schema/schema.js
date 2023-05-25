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
  GraphQLObjectType,              "gameSeasonWeek": 4,
  "gameSeasonWeek": 4,

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
        const season = parent.gameSeason
        const slug = parent.gameTeamSlug
        return Season.findOne({slug, season})
      }
    },
    gameSeasonWeek: {type: GraphQLInt},
    gameDate: {type: GraphQLString},
    gameTeamName: {type: GraphQLString},
    gameTeamSlug: {type: GraphQLID},
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
        const slug = parent.slug
        return Season.find({slug})
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
        const slug = parent.slug
        return School.findOne({slug})
      }
    },
    games: {
      type: new GraphQLList(GameType),
      resolve(parent, args){
        const gameSeason = parent.season
        const gameTeamSlug = parent.slug
        return Game.find({gameSeason, gameTeamSlug})
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
    gamesBySchoolAndSeason:{
      type: new GraphQLList(GameType),
      args: {
        gameTeamSlug: { type: GraphQLID },
        gameSeason: {type: GraphQLInt},
      },
      resolve(parent, args){
        const gameSeason = args.gameSeason
        const gameTeamSlug = args.gameTeamSlug
        return Game.find({gameTeamSlug, gameSeason})
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