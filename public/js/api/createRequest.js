/**
 * Основная функция для совершения запросов
 * на сервер.
 * */

const createRequest = (options = {}) => {
  const xhr = new XMLHttpRequest;
  xhr.responseType = 'json';
  
  if (options.method === 'GET') {
    if (options.data) {
      let url = options.url + '?';
      const lastParam = Object.keys(options.data)[Object.keys(options.data).length - 1];

      for (param in options.data) {
        url += `${param}=${options.data[param]}`;

        if (param !== lastParam) {
          url += '&';
        }
      }

      xhr.open(options.method, `${url}`);
    } else {
      xhr.open(options.method, options.url);
    }
    
    xhr.send();
  } else {
    const formData = new FormData();

    for (key in options.data) {
      formData.append(key, options.data[key]);
    }

    xhr.open(options.method, options.url);
    xhr.send(formData);
  }

  xhr.addEventListener('load', () => options.callback(null, xhr.response));
  xhr.addEventListener('error', (e) => options.callback(e.type, null));
};

