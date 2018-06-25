import router from "../../router";

const state = {
    isAuth: false,
    authFail: false
};

// getters
const getters = {
    isAuth: (state) => {
        return state.isAuth;
    },
    authFail: (state) => {
        return state.authFail;
    }
};

// mutations
const mutations = {
    login(state, payload) {
        state.isAuth = true;
    },
    fail(state, payload) {
        state.authFail = true;
    },
    retry(state, payload) {
        state.authFail = false;
    }
};

// actions
const actions = {
    login({ commit, state }, payload) {
        if (!state.isAuth) {
            if (payload.password === "ridgeview2018") {
                commit("login", payload);
                router.push("/map");
            } else {
                commit("fail", payload);
            }
        }
    },
    typing({ commit, state }, payload) {
        if (state.authFail) {
            commit("retry", payload);
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
