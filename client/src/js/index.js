import store from "../js/store/store";

// change to new functions
import { handleRegister, handleLogin, logout } from "./actions/actions";

window.store = store;
window.handleRegister = handleRegister;
window.handleLogin = handleLogin;
window.logout = logout;