const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2')



weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()

    const location =search.value;

    messageOne.innerText='Loading...';

    fetch('/weather?address=' + location).then((response)=>{
        if(!response){
            return console.log('Error');
        }
        response.json().then((data)=>{
            if(data.error){
                messageOne.textContent=data.error;
            }else{
                messageOne.innerText=data.locationmessage;
                messageTwo.innerText=data.forecastmessage;
            }
        })
    })
})