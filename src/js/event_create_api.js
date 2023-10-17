// const subscribeForm=document.getElementById('submit-form');

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

// event listeners
photoFileInputLabel.addEventListener('click', triggerFileInput);
photoFileInput.addEventListener('change', handleFileChange);
// page setup on first load