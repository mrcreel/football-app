const axios = require('axios')
const fs = require('fs')
require('dotenv').config()

const { BASE_URL } = process.env


const writeToJson = (array, file) => {
  const data = JSON.stringify(array)
  fs.writeFileSync(`../rawData/${file}.json`, data)
}

const dynamicSort = (property) => {
  var sortOrder = 1;
  if (property[0] === "-") {
    sortOrder = -1;
    property = property.substr(1);
  }
  return function (a, b) {
    /* next line works with strings and numbers,
     * and you may want to customize it to your needs
     */
    var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
    return result * sortOrder;
  }
}

const getAllData = (pages) => {
  return Promise.all(pages.map(fetchData));
}

const fetchData = (page) => {
  return axios
    .get(`${BASE_URL}${page}`)
    .then(function (response) {
      return {
        page,
        data: response.data
      }
    })
    .catch(function (error) {
      return { success: false };
    })
}

const extractValue = (arr, prop) => {
  // extract value from property
  let extractedValue = arr.map(item => item[prop])
  return extractedValue
}

const cleanText = (string) => {
  return string.text().replace(/(\r\n |\n |\r)/gm, "").trim()
}

module.exports = {
  cleanText,
  dynamicSort,
  extractValue,
  getAllData,
  writeToJson,
}