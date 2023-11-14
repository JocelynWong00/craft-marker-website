
const eventsContainer=document.getElementById('events-container')
const my_website_code="sihan666"

const baseURLCommunityEvents="https://damp-castle-86239-1b70ee228fbd.herokuapp.com/decoapi/community_events/";

const filterDropdown=document.getElementById("sport-type") 
let events_list = []

const renderEvents=(eventsToRender)=>{
    while (eventsContainer.firstChild) {
        eventsContainer.removeChild(eventsContainer.firstChild);
    }
    eventsToRender.forEach(event => {
        const eventTemplate = `
        <article class="col-12 col-md-12 col-1g-6">
            <div class="events" aria-labelledby="cards${event.id}-title" aria-describedby="cards${event.id}-desc">
                <div>
                <img src="${event.photo}" alt="${event.name}">
                </div>

                <div>
                <h2>${event.name}</h2>
                <p >${event.description}</p>
                <p><strong>Location:</strong> ${event.location}</p>
                <p><strong>Organiser:</strong> ${event.organiser}</p>
                <p><strong>Event Type:</strong> ${event.event_type}</p>
                <p><strong>Date Time:</strong> ${new Date(event.date_time).toLocaleString()}</p>

                </div>
            </div>
        </article>`;
        eventsContainer.innerHTML+=eventTemplate;
    });
}

// fetching events from community Events API
const getCommunityEvents = () => {
    const queryParams = {
        website_code: my_website_code,
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
            events_list=events; 
            renderEvents(events_list);
        })
        .catch(error => {
            console.error("error processing events:", error.message);
            alert("There was a problem loading events. Please refresh the page to try again");
        });
}
// filtering functionally
const filterEventsByTerm=(term)=>{

    //if no term selected, show all events
    if(!term){
        renderEvents(events_list);
        return;
    }

    // filter events by the term and then render them
    const filteredEvents=events_list.filter(event=>event.name.includes(term));
    renderEvents(filteredEvents);

}

filterDropdown.addEventListener('change',(e)=>{
    const selectedTerm=e.target.value;
    filterEventsByTerm(selectedTerm);
})

// page setup on first load
getCommunityEvents();