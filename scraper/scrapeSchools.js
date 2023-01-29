// const axios = require('axios')
const cheerio = require('cheerio')
// const fs = require('fs')
// require('dotenv').config()

const {
  getAllData,
  dynamicSort,
  writeToJson
} = require('./functions')

const pages = [
  '/Teams/index.htm',
  '/Teams/Inactive.htm'
]
const schoolsData = []

getAllData(pages)
  .then(pagesData => {
    pagesData.map((pageData) => {
      const html = pageData.data
      const $ = cheerio.load(html)
      $('td[width=152]', html).each(function (i, element) {
        const name = $(element).text()
        if (name.length != 1) {
          const schoolData = {
            url: $(element).find('a').attr('href').split('.')[0],
            name,
            inState: true
          }
          console.log(`Writing ${schoolUrls[c]}`)
          schoolsData.push(schoolData)
        }
      })
    })
    schoolsData.sort(dynamicSort("url"))

    writeToJson(schoolsData, 'schools')
  })
  .catch(e => {
    console.log(e)
  })


/*

const schools = []

Promise.all(pages.map((page) => axios.get(`${BASE_URL}${page}`))).then(
  (pagesData) => {
    pagesData.map((pageData) => {
      const html = pageData.data
      const $ = cheerio.load(html)
      $('td[width=152]', html).each(function () {
        const name = $(this).text().trim()
        const schoolUrl = $(this).find('a').attr('href')
        if (name != "") {
          schools.push({
            url: schoolUrl.split('.')[0],
            name,
            inState: true,
          })
        }
      })
    })
    console.log(schools)
    const data = JSON.stringify(schools)
    fs.writeFileSync('data/schools.json', data)
    return schools
  }
)
*/

// scrapeSchools()
