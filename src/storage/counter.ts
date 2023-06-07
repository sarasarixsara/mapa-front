import { defineStore } from 'pinia';

export const useStore = defineStore('MainPageCounter', {
    state: () => ({
        count: 0
    }),

    actions: {
        buy() {
            this.count++
        }
    }
});
