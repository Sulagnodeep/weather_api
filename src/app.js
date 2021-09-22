const express = require('express')
const path = require('path')

const weather = require('./utils/apicall')

const app = express()

const staticDirPath = path.join(__dirname, '../public')
app.use(express.static(staticDirPath))
app.set('view engine', 'hbs')

app.get('', (req,res) => {
    res.render('index')
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide a location.'
        })
    }
    weather(req.query.address,(error, data) => {
        if(error){
            return res.send(error)
        }
        res.send(data)
    })
})

app.listen(3000, () => {})