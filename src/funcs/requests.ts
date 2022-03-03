import { getCookie } from 'tiny-cookie';
import { Router } from "vue-router";
import { useAlertStore } from './../store/alertStore';


type PostOptions = {
    include_token?: boolean,
    alert?: boolean,
    redirect?: Router | undefined
};

type RequestOptions = {
    method: string,
    headers: {
        [key: string]: string
    },
    body?: string
}

type ResponseData = {
    Users: {username: string, avatar: string}[],
    Alert?:{
        alert_msg: string,
        alert_type: string
    },
    Redirect?: {
        redirect_url: string
    },
    Login?: {
        token: string
    },

    username?: string,
    avatar?: string,
    email?: string,

    Logout?: boolean,
    activated?: boolean,
    registration?: boolean
}

/*type LoginResponse = {

}*/

async function post(
    type: string, input_object: any, api_endpoint: string,
    {include_token = true, alert = true, redirect = undefined}: PostOptions = {})
    : Promise<[number, ResponseData]> {

    const requestOptions: RequestOptions = {
        method: type,
        headers: { 
        "Content-Type": "application/json"
        }
    };

    if(include_token) {
        const token_cookie = getCookie("token");
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

    const url = window.location.protocol+"//"+window.location.hostname+":8000"+"/"+api_endpoint;
    const response = await fetch(url, requestOptions).catch(() => {
        useAlertStore().addAlert("alert-danger", "Connection error", 3000);
        throw "Connection Error";
    });
    const data: ResponseData = await response.json().catch(error => {
        console.log(response)
        console.log('There was an error!', error);
    });

    console.log("'"+api_endpoint+"'\n",requestOptions,"\n",response.status,"\n",data);

    //handle alerts
    if(data.Alert){
        let duration = 3000;
        if (alert) {
            duration = 5000;
            if (data.Alert.alert_type == "alert-success") {
                duration = 2000;
            } else if (data.Alert.alert_type == "alert-danger" || data.Alert.alert_type == "alert-info") {
                duration = 200000;
            }
        }
        useAlertStore().addAlert(data.Alert.alert_type, data.Alert.alert_msg, duration);
    }

    //handle Redirects
    if (redirect && data.Redirect){
        console.log("Redirect",data);
        redirect.push(data.Redirect.redirect_url);
    }


    if (Math.floor(response.status/100) != 2) {
        console.log("throwing");
        throw "Error during request!";
    }

    return [response.status, data];
}

async function get_avatar(avatar_name: string): Promise<string> {
    const requestOptions = {
        method: "GET"
    };
    const url = window.location.protocol+"//"+window.location.hostname+":8000/avatar/"+avatar_name;
    const response = await fetch(url, requestOptions);
    
    const blob = await response.blob();

    return new Promise(resolve => {
        resolve(URL.createObjectURL(blob))
    });
}

export {
    post, get_avatar
}