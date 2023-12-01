<template>
    <div>
      <div class="menu-container">
            <b-nav>
                <b-nav-item-dropdown text="Perfil" right>
                    <b-dropdown-item @click="logout">Cerrar Sesión</b-dropdown-item>
                </b-nav-item-dropdown>
            </b-nav>
        </div>
      <b-container>
        <b-row>
          <b-col></b-col>
          <b-col cols="6">
            <b-card title="Add Location">
              <b-form @submit="addObj">
  
                <b-form-group label="Estante:">
                  <b-form-input v-model="objName" placeholder="Enter location" required>
                  </b-form-input>
                </b-form-group>
  
                
  
                <b-button type="submit" variant="primary">Add Location</b-button>
  
              </b-form>
              <router-link :to = "{name: 'Estantes'}" class="btn btn-secondary">Back</router-link>
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
    name: 'AddLocation-component',
    data() {
      return {
        
      ubi: ''
      }
    },
    methods: {
        goBack() {
      this.$router.go(-1); // Go back one step in the history
    },
    
      async addLocation(event) {
        event.preventDefault();
        const requestBody = {
          ubi: this.ubi 
          
        }
        try {
            const token = localStorage.getItem('token');
            const headers = {
            Authorization: `Bearer ${token}`,
          };
          const serverUrl = "https://tame-red-cockatoo-tie.cyclic.app/ulsa/addObject";
          const response = await axios.post(serverUrl, requestBody,{headers});
          console.log(response)
          alert("Estante agregado!")
        } catch (error) {
          console.log(error)
          alert("Error al agregar el estante")
        }
      },
      logout() {
            localStorage.removeItem('token');
            this.$router.push('/login');
        }
    }
  }
  </script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-image: url('https://www.ctifimpes.ulsachihuahua.edu.mx/images/urbanika_ulsa_1.jpg'); 
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.btn-secondary {
  color: #fff;
  background-color: #6c757d;
  border-color: #6c757d;
}
.menu-container {
    position: absolute;
    right: 0;
    top: 0;
    z-index: 1000;
    padding: 10px;
    background-color: white;
}
</style>
