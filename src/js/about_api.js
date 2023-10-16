
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

const handleSubmit=(event) =>{
    event.preventDefault();

    let firstname=document.getElementById('firstName').value;
    // 加不加value得到的是什么，这个val封装的是什么内容
    let suburb=document.getElementById('suburb').value;
    let email=document.getElementById('email').value;

    let responseMessage=document.getElementById('responseMessage');

    responseMessage.textContent='Sending your requese... please wait';

    let payload={
        subscriber_name:firstname,
        subscriber_suburb: suburb,
        subsribe_email:email
    }

    const url='https://damp-castle-86239-1b70ee448fbd.herokuapp.com/decoapi/api/';
    const method='POST';
    const headers={
        'Content-Type': 'application/json',
    }

    fetch(url,{
        method:method,
        headers: headers,
        body: JSON.stringify(payload)
    })
    .then((response)=>response.text())
    .then((data)=>{
        if(data=='added'){
            responseMessage.textContent='Subscription successful. Thank you for subscribing!';
        }else if(data=='exists'){
            responseMessage.textContent='This email address has already been used to subscribe.';
        }else if(data=='error'){
            responseMessage.textContent='An error occurred with the API. Please try again later';
        }
    })
    .catch((error)=>{
        console.error('Error:', error);
        responseMessage.textContent='An unexpected error occurred. Please try again later'
    }

    )
}

subscribeForm.addEventListener('input', handlerInputchange);
subscribeForm.addEventListener('submit', handleSubmit)
