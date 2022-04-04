console.log('client')



const weatherForm = document.querySelector('form')
const searchBtn = document.querySelector('input')
const paragraphOne = document.querySelector('.paragraph-1')
const paragraphTwo = document.querySelector('.paragraph-2')

// paragraphOne.textContent = 'From js'




weatherForm.addEventListener('submit', (e) => {
    e.preventDefault() // it is not realoading page after button click 

    const location = searchBtn.value
    console.log(searchBtn.value)

    paragraphOne.textContent = 'Loading data ...'
    paragraphTwo.textContent = ''


    fetch('http://localhost:3000/weather/?address='+location).then((response) => {

        response.json().then((data) => {
            if(data.error){
                paragraphOne.textContent = data.error
            }
            else{
                paragraphOne.textContent = data.location
                paragraphTwo.textContent = data.forecastData
            }
        })
    })
})