
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
        const temperature_element=document.getElementById('current_temperature');
        const windspeed_element=document.getElementById('current_windspeed');
        temperature_element.innerText=weather.temperature+"C";
        windspeed_element.innerText=weather.windspeed+"kph";
    })
    .catch(error=>console.log('error',error));


const subscribeForm=document.getElementById('subscribe-form');

const handlerInputchange =() =>{
    let firstname = document.getElementById('firstName');
    let suburb = document.getElementById('suburb')
    let email = document.getElementById('email');
    let button=document.getElementById('subscribe-submit-button');

    if(firstname.value && suburb.value && email.value && email.validity.valid){
        button.classList.add('enabled');
        button.disabled=false;
    }else{
        button.classList.remove('enabled');
        button.disabled=true;
    }
}
subscribeForm.addEventListener('input', handlerInputchange);