export const convertObjRsToArray = rs => {
  const result = [];
  for (const key in rs)
    result.push({ ...rs[key], id: key });

  return result;
}

export const updateObject = (oldState, updateProperties) => {
  return {
    ...oldState,
    ...updateProperties
  };
}

export const cleanErrorCode = errorMessage => {
  const delimiter = ":";
  let errorCode = errorMessage;
  if (errorMessage.includes(delimiter)) {
    errorCode = errorMessage.split(delimiter)[0].trim();
  }

  return errorCode;
}