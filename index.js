const express = require('express')
const path = require('path')
const axios = require('axios')
const mongoose = require('mongoose')
const Movie = require('./models/Movie')
const app = express()
const port = 3000

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded())
app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/movieList').then((msg)=>{
    console.log('connected to db movies...')
}).catch((err)=>{
    console.log('error connection to db movies...', err)
})

app.get('/', (req, res) => res.render('index', {movies: []}))

app.post('/', async (req, res) => {
    const {q} = req.body
    let _movies = await axios.get(`https://api.tvmaze.com/search/shows?q=${q}`)    
    const movies = _movies.data
    
    await Movie.deleteMany({})

    let moviesArray = []
    let i=0
    for(let movie of movies){
        if(movie.show.name && movie.show.runtime && movie.show.premiered && movie.show.image.medium){
            const mv = {
                name: movie.show.name,
                runtime: movie.show.runtime,
                premiered: movie.show.premiered,
                image: movie.show.image.medium
            }
            moviesArray[i++] = mv
        }
    }
    await Movie.insertMany(moviesArray).then((msg)=>{
        console.log('moviesArray inserted')
    }).catch((err)=>{
        console.log(err)
    })

    Movie.find({}).then((msg)=>{
        res.render('index', {movies: msg})
    }).catch((err)=>{
        console.log(err)
    })
})

app.listen(port, () => console.log(`Movie Recommendation app listening at http://localhost:3000`))