import { addCalender } from "./calender";

//API Data
const baseUrlGeonames = "http://api.geonames.org/searchJSON?q=";
const userName = "&maxRows=10&username=mariokrausser";

//API weatherbit
const baseUrlWeatherbit = 'https://api.weatherbit.io/v2.0/forecast/daily';
const keyWeatherbit = '5f149f514b114596942d101e6c8c71b7';

const baseUrlPixabay = 'https://pixabay.com/api/?';
const keyPixabay = '20390453-85fe319c3107f7ce8f5be2b01';

// Create a new date instance dynamically with JS
let d = new Date();
let today = d.getFullYear() + '-' + ( "0" + ( d.getMonth() + 1 ) ).slice( -2 ) + '-' + d.getDate();
let dateControl = document.querySelector( 'input[type="date"]' );
let cities = {};

dateControl.value = today;
dateControl.min = today;
dateControl.max = addCalender();

document.getElementById( 'submit' ).addEventListener( 'click', performAction );

async function performAction( e ) {
  e.preventDefault()
  // Get ZIP
  let location = document.getElementById( 'place' ).value;
  location = location.replace( /\s/g, '' );

  // API Call
  if ( location ) {
    fetch( baseUrlGeonames + location + userName )
      .then( resultGeonames => resultGeonames.json() )
      .then( resultGeonames => {
        console.log( resultGeonames );
        if ( resultGeonames.totalResultsCount === 0 ) {
          alert( 'Please enter a location!' );
        } else {
          cities.city = resultGeonames.geonames[ 0 ].name;
          cities.country = resultGeonames.geonames[ 0 ].countryName;
          fetch( baseUrlWeatherbit + '?lat=' + resultGeonames.geonames[ 0 ].lat + '&lon=' + resultGeonames.geonames[ 0 ].lng + '&key=' + keyWeatherbit )
            .then( resultWeatherbit => resultWeatherbit.json() )
            .then( resultWeatherbit => {
              console.log( resultWeatherbit );
              document.getElementById( 'weather-temp' ).innerHTML = `there is a temperature of ${ resultWeatherbit.data[ daysLeft( dateControl.value ) ].temp } °`;
              document.getElementById( 'weather-description' ).innerHTML = `and it is ${ resultWeatherbit.data[ daysLeft( dateControl.value ) ].weather.description }`;

              const icon = require( `../media/${ resultWeatherbit.data[ daysLeft( dateControl.value ) ].weather.icon }.png` );
              document.getElementById( 'weather-icons' ).innerHTML = `<img src="${ icon }" height="75px" width="75px">`;
              document.getElementById( 'travel-date' ).innerHTML = `on ${ resultWeatherbit.data[ daysLeft( dateControl.value ) ].datetime }`;
            } )
          fetch( baseUrlPixabay + 'key=' + keyPixabay + '&q=' + location + '&image_type=photo' )
            .then( resultPixabay => resultPixabay.json() )
            .then( resultPixabay => {
              console.log( resultPixabay );
              if ( resultPixabay.total === 0 ) {
                alert( 'No image was found!' );
              } else {
                document.getElementById( 'picture' ).innerHTML = `<img src=${ resultPixabay.hits[ 0 ].largeImageURL }>`;
              }

            } )
        }
        document.getElementById( 'city-information' ).style.padding = '20px';
        document.getElementById( 'city' ).innerHTML = `In ${ resultGeonames.geonames[ 0 ].name }`;
        document.getElementById( 'country' ).innerHTML = `in ${ resultGeonames.geonames[ 0 ].countryName }`;
      } )

  } else {
    alert( 'Please write a location!' );
  }

}

function daysLeft( startTrip ) {
  const day = parseInt( startTrip.substring( 8 ) );
  let month = startTrip.substring( 5, 7 );
  if ( month.substring( 0, 1 ) === '0' ) {
    month.slice( 0, 1 );
  }
  month = parseInt( month ) - 1;
  const year = parseInt( startTrip.substring( 0, 4 ) );
  const oneDay = 24 * 60 * 60 * 1000;
  const end = new Date( year, month, day );
  const result = Math.ceil( ( end.getTime() - d.getTime() ) / oneDay );
  return Math.abs( result );
}

// POST request to server
const postData = async ( url = '', data = {} ) => {
  const response = await fetch( url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify( data ),
  } );
  try {
    const newData = await response.json();
    console.log( "newData", newData );
    return newData
  } catch ( error ) {
    console.error( "error", error );
  }
};

postData( 'http://localhost:8000/addData', { journeyInformation: cities } );

export { performAction }







