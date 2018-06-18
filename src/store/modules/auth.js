import router from "../../router";

const state = {
    isAuth: false,
    onFail: false
};

// getters
const getters = {
    isAuth: state => {
        return state.isAuth;
    }
};

// mutations
const mutations = {
    login(state, payload) {
        state.isAuth = true;
    }
};

// actions
const actions = {
    login({ commit, state }, payload) {
        if (!state.isAuth) {
            if (payload.password === "psd") {
                commit("login", payload);
                router.push("/map");
            }
        }
    }
};

export default {
    namespace: true,
    getters,
    state,
    mutations,
    actions
};
