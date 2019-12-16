// function insertSort (arr) {
//   for(let i = 1;i < arr.length; i++) {
//     for(let j = i-1;j >= 0; j--) {
//       if (arr[i] >= arr[j]) {
//         let temp = arr[i]
//         arr.splice(i, 1)
//         arr.splice(j+1, 0, temp)
//         break
//       }
//       else if (j === 0 && arr[i] < arr[j]) {
//         let temp = arr[i]
//         arr.splice(i, 1)
//         arr.splice(0, 0, temp)
//       }
//     }
//   }
//   return arr
// }

function insertSort (arr) {
  for(let i = 1;i < arr.length; i++) {
    let num = i
    for(let j = i-1;j >= 0; j--) {
      if (arr[i] >= arr[j]) break
      num = j
    }
    if (num != i) {
      let temp = arr[i]
      arr.splice(i, 1)
      arr.splice(num, 0, temp)
    }
  }
  return arr
}

let arr = [2, 1, 6, 5, 4, 3, 7]
console.log(insertSort(arr)) 

