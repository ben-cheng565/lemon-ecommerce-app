export const getKeyWord = (search, field) => {
  if (search) {
    let params = new URLSearchParams(search);
    let value = params.get(field);
    return value ? value : "all";
  } else {
    return "all";
  }
};
