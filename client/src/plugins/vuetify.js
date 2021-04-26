import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                custom_red: "#F28B82",
                custom_orange: "#FBBC04",
                custom_yellow: "#FBBC04",
                custom_green: "#CCFF90",
                custom_teal: "#A7FFEB",
                custom_blue: "#CBF0F8",
                custom_darkblue: "#AECBFA",
                custom_purple: "#D7AEFB",
                custom_pink: "#FDCFE8",
                custom_brown: "#E6C9A8",
                custom_gray: "#E8EAED",
                card_orange: "#F29100",
                card_blue: "#3290CC",
                card_dark_blue: "#105079",
                card_red: "#BD0505",
                card_gold: "#DFC279",
                card_silver: "#A6A6A6",
                card_black: "#191919",
                card_dark_green: "#39725E",
                card_green: "#008E28"
            }
        }
    }
});
