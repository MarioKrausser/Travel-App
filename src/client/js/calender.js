
function addCalender() {
  const maxDays = new Date();
  maxDays.setDate( maxDays.getDate() + 16 )
  return maxDays.getFullYear() + '-' + ( "0" + ( maxDays.getMonth() + 1 ) ).slice( -2 ) + '-' + maxDays.getDate();
}

export { addCalender }