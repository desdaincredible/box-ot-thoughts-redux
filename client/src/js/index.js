import store from "../js/store/store";

// change to new functions
import { handleRegister } from "./actions/actions";

window.store = store;
window.handleRegister = handleRegister;