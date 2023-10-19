//const subscribeForm=document.getElementById('submit-form');

// const handlerInputChange=() => {
//     let name=document.getElementById('name');
//     let location=document.getElementById('location');
//     let organiser=document.getElementById('organiser');
//     let event_type=document.getElementById('event_type');
//     let description=document.getElementById('description');
//     let date_time=document.getElementById('date_time');
//     let photo=document.getElementById('photo');
//     let website_code=document.getElementById('website_code');
//     let button=document.getElementById('submit-button')

//     if (name.value && location.value && organiser.value && event_type.value &&
//         description.value && date_time.value && photo.value && website_code.value)
//     {
//         button.classList.add('enabled');
//         button.disabled=false;
//     }
//     else{
//         button.classList.remove('enabled');
//         button.disabled=true;
//     }
    
// }

// subscribeForm.addEventListener('input', handlerInputChange)

// global constant variables
const photoFileInputLabel=document.getElementById('photo-file-input-label')
const photoFileInput=document.getElementById('photo-file-input')
const eventsContainer=document.getElementById('events-container')
const my_website_code="sihan666";
const eventForm=document.getElementById("eventForm")
// const myInput=document.querySelector("#date_time");
// const fp=flatpickr(myInput,{
//     enableTime:true,
//     dateFormat:"Y-m-d H:i",
// })
const baseURLCommunityEvents="https://damp-castle-86239-1b70ee448fbd.herokuapp.com/decoapi/community_events";
const postCommunityEventMethod='POST';

// constant functions
const triggerFileInput=() =>{
    photoFileInput.click();
}
const handleFileChange=()=>{
    let fileName= photoFileInput.files[0].name;

    if(fileName.length>20){
        fileName=fileName.substring(0,17)+'...'
    }

    photoFileInputLabel.textContent=fileName;
}
const handleFormSubmit = event => {
    event.preventDefault();

    let formData = new FormData(event.target);
    formData.append("website_code", my_website_code);

    const requestOptions = {
        method: postCommunityEventMethod,
        body: formData,
        redirect: 'follow'
    }

    fetch(baseURLCommunityEvents, requestOptions)
    .then(response => response.json().then(data => {
        if (!response.ok) {
            console.log("Server response:", data);
            throw new Error("Network response was not ok");
        }
        return data;
    }))
    .then(data => {
        console.log(data.description);
        photoFileInputLabel.textContent = "Add a photo (Optional)";
        alert(`Your event "${data.description}" has been added to our website! Thanks!`);
        eventForm.reset();
        return data;
    })
    .then(data => {
        getCommunityEvents();
    })
    .catch(error => {
        console.error("There was a problem with the fetch operation:", error.message);
        alert("Error submitting event. Please try again.");
    });
};
// const handleFormSubmit=event=>{
//     event.preventDefault();

//     let formData = new FormData(event.target);
//     formData.append("website_code", "sihan666");

//     const requestOptions={
//         method: "POST",
//         body:formData,
//         redirect:'follow'
//     }

//     fetch(baseURLCommunityEvents, requestOptions)
//     .then(response=>response.json().then(data=>{
//         if(!response.ok){
//             console.log("Server response:", data);
//             throw new Error("Network response was not ok")
//         }
//         return data;
//     }))
//     .then(data=>{
//         console.log(data);
//         alert("Event submitted successfully!");
//         // getCommunityEvents();
//     })
//     .catch(error=>{
//         console.error("There was a problem with the fetch operation:", error.message);
//         alert("Error submitting event. Please try again");
//     });
// }
// fetching events from community Events API
const getCommunityEvents = () => {
    const queryParams = {
        website_code: "sihan666",
    }
    const queryString = new URLSearchParams(queryParams).toString();
    const urlWithParams = baseURLCommunityEvents + "?" + queryString;
    const requestOptions = {
        method: 'GET',
        redirect: 'follow'
    }
    fetch(urlWithParams, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(events => {
            console.log(events);
            while (eventsContainer.firstChild) {
                eventsContainer.removeChild(eventsContainer.firstChild);
            }
            events.forEach(event => {
                const eventTemplate = `
                <article class="col-12 col-md-12 col-1g-6">
                    <div class="card" role="group" aria-labelledby="cards${event.id}-title" aria-describedby="cards${event.id}-desc">
                        <h2 class="card-header p-2" id="cards${event.id}-title">${event.name}</h2>
                        <img class="card-banner-image" src="${event.photo}" alt="${event.name}">
                        <p class="card-body-text p-2">${event.description}</p>
                        <p class="card-body-text px-2"><strong>Location:</strong> ${event.location}</p>
                        <p class="card-body-text px-2"><strong>Organiser:</strong> ${event.organiser}</p>
                        <p class="card-body-text px-2"><strong>Event Type:</strong> ${event.event_type}</p>
                        <p class="card-body-text px-2"><strong>Date Time:</strong> ${new Date(event.date_time).toLocaleString()}</p>
                    </div>
                </article>`;
                eventsContainer.innerHTML+=eventTemplate;
                // 这里你可以使用 eventTemplate 插入到你的 DOM 中
            });
        })
        .catch(error => {
            console.error("error processing events:", error.message);
            alert("There was a problem loading events. Please refresh the page to try again");
        });
}

// event listeners
photoFileInputLabel.addEventListener('click', triggerFileInput);
photoFileInput.addEventListener('change', handleFileChange);
eventForm.addEventListener("submit", handleFormSubmit);

// page setup on first load
getCommunityEvents();