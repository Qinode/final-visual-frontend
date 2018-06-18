const state = {
    isAuth: false
};

// mutations
const mutations = {
    login(state, payload) {
        if (payload.password === "psd") {
            state.isAuth = true;
        }
    }
};

// actions
const actions = {
    login({ commit, state }, payload) {
        if (!state.isAuth) {
            commit("login", payload);
        }
    }
};

export default {
    namespace: true,
    state,
    mutations,
    actions
};
