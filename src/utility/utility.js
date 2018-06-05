export const convertObjRsToArray = rs => {
  const result = [];
  for (const key in rs)
    result.push({ ...rs[key], id: key });

  return result;
}