function ajax(options = {}) {
  const httpRequest = new XMLHttpRequest();
  const settings = {
    url: '/',
    method: 'GET',
    data: '',
    load: (response) => {
      if (settings.success !== undefined && typeof settings.success === 'function') {
        if (response.explicitOriginalTarget !== undefined) {
          settings.success(response.explicitOriginalTarget.response);
        } else if (response.currentTarget) {
          settings.success(response.currentTarget.response);
        }
      };
    },
    success: () => {
      console.log('Your success function goes here.');
    },
    error: (response) => {
      console.warn(response);
    }
  };

  // Object assign the settings
  for (const key in settings) {
    if (Object.hasOwnProperty.call(settings, key) && options[key] !== undefined) {
      settings[key] = options[key];
    }
  }

  if (settings.method != 'GET' && settings.method != 'POST') {
    console.warn('method: ', settings.method, 'is not valid.');
    return false;
  }

  if (settings.contentType == undefined) {
    if (settings.method === 'GET') {
      settings.contentType = 'application/json;charset=UTF-8'
    } else if (settings.method === 'POST') {
      settings.contentType = 'application/x-www-form-urlencoded'
    }
  }

  httpRequest.addEventListener("load", settings.load);
  httpRequest.addEventListener("error", settings.error);

  httpRequest.open(settings.method, settings.url);

  httpRequest.setRequestHeader('x-requested-with', "XMLHttpRequest");
  httpRequest.setRequestHeader('Content-Type', settings.contentType);
  httpRequest.setRequestHeader('Access-Control-Allow-Origin', settings.url);

  httpRequest.send(settings.data);
};

exports.ajax = ajax;