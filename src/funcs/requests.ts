import { getCookie } from 'tiny-cookie';
import { Router } from "vue-router";
import { useAlertStore } from './../store/alertStore';


type PostOptions = {
    include_token?: boolean,
    redirect?: Router | undefined
};

type RequestOptions = {
    method: string,
    headers: {
        [key: string]: string
    },
    body?: string
}

interface ResponseData {
    Alert?:{
        alert_msg: string,
        alert_type: string
    };
    Redirect?: {
        redirect_url: string
    };
    /*
    Logout?: boolean;
    activated?: boolean;
    registration?: boolean;*/
}

interface ResponseGetHeader extends ResponseData {
    admin: boolean;
    username: string;
    avatar: string;
    activated: boolean;
    registration: boolean;
}

interface ResponseLogin extends ResponseData {
    Login: {
        token: string
    };
}

interface ResponseGetUsers extends ResponseData {
    Users: {
        username: string,
        avatar: string
    }[];
}

interface ResponseGetUser extends ResponseData {
    username: string;
    avatar: string;
    activated: boolean;
    email?: string;
    token?: {last_login: string, token: string, valid_for: string, valid_until: string};
    perms?: string[];
}

type ResponseGetPerms = string[];

async function post<T>(
    type: string, input_object: any, api_endpoint: string,
    {include_token = true, redirect = undefined}: PostOptions = {})
    : Promise<T> {

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
    const data = await response.json().catch(error => {
        console.log(response)
        console.log('There was an error!', error);
    });

    console.log("'"+api_endpoint+"'\n",requestOptions,"\n",response.status,"\n",data);

    //handle alerts
    if(data.Alert){
        useAlertStore().addAlert(data.Alert.alert_type, data.Alert.alert_msg, 3000);
    }

    //handle Redirects
    if (redirect && data.Redirect){
        console.log("Redirect",data.Redirect.redirect_url);
        redirect.push(data.Redirect.redirect_url);
    }


    if (Math.floor(response.status/100) != 2) {
        throw "Error during request!";
    }

    return data as T;
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

function revoke_url(url: string | undefined): boolean {
    if (!url) return false;
    URL.revokeObjectURL(url);
    return true;
}

export {
    post, get_avatar,
    revoke_url,
    ResponseGetHeader,
    ResponseLogin,
    ResponseGetUsers,
    ResponseGetUser,
    ResponseGetPerms
}