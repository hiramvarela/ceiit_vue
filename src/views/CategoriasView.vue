<template>
    <div>
     <h1>
        Vista catalogos
     </h1>
     
    </div>
  </template>
  
  <script>
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
          console.log(response)
          alert("Haz iniciado sesión!!")
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
  
  
  
  
  