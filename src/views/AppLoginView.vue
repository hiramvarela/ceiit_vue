<template>
  <div>
    <b-container>
      <b-row>
        <b-col></b-col>
        <b-col cols="6">
          <b-card title="Login">
            <b-form @submit="login">
              <b-form-group label="Username:">
                <b-form-input v-model="username" placeholder="Enter your username" required>
                </b-form-input>
              </b-form-group>

              <b-form-group label="Password:">
                <b-form-input v-model="pass" type="password" placeholder="Enter your password" required>
                </b-form-input>
              </b-form-group>


              <b-button type="submit" variant="primary">Login</b-button>

            </b-form>
            <router-link to="/register">Register</router-link>
          </b-card>

        </b-col>
        <b-col></b-col>
      </b-row>
    </b-container>    
   
  </div>
</template>

<script>
// import router from '@/router';
import axios from 'axios';

export default {
  name: 'App',
  components: {

  },
  data() {
    return {
      username: "",
      pass: ""
    }
  },
  methods: {
    async login(event) {
     
      event.preventDefault();
      const requestBody = {
        usrn: this.username,
        password: this.pass
      }
      try {
        const serverUrl = "https://tame-red-cockatoo-tie.cyclic.app/users/iniciar_sesion";
        const response = await axios.post(serverUrl, requestBody);
        
        if(response && response.data && response.data.token){
          localStorage.setItem("token", response.data.token)
          this.$router.push ({path : "/dashboard"})
        }else{
          alert("Login erroneo")
        }
      } catch (error) {
        console.log(error)
        alert("Inicio de sesion erroneo")
      }
      
    }

  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>




