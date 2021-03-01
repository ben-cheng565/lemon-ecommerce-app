export const getKeyWord = (search, field) => {
  if (search) {
    let params = new URLSearchParams(search);
    let value = params.get(field);

    switch (field) {
      case "sort":
        return value ? value : "none";
      case "currPage":
        return value ? value : 1;
      default:
        return value ? value : "all";
    }
  } else {
    return "all";
  }
};
