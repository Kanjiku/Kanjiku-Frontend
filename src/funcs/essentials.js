import { getCookie, setCookie, removeCookie } from "tiny-cookie";

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
  post
}