const cheerio = require('cheerio')
const {
  cleanText,
  extractValue,
  getAllData,
  writeToJson
} = require('./functions')

const schoolsData = require('../rawData/schools.json')
const schoolUrls = extractValue(schoolsData, 'url')
const pages = schoolUrls.map(url => `/Teams/${url}_Scores.htm`)

const gamesData = []

let c = 0
getAllData(pages)
  .then(pagesData => {
    pagesData.map((pageData) => {
      const html = pageData.data
      const $ = cheerio.load(html)

      let gamesRawData = []
      $('tr[height=18]', html).each(function (i, e) {
        if (i % 17 != 0) {
          $(this).find('td[width=57]').each((idx, element) => {
            //
            const siblings = $(element).nextAll()

            gamesRawData.push({
              gameDate: $(element).text().trim(),
              gameLocation: $(siblings[0]).text().trim(),
              gameOpponent: cleanText($(siblings[1])),
              gameisDistrictGame: $(siblings[2]).text().trim() == '*',
              gameResult: $(siblings[3]).text().trim(),
              gamePointsFor: parseInt($(siblings[4]).text().trim()),
              gamePointsAgainst: parseInt($(siblings[5]).text().trim()),
            })
          })
        }
      })

      const seasonsTeamNames = []
      $('tr[height=21]', html).each(function (i, e) {
        $(this).find('td[colspan=17]').each((idx, element) => {
          seasonsTeamNames.push(cleanText($(element)))
        })
      })

      const seasonYearAndTeamMascot = []
      $('tr[height=22]', html).each(function (i, e) {
        if (i != 0) {
          $(this).find('td[colspan=17]').each((idx, element) => {
            seasonYearAndTeamMascot.push(cleanText($(element)))
          })
        }
      })

      const numSeasons = seasonsTeamNames.length

      const seasonsYears = []
      for (let j = 0; j < numSeasons; j += 4) {
        for (let k = 0; k < 4; k++)
          seasonsYears.push(seasonYearAndTeamMascot[j * 2 + k])
      }

      const seasonsTeamMascots = []
      for (let j = 4; j < seasonYearAndTeamMascot.length; j += 8) {
        for (let k = 0; k < 4; k++) {
          seasonsTeamMascots.push(seasonYearAndTeamMascot[j + k])
        }
      }

      for (let row = 0; row < gamesRawData.length / 64; row++) {
        for (let col = 0; col < 4; col++) {
          for (let gm = 0; gm < 16; gm++) {
            if (gamesRawData[(row * 64) + (gm * 4) + col].gameOpponent != '' && gamesRawData[(row * 64) + (gm * 4) + col][2] != 'open') {

              if (gamesRawData[(row * 64) + (gm * 4) + col].gameDate == "Invalid DateTime") {
                gamesRawData[(row * 64) + (gm * 4) + col].gameDate = ''
              }
              gamesData.push({
                season: parseInt(seasonsYears[row * 4 + col]),
                wWeek: gm + 1,
                date: gamesRawData[(row * 64) + (gm * 4) + col].gameDate,
                name: seasonsTeamNames[row * 4 + col],
                slug: schoolUrls[c],
                mascot: seasonsTeamMascots[row * 4 + col],
                location: gamesRawData[(row * 64) + (gm * 4) + col].gameLocation,
                opponent: gamesRawData[(row * 64) + (gm * 4) + col].gameOpponent,
                isDistrict: gamesRawData[(row * 64) + (gm * 4) + col].gameisDistrictGame,
                result: gamesRawData[(row * 64) + (gm * 4) + col].gameResult,
                pointsFor: gamesRawData[(row * 64) + (gm * 4) + col].gamePointsFor,
                pointsAgainst: gamesRawData[(row * 64) + (gm * 4) + col].gamePointsAgainst,
              })
            }
          }
        }
      }
      console.log('Writing:',gamesData[0].name)
      c++
    })
    writeToJson(gamesData, 'games')
  })