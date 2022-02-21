import { createStore } from "vuex";
import { post } from "@/funcs/essentials";

import themeModule from "./themeModule";
import alertModule from "./alertModule";
import statusModule from "./statusModule";

export default createStore({
  actions: {
    post: async function({ commit }, [type, input_object, api_endpoint,include_token]) {
      let [status, data] = await post(type, input_object, api_endpoint, include_token);
      if(data.Alert){
        let duration = 5000;
        if (data.Alert.alert_type == "alert-success") {
          duration = 2000;
        } else if (data.Alert.alert_type == "alert-danger" || data.Alert.alert_type == "alert-info") {
          duration = 200000;
        }
        commit("addAlert",[data.Alert.alert_type, data.Alert.alert_msg, duration]);
      }
    
      //handle Redirects
      /*console.log("redirect",data);
      if (data.Redirect){
        console.log("Redirect",data);
        router.push(data.Redirect.redirect_url);
      }*/

      return [status, data];
    }
  },
  modules: {
    theme: themeModule,
    users: alertModule,
    status: statusModule
  }
});
