
const baseUrl= 'https://api.open-meteo.com/v1/forecast';

const queryParams={
    latitude: -27.4942,
    longitude:153.0054,
    current_weather: true,
}

const queryString =new URLSearchParams(queryParams).toString();

const urlWithParams =baseUrl+"?"+queryString;
const requestoptions={
    method: 'GET',
    redirect: 'follow'
}

fetch(urlWithParams, requestoptions)
    .then(Response =>Response.json())
    .then(data=>{
        const weather=data.current_weather;
        console.log("Current temperature:" + weather.temperature + "C");
    })
    .catch(error=>console.log('error',error));