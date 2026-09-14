export const count = (str) => {
    let o = {}
    for(let c of str) {
        o[c] = o[c] ? o[c] + 1 : 1
    }
    return o;
  }

  export function isCharInString(char, str) {
    return str.indexOf(char) > -1 
  }

  export function isCharInStringPosition(char, str, index) {

  }

  export function countCharacters(char, str) {
    let count = 0
    for ( const c of str ) {
      if ( c === char ) {
        count++
      }
    }
    return count
  }