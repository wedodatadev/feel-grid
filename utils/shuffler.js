
export function seededRandom( seed ){

  if ( seed > 0 ){
    // cf : https://stackoverflow.com/questions/521295/seeding-the-random-number-generator-in-javascript
    // important : avoid seed == 0
    let x = Math.sin(seed++) * 10000
    return x - Math.floor(x)
  } 
  else {
    return Math.random()
  }

}


export function array_move(arr, old_index, new_index) {
  // cf : https://stackoverflow.com/questions/5306680/move-an-array-element-from-one-array-position-to-another
  if (new_index >= arr.length) {
    var k = new_index - arr.length + 1
    while (k--) {
      arr.push(undefined)
    }
  }
  arr.splice(new_index, 0, arr.splice(old_index, 1)[0])
  return arr
}


export default function ArrayShuffler( array, seed=0, itemOnTopIdentifier=undefined, fieldToCheck="card-id" ){

  // cf: https://bost.ocks.org/mike/shuffle/


  var currentIndex = array.length, temporaryValue, randomIndex

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    // randomIndex = Math.floor( Math.random() * currentIndex)
    randomIndex = Math.floor( seededRandom(seed) * currentIndex)
    currentIndex -= 1

    // And swap it with the current element.
    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue

  }

  // place itemOnTop at beginning of the array
  if ( itemOnTopIdentifier ) {
    
    // find item inside arrray
    let itemToBeginWith = array.find(item => {
      return item[ fieldToCheck ] === itemOnTopIdentifier
    })

    // find itemToBeginWith's index 
    let itemToBeginWithIndex = itemToBeginWith && array.indexOf(itemToBeginWith)

    // replace itemToBeginWith at beginning of the array
    array = itemToBeginWith && array_move( arrray, itemToBeginWithIndex, 0)

  } 

  return array


}