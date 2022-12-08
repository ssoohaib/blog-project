const puppeteer = require('puppeteer');
require('dotenv').config()
const sendMailPdf=require('../api/nodemailerpdf')



module.exports=async (req,res) => {

  // Create a browser instance
  const browser = await puppeteer.launch();

  try{
        // Create a new page
        const page = await browser.newPage();

        // Website URL to export as pdf
        const website_url = process.env.INIT_URI+req.body.pdfurl; 

        // Open URL in current page
        await page.goto(website_url, { waitUntil: 'networkidle0' }); 

        //To reflect CSS used for screens instead of print
        await page.emulateMediaType('screen');

        // Downlaod the PDF
        const pdf = await page.pdf({
        path: './api/result.pdf',
        // margin: { top: '100px', right: '50px', bottom: '100px', left: '50px' },
        printBackground: true,
        format: 'A4',
        });
  }catch(e){

  }finally{
      await browser.close();
  }
  sendMailPdf(req.session.email,0,'pdf','PDF')

  // Close the browser instance
};