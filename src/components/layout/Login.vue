<template>
    <div>
        <label for="password">password</label>
        <input v-model="password" @keyup.enter="login" @focus="onFocus" type="password" placeholder="password" id="password" name="password"/>
        <button @click="this.login">Submit</button>
        <p v-if="authFail">Wrong Password</p>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                password: ""
            };
        },
        computed: {
            authFail() {
                return this.$store.getters.authFail;
            }
        },
        methods: {
            blur() {
                const element = document.querySelector(":focus");
                if (element) { element.blur(); }
            },
            login() {
                this.blur();
                if (this.password === "" || this.password === undefined){
                    alert("Password Empty");
                } else {
                    const payload = {
                        password: this.password
                    };
                    this.$store.dispatch("login", payload);
                }
            },
            onFocus() {
                this.$store.dispatch("typing", {});
            }
        }
    };
</script>

<style scoped>

</style>
