exports.getResObject = (httpStatus, dataOrMessage) => {
  const jsonObject = {
    code: 0,
  };

  if (httpStatus >= 200 && httpStatus < 300) {
    jsonObject.code = httpStatus;
    jsonObject.data = dataOrMessage;
  } else if (httpStatus >= 400 && httpStatus < 500) {
    jsonObject.code = httpStatus;
    jsonObject.message = dataOrMessage;
  } else if (httpStatus >= 500) {
    jsonObject.code = httpStatus;
    jsonObject.message = dataOrMessage;
  } else {
    jsonObject.code = 500;
    jsonObject.message = 'error';
  }

  return jsonObject;
};
