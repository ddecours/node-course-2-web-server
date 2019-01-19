const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials')

app.set('view engine', 'hbs');


app.use( (request, response, next) => {
    var now = new Date();
    var myDateString = now.getFullYear() + '-' + (now.getMonth()+1) + '-' + now.getDate();
    var logMessage = `${now.toString()}: ${request.method} ${request.url}` + '\n';
    var logFilename = 'server.log' + "_" + myDateString + '.log';

    console.log(logMessage);
    fs.appendFile(logFilename, logMessage, (err) => {
        if (err) {
            console.log(`Unable to append to log file: ${logFilename}`);
        };
    });
    next();
});
// ONLY NEEDED WHEN SITE UNDER MAINTENANCE
// app.use( (request, response, next) => {
//     response.render('maintenance.hbs', {
//         pageTitle: 'Maintenance Page',
//         maintenanceMessage: 'Site currently under maintenance - please check back later'
//     });
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (request, response) => {
    response.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to our web site '
    });
});

app.get('/about', (request, response) => {
    response.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

app.get('/projects', (request, response) => {
    response.render('projects.hbs', {
        pageTitle: 'Project Portolio page'
    });
});

app.get('/bad', (request, response) => {
    response.send({
        errorMessage: 'You stink!'
    });
});



app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});