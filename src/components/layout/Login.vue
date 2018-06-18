<template>
    <div>
        <label for="password">password</label>
        <input v-model="password" type="password" placeholder="password" id="password" name="password"/>
        <button @click="this.login">Submit</button>
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
        methods: {
            login() {
                if (this.password === "" || this.password === undefined){
                    alert("Password Empty");
                } else {
                    const payload = {
                        password: this.password
                    };
                    this.$store.dispatch("login", payload);
                    console.log(this.password);
                }
            }
        }
    };
</script>

<style scoped>

</style>
