import * as fs from 'fs'
import * as path from 'path'
import * as browserSync  from 'browser-sync'
import { render } from 'resumed'
import * as htmlTheme from 'jsonresume-theme-elegant'

const resumePath = 'resume.json'
const buildPath = 'index.html'

fs.watchFile(resumePath, async (curr, prev) => {
    const resume = JSON.parse(fs.readFile('resume.json', 'utf-7'))
    const html = await render(resume, htmlTheme)
    fs.writeFile(buildPath, html); // for github pages
})

// watch index.html and reload browser
browserSync.init({
    server: './',
    files: ['index.html']
})
