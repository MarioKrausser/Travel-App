// Global Variables 
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+ 1 + '.'+ d.getDate()+'.'+ d.getFullYear();

// Personal API Key for OpenWeatherMap API
const apiKey = '&units=metric&APPID=e4556829179c13d93b039efb3a3c764f';

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);

/* Function called by event listener */
async function performAction(e){
  let content =  document.getElementById('feelings').value;
  let newZip =  document.getElementById('zip').value;
  
  const data = await getWeather(baseURL, newZip, apiKey);

  // Add data
  console.log(data);
  await postData('/addData', {date: newDate, temperature: data.main.temp, userContent: content} );

  updateUI()
}

/* Function to GET Web API Data*/
const getWeather = async (baseURL, newZip, apiKey) =>{

  const res = await fetch(baseURL + newZip + apiKey)
  try {
    const data = await res.json();
    console.log(data)
    return data;
  }catch(error) {
    console.error("error", error);
  }
}


/* Function to POST data */
const postData = async ( url = '', data = {})=>{
  const response = await fetch(url, {
      method: 'POST', 
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),     
  });
  try {
    const newData = await response.json();
    return newData
  }catch(error) {
    console.error("error", error);
  }
}

/* Function to GET Project Data */

const updateUI = async () => {
  const request = await fetch('/all');
  try{
    const allData = await request.json();
    document.getElementById('date').innerHTML = `Date: ${allData.date}`;
    document.getElementById('temp').innerHTML = `Temperature: ${allData.temperature}°`;
    document.getElementById('content').innerHTML = `Your statement: ${allData.userContent}`;

  }catch(error){
    console.error("error", error);
  }
}








