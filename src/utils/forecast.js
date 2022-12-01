const request=require('request')
function forecast(latitude,longitude,callback){
    const url= 'http://api.weatherstack.com/current?access_key=d60ddeb1b9677b5c90a76366b9b98457&query='+latitude+','+longitude;
    request({url, json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect to location services', undefined);          
        }else if(body.error){
            callback(body.error.info,undefined)
        }else{
            const{temperature,feelslike,weather_descriptions:description,precip:chanceOfRain}=body.current;
            callback(undefined, {
                temperature,
                feelslike,
                description,
                chanceOfRain
            })
        }
    })
}

module.exports=forecast;