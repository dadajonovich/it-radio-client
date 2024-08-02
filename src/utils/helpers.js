const helpers = {
  range: (start, end, step = 1, toFixed = null) => {
    let arr = [];

    while (start <= end) {
      if (toFixed) start = Number(start.toFixed(toFixed));
      arr.push(start);
      start += step;
    }
    return arr;
  },
};

export default {
  install(app) {
    app.helpers = helpers;
    app.config.globalProperties.$helpers = helpers;
  },
};
export { helpers };
