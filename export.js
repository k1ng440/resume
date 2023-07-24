import { promises as fs } from 'node:fs'
import htmlTheme from 'jsonresume-theme-macchiato'
// import pdfTheme from 'jsonresume-theme-dinesh' --  Not bad but need some work
// import pdfTheme from 'jsonresume-theme-apage' # --  Not bad but need some work
import pdfTheme from './onepage-simplified/index.js'
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

    fs.writeFile('test.html', html);
    await page.pdf({ path: 'resume.pdf', format: 'a4', printBackground: true })
    await browser.close()
}
