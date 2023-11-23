import axios from "axios";
const baseUrl = `http://localhost:5000`;
const events = [
    "load",
    "mousemove",
    "mousedown",
    "click",
    "scroll",
    "keypress",
];

let localStorageNew;
if (typeof window !== "undefined") {
    localStorageNew = localStorage.getItem("token");
}

export default axios.create({
    baseURL: baseUrl,
    timeout: 30000,
    headers: {
        "Content-Type": "application/json",
    },

    validateStatus: (status) => {
        return status;
    },
});
