export const addPagedPayload = (currentArray, incomingArray, comparingKey) => {
  let overlapIndex
  if (incomingArray.length > 0) {
    overlapIndex = currentArray.map(item => {
      return item[comparingKey]
    })
      .indexOf(incomingArray[0][comparingKey])
  }
  if (overlapIndex > -1) {
    return currentArray.slice(0, overlapIndex)
      .concat(incomingArray)
  } else {
    return currentArray.concat(incomingArray)
  }
}
