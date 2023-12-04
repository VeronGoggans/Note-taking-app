class MySessionStorage {
    static set(key, value) {
        window.sessionStorage.setItem(key, value);
    }

    static get(key) {
        return window.sessionStorage.getItem(key);
    }
}