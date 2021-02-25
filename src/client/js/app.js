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
const months = [ "January", "February", "March", "April", "May", "June", "July",
  "August", "September", "October", "November", "December" ];
let today = d.getFullYear() + '-' + ( "0" + ( d.getMonth() + 1 ) ).slice( -2 ) + '-' + d.getDate();
let dateControl = document.querySelector( 'input[type="date"]' );


dateControl.value = today;
dateControl.min = today;
dateControl.max = add15days()

// function importAll(r) {
//   let images = {};
//   r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
//   return images;
// }
//
// const images = importAll(require.context('./media', false, /\.(png|jpe?g|svg)$/));

document.getElementById( 'submit' ).addEventListener( 'click', performAction );

async function performAction( e ) {
  e.preventDefault()
  // Get ZIP
  const location = document.getElementById( 'place' ).value;
  // location = location.replace( /\s/g, '' );
  // API Call
  if ( location ) {
    fetch( baseUrlGeonames + location + userName )
      .then( resultGeonames => resultGeonames.json() )
      .then( resultGeonames => {
        console.log( resultGeonames );

        if ( resultGeonames.totalResultsCount === 0 ) {
          alert( 'Please enter a location!' );
        } else {
          fetch( baseUrlWeatherbit + '?lat=' + resultGeonames.geonames[ 0 ].lat + '&lon=' + resultGeonames.geonames[ 0 ].lng + '&key=' + keyWeatherbit )
            .then( resultWeatherbit => resultWeatherbit.json() )
            .then( resultWeatherbit => {
              console.log( resultWeatherbit );
              document.getElementById( 'weather-temp' ).innerHTML = `there is a temperature of ${ resultWeatherbit.data[ daysLeft( dateControl.value ) ].temp } °`;
              document.getElementById( 'weather-description' ).innerHTML = `and it is ${ resultWeatherbit.data[ daysLeft( dateControl.value ) ].weather.description }`;

              const icon = require( `../media/${ resultWeatherbit.data[ daysLeft( dateControl.value ) ].weather.icon }.png` );
              console.log( `../media/${ resultWeatherbit.data[ daysLeft( dateControl.value ) ].weather.icon }.png` );
              document.getElementById( 'weather-icons' ).innerHTML = `<img src="${ icon }" height="50px" width="50px">`;
              // document.getElementById( 'weather-icons' ).innerHTML = '<img src="{image[`${ resultWeatherbit.data[daysLeft( dateControl.value )].weather.icon }.png`] }" height="50px" width="50px">';
              // document.getElementById( 'weather-icons' ).innerHTML = `<img src="c03d.png" height="50px" width="50px">`;
              document.getElementById( 'travel-date' ).innerHTML = `on ${ resultWeatherbit.data[ daysLeft( dateControl.value ) ].datetime }`;
            } )
          fetch( baseUrlPixabay + 'key=' + keyPixabay + '&q=' + location + '&image_type=photo' )
            .then( resultPixabay => resultPixabay.json() )
            .then( resultPixabay => {
              console.log( resultPixabay );
              if ( resultPixabay.total === 0 ) {
                alert( 'No image was found!' );
              } else {
                document.getElementById( 'picture' ).innerHTML = `<img src=${ resultPixabay.hits[ 0 ].previewURL }>`;
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
  daysLeft( dateControl.value );


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

function add15days() {
  const maxDays = new Date();
  maxDays.setDate( maxDays.getDate() + 16 )
  return maxDays.getFullYear() + '-' + ( "0" + ( maxDays.getMonth() + 1 ) ).slice( -2 ) + '-' + maxDays.getDate();
}

// API call, get data
// const getWeatherData = async ( baseURL, lat, lon, key ) => {
//   console.log( 'url: ', baseURL, lat, lon, key );
//   const res = await fetch( baseURL + lat + lon + key )
//   try {
//     const data = await res.json();
//     console.log( 'Data_of_api: ', data )
//     return data;
//   }  catch( error ) {
//     console.log( "error" , error );
//   }
// }
// POST METHOD, post Data to server
// const postData = async ( url = '', data = {} ) => {
//   const response = await fetch( url, {
//     method: 'POST',
//     credentials: 'same-origin',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify( data ),
//   });
//   try {
//     const newData = await response.json();
//     console.log( newData );
//     return newData;
//   } catch( error ) {
//     console.log( "error", error );
//   }
// };
// Async GET
// const updateUI = async ( city, zip ) =>{
//   const request = await fetch( '/all' );
//   try {
//     // Transform into JSON
//     const allData = await request.json()
//     console.log( 'updateUI', allData );
//     // update UI
//     document.getElementById( 'weather-temp' ).innerHTML = `Weather data in ${ city }, ${ zip }`;
//     document.getElementById( 'travel-date' ).innerHTML = `Date: ${ allData.date }`;
//     document.getElementById( 'weather-temp' ).innerHTML = `Temperature: ${ allData.data[0].temp } °`;
//     document.getElementById( 'weather-despription' ).innerHTML = `Despription: ${ allData.data[0].weather.despription }`;
//     document.getElementById( 'weather-picture' ).innerHTML = `${ allData.data[0].weather.icon }`;
//   }
//   catch(error) {
//     console.log("error", error);
//   }
// };
export { performAction }







