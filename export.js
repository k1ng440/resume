import { promises as fs } from 'node:fs'
import * as htmlTheme from 'jsonresume-theme-elegant'
import * as pdfTheme from 'jsonresume-theme-onepage'
import puppeteer from 'puppeteer'
import { render } from 'resumed'

const resume = JSON.parse(await fs.readFile('resume.json', 'utf-8'))
{
    const html = await render(resume, htmlTheme)
    fs.writeFile('index.html', html); // for github pages
}

{
    const html = await render(resume, pdfTheme)
    const browser = await puppeteer.launch({ headless: "new" })
    const page = await browser.newPage()
    await page.setContent(html, { waitUntil: 'networkidle0' })
    await page.pdf({ path: 'resume.pdf', format: 'a4', printBackground: true })
    await browser.close()
}
