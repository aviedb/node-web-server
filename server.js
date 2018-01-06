const express = require('express')
const hbs = require('hbs')
const fs = require('fs')

const port = process.env.PORT || 3000
var app = express()

hbs.registerPartials(`${__dirname}/views/partials`)
app.set('view engine', 'hbs')
app.use(express.static(`${__dirname}/public`))

app.use((req, res, next) => {
    var now = new Date().toString()
    fs.appendFile('server.log', `${now}\n`, (err) => {
        if(err){
            console.log('Unable to log to server.log')
        }
    })
    console.log(now)
    next()
})

// app.use((req, res, next) => {
//     res.render('maintenance.hbs')
// })

hbs.registerHelper('getYear', () => {
    return new Date().getFullYear()
})

hbs.registerHelper('screamIt', (txt) => {
    return txt.toUpperCase()
})

app.get('/', (req, res) => {
    //res.send('hello world!\ngo to /help.html')
    res.render('home.hbs', {
        welcome: 'Hello World!'
    })
})

app.get('/bad', (req, res) => {
    res.send('Unable to fulfill request')
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})