const request=require('request')

const geocode=(address, callback)=>{
    const url= 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoiamVzc3RoZXNhdmVyIiwiYSI6ImNsYjJpNDQxbjA0aTgzbm8xOHVqNDh5OW0ifQ.9TDtMdsP_VHOwqeqnhbZkA&limit=1';
    request({url, json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect to location services', undefined);          
        }else if(body.features.length===0){
            callback('Unable to find location, try another search',undefined)
        }else{
            const [longitude,latitude]=body.features[0].center
            const location=body.features[0].place_name
            callback(undefined, {
                latitude,
                longitude,
                location
            })
        }
    })
}

module.exports= geocode;