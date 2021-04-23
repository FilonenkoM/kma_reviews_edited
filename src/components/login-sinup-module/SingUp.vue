<template>
    <b-card class="mt-4" bg-variant="light">
        <b-form v-on:submit="submitSingUp" v-on:cancel="cancelSingUp">
            <h4 class="text-center">Реєстрація</h4>
            <div class="mt-3">
                <label>Логін: </label>
                <b-input
                        required
                        id="input_login"
                        v-model="login"
                        type="text"
                        placeholder="Введіть логін"/>
            </div>
            <div class="mt-3">
                <label>Email: </label>
                <b-input
                        required
                        id="input_login"
                        v-model="email"
                        :state="emailState()"
                        type="text"
                        placeholder="Введіть логін"/>
            </div>
            <div class="mt-3">
                <label>Пароль: </label>
                <b-input-group>
                    <b-input
                            required
                            id="input_login"
                            v-model="password"
                            :type="password_type"
                            placeholder="Введіть пароль">
                    </b-input>
                    <b-input-group-append><b-button variant="outline-secondary" @click="showPassword()"><b-icon :icon="eyeType" /></b-button></b-input-group-append>
                </b-input-group>
            </div>
            <div class="d-flex justify-content-around mt-4">
                <b-button type="submit" style="width: 125px" variant="primary">Реєстрація</b-button>
                <b-button type="cancel" style="width: 125px" variant="info">Скасувати</b-button>
            </div>
        </b-form>
        <div class="text-center mt-4"><router-link to="/login">Вже зареєстровані? Вхід</router-link></div>
    </b-card>
</template>

<script>
    import md5 from "md5";

    export default {
        name: "SingUp",
        methods:{
            submitSingUp(){
                let credentials = {
                    email: this.login,
                    password: md5(this.password)
                }
                this.$store.dispatch("auth/signUp", credentials)
            },
            cancelSingUp(){
                this.password = '';
                this.login = '';
                this.email = '';
                this.$router.push('/');
            },
            emailState(){
                let reg=  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/;
                if(this.email.length===0) return null;
                if (!this.email) return null;
                return (this.email === "") ? null : (reg.test(this.email))
            },
            showPassword(){
                if(this.password_type === 'password'){
                    this.eyeType = this.showPasswordIcon;
                    this.password_type = 'text';
                } else {
                    this.eyeType = this.hidePasswordIcon;
                    this.password_type = 'password';
                }
            }
        },
        data(){
            return{
                hidePasswordIcon: 'eye',
                showPasswordIcon: 'eye-fill',
                eyeType: 'eye',
                password_type: 'password',
                password: '',
                login: '',
                email: '',

            }
        }
    }
</script>

<style scoped>

</style>