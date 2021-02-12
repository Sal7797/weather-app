/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let month = parseInt(d.getMonth());
let newDate = `${++month}/${d.getDate()}/${d.getFullYear()}`;
const APIKey = "67ebf1a7e3193abdb2c1802c4fc5d42f";
const localhost = "http://localhost:8080";


const getWeather = async (ZIPCode, apiKey) => {
    const result = await fetch(`http://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&zip=${ZIPCode}&units=metric`);
    try {
      const inputData = await result.json();
      return inputData;
    } catch (error) {
      alert(error);
    }
}

const postData = async (url = '', data = {}) => {
    console.log(url);
    const request = await fetch(url, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          date: data.date,
          temp: data.temp,
          content: data.content
        }),
    });
    try {
      const newWeatherData = await request.json();
      console.log(newWeatherData);
      return newWeatherData;
    }
    catch (error) {
      alert("postdata error:"  + error);
    }
};

function updateUI(date, temp, content) {
    document.getElementById('date').innerText = `Date: ${date}`;
    document.getElementById('temp').innerText = `Tempreture: ${temp*100}`;
    document.getElementById('content').innerText = `Feels: ${content}`;
}
  

const geteratebtn = document.getElementById('generate');
geteratebtn.addEventListener('click', () => {
    const ZIPCode = document.querySelector('#zip').value;
    const content = document.querySelector('#feelings').value;

    if(!ZIPCode){
        alert("Enter a ZIP Code.");
    }
    getWeather(ZIPCode, APIKey)
    .then(inputData => {
        console.log(inputData.main.temp);
        postData(localhost+'/add', {date: newDate, temp: inputData.main.temp, content: content})
        .then(newWeatherData => {
            console.log("hhh"+newWeatherData);
            updateUI(newWeatherData.date, newWeatherData.temp, newWeatherData.content)
        })
    })

})
