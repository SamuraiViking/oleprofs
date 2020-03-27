import axios from 'axios';
import cheerio = require('cheerio');
import { writeFile } from 'fs';


async function scrapeNumOfProfs() {
    const response = await axios.get(`https://www.ratemyprofessors.com/search.jsp?query=St.+Olaf&queryoption=HEADER&stateselect=&country=&dept=&queryBy=teacherName&facetSearch=true&schoolName=&offset=0&max=20`);
    const $ = await cheerio.load(response.data);
    const resultsText = $('.toppager-left > .result-count').text()
    const numOfProfs = +resultsText.split(" ")[3]
    return numOfProfs
}

async function scrapeProfsLinksOnPage(page) {
    const response = await axios.get(`https://www.ratemyprofessors.com/search.jsp?query=St.+Olaf&queryoption=HEADER&stateselect=&country=&dept=&queryBy=teacherName&facetSearch=true&schoolName=&offset=${page * 20}&max=20`)
    const $ = cheerio.load(response.data)
    const profLinkElems = $('.PROFESSOR > a')
    const numOfProfLinks = profLinkElems.length
    let profLinks = []
    for (let i = 0; i < numOfProfLinks; i++) {
        const profLink = profLinkElems[i].attribs.href
        profLinks.push(profLink)
    }
    return profLinks
}

async function scrapeProfLinks(numOfPages) {
    let profLinks = [];
    for (var i = 0; i < numOfPages; i++) {
        const profLinksOnPage = await scrapeProfsLinksOnPage(i);
        profLinks.push(profLinksOnPage)
    }

    profLinks = [].concat.apply([], profLinks)

    return profLinks
}

function getDifficulty(feedback) {
    let difficulty = feedback
    if (feedback.includes('%')) {
        difficulty = feedback.split('%')[1]
    }
    return difficulty
}

function getWouldTakeAgain(feedback) {
    let wouldTakeAgain = '---'
    if (feedback.includes('%')) {
        wouldTakeAgain = feedback.split('%')[0]
    }
    return wouldTakeAgain
}


async function scrapeProf(profLink) {
    const response = await axios.get(`https://www.ratemyprofessors.com/${profLink}`)
    const $ = cheerio.load(response.data)
    const name = $('.NameTitle__Name-dowf0z-0').text()
    const rating = $('.RatingValue__Numerator-qw8sqy-2').text()
    const feedback = $('.FeedbackItem__FeedbackNumber-uof32n-1').text()
    const reviews = +$('.hDaWgM > a').text().slice(0, 2);
    const difficulty = getDifficulty(feedback);
    const wouldTakeAgain = getWouldTakeAgain(feedback);
    // ShowRatings.jsp?tid=69265 -> [ShowRatings.jsp?tid, 69265] -> 69265
    const id = profLink.split('=')[1]
    const prof = { id, name, rating, reviews, difficulty, wouldTakeAgain }
    console.log(prof)
    return prof
}

function writeProfs(file, profs) {
    writeFile(file, profs, function (err) {
        if (err) {
            return console.error(err);
        }
        console.log("File created!");
    });
}

async function getProfs(profLinks: string[]) {
    let profs = {}
    for (let i = 0; i < profLinks.length; i++) {
        const profLink = profLinks[i]
        const prof = await scrapeProf(profLink)
        profs[prof.name] = prof
        delete profs[prof.name].name
    }
    return profs
}

async function scrapeProfs() {
    const numOfProfs: number = await scrapeNumOfProfs()
    const numOfPages: number = Math.ceil(numOfProfs / 20)
    const profLinks: string[] = await scrapeProfLinks(numOfPages)
    const profs: Object = await getProfs(profLinks);
    const profsToWrite: string = 'export default ' + JSON.stringify(profs);
    writeProfs('profsData.ts', profsToWrite)
}

scrapeProfs()

