import { promises as fs } from 'node:fs'
import htmlTheme from 'jsonresume-theme-macchiato'
// import pdfTheme from 'jsonresume-theme-dinesh' --  Not bad but need some work
// import pdfTheme from 'jsonresume-theme-apage' # --  Not bad but need some work
import pdfTheme from './onepage-simplified/index.js'
import puppeteer from 'puppeteer'
import { render } from 'resumed'
import yaml from 'yaml'

const resume = yaml.parse(await fs.readFile('resume.yaml', 'utf-8'))

fs.writeFile('index.html', await render(resume, htmlTheme)); // for github pages
fs.writeFile('resume.json', JSON.stringify(resume, null, 2)); // for jsonresume.org repository

{
    const html = await render(resume, pdfTheme)
    const browser = await puppeteer.launch({ headless: "new" })
    const page = await browser.newPage()
    await page.setContent(html, { waitUntil: 'networkidle0' })

    fs.writeFile('test.html', html);
    await page.pdf({ path: 'resume.pdf', format: 'a4', printBackground: true })
    await browser.close()
}
