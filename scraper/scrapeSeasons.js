const cheerio = require('cheerio')
const {
  cleanText,
  extractValue,
  getAllData,
  writeToJson
} = require('./functions')

const schoolsData = require('./rawData/schools.json')
const schoolUrls = extractValue(schoolsData, 'url')
const pages = schoolUrls.map(url => `/Teams/${url}_Standings.htm`)

const seasonsData = []

let c = 0
getAllData(pages)
  .then(pagesData => {
    pagesData.map((pageData) => {
      const html = pageData.data
      const $ = cheerio.load(html)

      $('td[width=76]', html).each(function (i, element) {
        const season = parseInt($(element).text())
        if (Number.isInteger(season)) {
          const siblings = $(element).nextAll()
          const seasonData = {
            season: parseInt($(element).text()),
            url: schoolUrls[c],
            district: cleanText($(siblings[0])),
            divisionWins: parseInt($(siblings[1]).text()),
            divisionLosses: parseInt($(siblings[2]).text()),
            divisionTies: parseInt($(siblings[3]).text()),
            overallWins: parseInt($(siblings[4]).text()),
            overallLosses: parseInt($(siblings[5]).text()),
            overallTies: parseInt($(siblings[6]).text()),
            playoffWins: parseInt($(siblings[7]).text()),
            playoffLosses: parseInt($(siblings[8]).text()),
            teamPointsFor: parseInt($(siblings[9]).text()),
            teamPointsAgainst: parseInt($(siblings[10]).text()),
            teamPointsPerGameFor: parseFloat($(siblings[11]).text()),
            teamPointsPerGameAgainst: parseFloat($(siblings[12]).text()),
          }
          console.log(`Writing ${schoolUrls[c]}`)
          seasonsData.push(seasonData)
        }
      })
      c++
    })
    writeToJson(seasonsData, 'seasons')
  })


