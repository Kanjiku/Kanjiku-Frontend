function createCookie(name, value, days) {
  var expires = "";
  if (days) {
    var today = new Date();
    var valid_until = new Date();
    valid_until.setDate(today.getDate()+days);
    expires = "; expires=" + valid_until.toUTCString();
  }

  document.cookie = name + "=" + value + expires + "; path=/";
}

function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

function deleteCookie(name) {
  createCookie(name, "", -1);
}

async function post(type, input_object, api_endpoint,include_token = true) {

  const requestOptions = {
    method: type,
    headers: { 
      "Content-Type": "application/json"
    },
  };

  if(include_token) {
    var token_cookie = getCookie("token");
    if(token_cookie) {
      if (token_cookie.length < 2) {
        console.log("did not append cookie to json")
      } else {
        requestOptions.headers["Authorization"] = "Token "+getCookie("token");
      }
    } 
  }

  if(type != "GET") {
    requestOptions.body = JSON.stringify(input_object);
  }

  var url = window.location.protocol+"//"+window.location.hostname+":8000"+"/"+api_endpoint;
  console.log("'"+api_endpoint+"'\n",requestOptions);
  const response = await fetch(url, requestOptions);
  const data = await response.json().catch(error => {
    console.log(response)
    console.log('There was an error!', error);
  });

  console.log(response.status)
  console.log(data)

  return [response.status, data];
}

export {
  createCookie,
  getCookie,
  deleteCookie,
  post
}