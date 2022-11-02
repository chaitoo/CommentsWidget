const indexArrUtil = (msgLevel) => {
  let indexArr = msgLevel?.split("-");
  return indexArr.map((x) => parseInt(x, 10));
};

const nestedArrayUtil = (arr, indexArr, utilFunc) => {
  if (indexArr.length > 1) {
    arr[indexArr[0]].replies = nestedArrayUtil(
      arr[indexArr[0]].replies,
      indexArr.splice(1),
      utilFunc
    );
  } else if (indexArr.length === 1) {
    utilFunc(arr, indexArr[0]);
  }
  return arr;
};

//Add comment logic
export const addCommentUtil = (comments, res) =>
  comments.concat({ text: res, replies: [], timestamp: Date.now() });

//Add reply logic
export const addReplyUtil = (comments, res) => {
  const { replyText, msgLevel } = res;
  const indexArr = indexArrUtil(msgLevel);
  const replyObj = {
    text: replyText,
    replies: [],
    timestamp: Date.now(),
  };
  const replyUtilFunc = (currObj, currIndex) => {
    currObj[currIndex].replies = currObj[currIndex].replies.concat(replyObj);
  };
  return nestedArrayUtil(comments, indexArr, replyUtilFunc);
};

//Delete comment logic
export const deleteCommentUtil = (comments, res) => {
  const { msgLevel } = res;
  const indexArr = indexArrUtil(msgLevel);
  const deleteUtilFunc = (currObj, currIndex) => {
    currObj.splice(currIndex, 1);
  };
  return nestedArrayUtil(comments, indexArr, deleteUtilFunc);
};

//Edit Comment logic
export const editCommentUtil = (comments, res) => {
  const { editText, msgLevel } = res;
  const indexArr = indexArrUtil(msgLevel);
  const editUtilFunc = (currObj, currIndex) => {
    currObj[currIndex].text = editText;
    currObj[currIndex].timestamp = Date.now();
  };
  return nestedArrayUtil(comments, indexArr, editUtilFunc);
};
