let mobileReg = new RegExp("^(\\+98|0)?9\\d{9}$");

export const isPersionMobileNumber = (data) => {
  if (data.match(mobileReg)) {
    return true;
  } else {
    return false;
  }
};

export const createValidMobileNumber = (data) => {
  if (data[0] === "0") {
    const replaced = data.replace("0", "+98");
    return replaced;
  } else {
    return data;
  }
};
