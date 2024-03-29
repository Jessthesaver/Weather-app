const path =require('path')
const express= require('express');
const hbs=require('hbs');
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

const app = express();
const port = process.env.PORT ||3000;

//Define paths for Express config
const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

//Setup Static directory to serve
app.use(express.static(publicDirectoryPath))

//Setup handlebars engine and views location
app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);

app.get('', (req,res) => {
    res.render('index',{
        title: 'Weather App',
        name: 'Jess Saver'
    })
})

app.get('/about', (req,res)=>{
    res.render('about',{
        title: 'About page',
        name: 'Jess Saver'
    })
})

app.get('/help', (req,res)=>{
    res.render('help',{
        title: 'Help page',
        name: 'Jess Saver',
        text:'Some useful text'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide an address to look up'
        })
    }
    
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            res.send({error})
        }else{
            forecast(latitude,longitude,(error, {temperature,feelslike,description,chanceOfRain,humidity}={}) => {
                if(error){
                    res.send({error})
                }else{
                    let locationmessage=`Location: ${latitude},${longitude}
City: ${location}.`
                    let forecastmessage=`The temperature is ${temperature} degrees and it feels like ${feelslike} degrees.
Outside is ${description} and there are ${chanceOfRain}% chances of rain and a humidity of ${humidity}%.`
                    let obj= {
                        location:location,
                        latlong:[latitude,longitude],
                        temperature,
                        feelslike,
                        description,
                        chanceOfRain,
                        locationmessage,
                        forecastmessage,
                        humidity
                    }
                    res.send(obj)
                }  
            })
        }
    })
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'Help article not found',
        name:'Jess saver',
        errorMessage:'404 error'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'Not found',
        name:'Jess saver',
        errorMessage:'404 error'
    })
})

app.listen(port,()=>{
    console.log('The server is up on port 3000')
})