export const getKeyWord = (search, field) => {
  if (search) {
    let params = new URLSearchParams(search);
    let value = params.get(field);

    if (field === "sort") {
      return value ? value : "none";
    } else {
      return value ? value : "all";
    }
  } else {
    return "all";
  }
};
