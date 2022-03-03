import { defineStore } from "pinia";
import { ref, Ref } from "vue";

type Alert = {
    id: number
    type: string,
    text: string
}

type AlertsState = {
    alertsId: number,
    alerts: Alert[]
}

export const useAlertStore = defineStore("alerts", {
    state: () => ({
        alertsId: -1,
        alerts: []
    } as AlertsState),

    actions: {
        addAlert(type: string, text: string, expire = 3000) {
            this.alertsId++;
            this.alerts.push({id: this.alertsId, type: type, text: text});
            setTimeout((id: number) => {
                const idx = this.alerts.findIndex((alert: { id: number; }) => alert.id == id);
                if (idx == -1) return;
                this.alerts.splice(idx, 1);
            }, expire, this.alertsId);
        },

        removeAlert(id: number) {
            const idx = this.alerts.findIndex(alert => alert.id == id);
            if (idx == -1) return;
            this.alerts.splice(idx, 1);
        }
    }
})