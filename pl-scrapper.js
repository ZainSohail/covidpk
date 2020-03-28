const express = require("express");
const cron = require("node-cron");
const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const Client = require('ftp');
const url = 'http://www.covid.gov.pk';

app = express();

cron.schedule("* * * * *", function() {
    console.log("Starging Cron Job");
    console.log("---------------------");
    axios(url)
    .then(response => {
        const html = response.data;
        const $ = cheerio.load(html);
        const statsTable = $('#statistics');
        const totalCases = $(statsTable).find('.numbers-main').text();

        fs.readFile('data.json', (err, d) => {

            if (err) {
                var fileData = [];
                fileData.push({
                    total: totalCases,
                    date: new Date()
                });

                let data = JSON.stringify(fileData);
                fs.writeFileSync('data.json', data);
                return;
            } else {
                let  r = JSON.parse(d);
                r.push({
                    total: totalCases,
                    date: new Date()
                });
                fs.writeFileSync('data.json', JSON.stringify(r));
            }

        });

        var c = new Client();
        c.on('ready', function() {
        c.put('data.json', 'data.json', function(err) {
            if (err) throw err;
                c.end();
            });
        });

        // connect to localhost:21 as anonymous
        c.connect({
            host: '109.199.126.49',
            port: '21',
            user: 'covidpk@onx.digital',
            password: '4?&z#aw~VdSa'
        });
    })
    .catch(console.error);
    console.log("Ending Cron Job");
    console.log("---------------------");
});

app.listen("3128");


    
    