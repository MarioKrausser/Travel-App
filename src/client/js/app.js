//API Data
const baseUrl = "http://api.geonames.org/searchJSON?q=";
const userName = "&maxRows=10&username=mariokrausser";

// Create a new date instance dynamically with JS
let d = new Date();
const months = [ "January", "February", "March", "April", "May", "June", "July",
  "August", "September", "October", "November", "December" ];
let today = d.getDate() + '. ' + months[ d.getMonth() ] + ' ' + d.getFullYear();
document.getElementById( 'submit' ).addEventListener( 'click', onSubmit );
async function onSubmit( e ) {
  e.preventDefault()
  // Get ZIP
  const location =  document.getElementById( 'place' ).value;
  // Get user response
  const date =  document.getElementById( 'date' ).value;
  // API Call
  if ( location ) {
    fetch( baseUrl + location + userName )
      .then( result => result.json() )
      .then( result => {
        console.log( result );
      })
  } else {
    alert( 'write please a location');
  }
}

export { onSubmit }









