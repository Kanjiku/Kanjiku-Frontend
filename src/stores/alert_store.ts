import { defineStore } from "pinia";
import { ref, reactive } from "vue";

export enum AlertType {
    SUCCESS,
    WARNING,
    ERROR
};

export type Alert = {
    id: number;
    type: AlertType;
    text: string;
}

export const use_alert_store = defineStore("alerts", () => {
    let id_counter = 0;
    let alerts: Alert[] = reactive([]);

    const default_durations = new Map([
        [AlertType.SUCCESS, 3000],
        [AlertType.WARNING, 5000],
        [AlertType.ERROR, 10000]
    ]);


    function add(type: AlertType, text: string, expire?: number) {
        expire = expire ?? default_durations.get(type);
        console.log(text, expire);
        let id = id_counter++;
        alerts.push({
            id: id,
            type: type,
            text: text
        });
        setTimeout(() => {
            console.log("Removing alert")
            remove(id);
        }, expire);
    }

    function remove(id: number) {
        const idx = alerts.findIndex(alert => alert.id === id);
        if (idx === -1) return;
        alerts.splice(idx, 1);
    }

    return {
        alerts,
        add,
        remove
    };
})