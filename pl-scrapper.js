const express = require("express");
const cron = require("node-cron");
const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const Client = require('ftp');
const url = 'http://www.covid.gov.pk';

app = express();

cron.schedule("0 * * * *", function() {

    console.log("---------------------");
    console.log("Running Cron Job");

    axios(url)
    .then(response => {
        const html = response.data;
        const $ = cheerio.load(html);
        const statsTable = $('#statistics');
        const stats = $(statsTable).find('.provinc-stat .col');
        const totalCases = $(statsTable).find('.numbers-main').text();
        const cases = $(statsTable).find('.numbers-child .col-md-4');

        caseStats = [];
        cases.each(function () {
            const n = $(this).find('h6').text();
            const s = $(this).find('h4').text();

            var v = {
                name: n,
                stat: s
            }

            caseStats.push(v);
        });

        provinceStat = [];
        stats.each(function () {
            const n = $(this).find('h6').text();
            const s = $(this).find('h4').text();

            var v = {
                name: n,
                stat: s
            }
            provinceStat.push(v);
        });

        fs.readFile('data.json', (err, d) => {

            if (err) {
                var fileData = [];
                fileData.push({
                    province: provinceStat,
                    total: totalCases,
                    cases: caseStats,
                    date: new Date()
                });

                let data = JSON.stringify(fileData);
                fs.writeFileSync('data.json', data);
                return;
            } else {
                let  r = JSON.parse(d);
                r.push({
                    province: provinceStat,
                    total: totalCases,
                    cases: caseStats,
                    date: new Date()
                });
                fs.writeFileSync('data.json', JSON.stringify(r));
            }

        });

        /*var c = new Client();
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
            user: 'corona@onx.digital',
            password: '*x;g?WqKX)Pf'
        });*/
    })
    .catch(console.error);
    console.log("Ending Cron Job");
    console.log("---------------------");
});

app.listen("3128");


    
    