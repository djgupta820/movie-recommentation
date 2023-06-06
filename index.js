const express = require('express')
const path = require('path')
const axios = require('axios')
const app = express()
const port = 3000

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded())
app.use(express.json())

app.get('/', (req, res) => res.render('index', {movies: []}))

app.post('/', async (req, res) => {
    const {q} = req.body
    let _movies = await axios.get(`https://api.tvmaze.com/search/shows?q=${q}`)    
    const movies = _movies.data
    // let movies = new Array()
    // i=0
    // for(let _movie of _movies){
    //     const movie = {
    //         name: _movie.show.name,
    //         runtime: _movie.show.runtime,
    //         premiered: _movie.show.premiered,
    //         image: _movie.show.image.medium
    //     }
    //     movies[i++] = movie
    // }
    console.log(movies)
    res.render('index', {movies})
})

app.listen(port, () => console.log(`Movie Recommendation app listening at http://localhost:3000`))