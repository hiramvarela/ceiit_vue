<template>
    <div id="app">
      <b-container>
        <b-row>
          <b-col></b-col>
          <b-col cols="6">
            <b-card title="Register">
              <b-form @submit="register">
  
                <b-form-group label="Nombre:">
                  <b-form-input v-model="firstName" placeholder="Enter your first name" required>
                  </b-form-input>
                </b-form-group>
  
                <b-form-group label="Apellido:">
                  <b-form-input v-model="lastName" placeholder="Enter your last name" required>
                  </b-form-input>
                </b-form-group>
  
                <b-form-group label="Matrícula:">
                  <b-form-input v-model="matricula" placeholder="Enter your matricula" required>
                  </b-form-input>
                </b-form-group>
  
                <b-form-group label="Username:">
                  <b-form-input v-model="username" placeholder="Enter your username" required>
                  </b-form-input>
                </b-form-group>
  
                <b-form-group label="Password:">
                  <b-form-input v-model="password" type="password" placeholder="Enter your password" required>
                  </b-form-input>
                </b-form-group>
  
                <b-button type="submit" variant="primary">Register</b-button>
  
              </b-form>
            </b-card>
          </b-col>
          <b-col></b-col>
        </b-row>
      </b-container>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'Register-component',
    data() {
      return {
        firstName: "",
        lastName: "",
        matricula: "",
        username: "",
        password: ""
      }
    },
    methods: {
      async register(event) {
        event.preventDefault();
        const requestBody = {
          name: this.firstName,
          surname: this.lastName,
          tuition: this.matricula,
          usrn: this.username,
          password: this.password
        }
        try {
          const serverUrl = "https://tame-red-cockatoo-tie.cyclic.app/users/registrar";
          const response = await axios.post(serverUrl, requestBody);
          console.log(response)
          alert("Registro exitoso!")
        } catch (error) {
          console.log(error)
          alert("Error en el registro")
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
  