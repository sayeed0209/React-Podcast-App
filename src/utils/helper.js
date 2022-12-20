export function createCookie(name, value, minutes) {
  let expires;
  if (minutes) {
    let date = new Date();
    date.setTime(date.getTime() + minutes);
    expires = "; expires=" + date.toGMTString();
  } else {
    expires = "";
  }

  document.cookie = name + "=" + value + expires;
}
export const getCookiesValue = (str) => {
  const podcast = document.cookie.split(";");
  // console.log(podcast);
  if (podcast[0].length === 0) {
    return "";
  } else {
    const newCookiesArr = podcast.map((item) => item.split("="));
    // console.log(newCookiesArr);
    const filterCookie = newCookiesArr.filter((item) => {
      return item[0].trim() === str;
    });
    // console.log(filterCookie[0], "this is one");
    if (filterCookie.length > 0) {
      return filterCookie[0][1];
    } else {
      return "";
    }
  }
};

export const objectToArray = (obj) => {
  return Object.keys(obj).map((key) => {
    return obj[key];
  });
};

const padTo2Digits = (num) => {
  return num.toString().padStart(2, "0");
};

export const convertMsToTime = (milliseconds) => {
  let seconds = Math.floor(milliseconds / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);

  seconds = seconds % 60;
  minutes = minutes % 60;
  hours = hours % 24;

  return `${padTo2Digits(hours)}:${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`;
};
