// Common functions for front end

// Get the value of keywords in the search box
export const getKeyWord = (search, field) => {
  if (search) {
    let params = new URLSearchParams(search);
    let value = params.get(field);

    switch (field) {
      case "currPage":
        return value ? value : 1;
      default:
        return value ? value : "";
    }
  } else {
    return "";
  }
};
