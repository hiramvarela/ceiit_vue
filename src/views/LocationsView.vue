<template>
  <div>
    <div class="menu-container">
      <!-- Navegación y otros elementos del menú... -->
    </div>
    <b-container>
      <b-row>
        <b-col cols="12">
          <b-card>
            <h1 class="text-center">Lugares</h1>
            <p class="text-center">Por favor seleccione un estante</p>
            <b-form-group label="Estante:" label-cols-sm="4" label-align-sm="right" label-for="ubi-select">
              <b-form-select id="ubi-select" v-model="ubi" :options="ubicaciones" required></b-form-select>
            </b-form-group>
            <b-button @click="fetchObjByLoc" variant="primary">Buscar</b-button>

            <div v-if="fetchedObjs.length">
              <b-table striped hover :items="fetchedObjs" :fields="fields">
                <template v-slot:cell(image)="data">
                  <img :src="data.item.imgUrl" width="150" height="150" alt="Imagen del objeto">
                </template>
              </b-table>
            </div>
            <div v-else class="empty-state">
              <img src="https://res.cloudinary.com/dzfglb0m4/image/upload/v1701209794/35f48d50910679.58dcde64b9214_meq4l3.png" alt="No hay objetos en este estante" class="empty-state-image">
              <p>No se encontraron objetos en este estante.</p>
            </div>

            <router-link to="/dashboard" class="btn btn-secondary">Back</router-link>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from 'axios';
import qs from 'qs';

export default {
  name: 'Locations-component',
  data() {
    return {      
      ubicaciones: ['Estante 1', 'Estante 2', 'Estante 3', 'Estante 4', 'Estante 5'],
      ubi: '',
      fetchedObjs: [],
      fields: [
        { key: 'name', label: 'Nombre' },
        { key: 'numserial', label: 'Serial' },
        { key: 'descripcion', label: 'Descripción' },
        { key: 'cantidad', label: 'Cantidad' },
        { key: 'image', label: 'Imagen' }
      ], 
    }
  },
  methods: {
    fetchObjByLoc() {
      const token = localStorage.getItem('token');
      const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${token}`
      };

      const data = qs.stringify({
        ubi: this.ubi
      });

      axios.post('https://tame-red-cockatoo-tie.cyclic.app/ulsa/searchObject', data, {
        headers: headers
      })
      .then(response => {
        this.fetchedObjs = response.data;
        console.log(response.data);
      })
      .catch(error => {
        console.error("Error al realizar la petición: ", error);
      });
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
    background-image: url('https://www.ctifimpes.ulsachihuahua.edu.mx/images/urbanika_ulsa_1.jpg'); 
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
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
  .empty-state {
    text-align: center;
    padding: 20px;
  }
  .empty-state-image {
    width: 250px; 
    margin-bottom: 20px;
  }
</style>

  
  
  
  
  