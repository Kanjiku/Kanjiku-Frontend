import { ActionTree, createStore } from 'vuex'

import themeModule from "./themeModule";
import alertModule from "./alertModule";
import statusModule from "./statusModule";

import { Router } from "vue-router";
import { getCookie } from "tiny-cookie";

type PostOptions = {
    include_token: boolean,
    alert: boolean,
    redirect: Router | undefined
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

class State {}

const actions = <ActionTree<State, State>> {
    post: async function({commit}, 
        [
            type, input_object, api_endpoint,
            {include_token: include_token, alert: alert, redirect: redirect} = {include_token: true, alert: true, redirect: undefined}
        ]: 
        // eslint-disable-next-line
        [string, any, string, PostOptions]): Promise<[number, ResponseData]> {

        include_token = include_token ?? true;
        alert = alert ?? true;

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
        const response = await fetch(url, requestOptions);
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
            commit("addAlert",[data.Alert.alert_type, data.Alert.alert_msg, duration]);
        }
        
        //handle Redirects
        if (redirect && data.Redirect){
            console.log("Redirect",data);
            redirect.push(data.Redirect.redirect_url);
        }

        if (Math.floor(response.status/100) != 2) {
            throw new Error("Error during request!");
        }

        return [response.status, data];
    },

    get_avatar: async function(_0, avatar_name: string): Promise<string> {
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
}

export default createStore({
    actions: actions,
    modules: {
        theme: themeModule,
        alert: alertModule,
        status: statusModule
    }
})
