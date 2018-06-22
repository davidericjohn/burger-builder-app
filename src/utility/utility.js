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
};

export const cleanErrorCode = errorMessage => {
  const delimiter = ":";
  let errorCode = errorMessage;
  if (errorMessage.includes(delimiter)) {
    errorCode = errorMessage.split(delimiter)[0].trim();
  }

  return errorCode;
};

export const isValid = (value, rules) => {
  let isValid = true;
  if (!rules)
    return true;

  if (rules.required)
    isValid = value.trim() !== '' && isValid;

  if (value && rules.min)
    isValid = value.length >= rules.min && isValid

  if (rules.max)
    isValid = value.length <= rules.max && isValid

  if (value && rules.email) {
    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    isValid = pattern.test(value) && isValid
  }

  if (rules.isNumeric) {
    const pattern = /^\d+$/;
    isValid = pattern.test(value) && isValid
  }

  return isValid;
};