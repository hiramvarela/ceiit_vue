<template>
  <div>
    <b-container>
      <b-row>
        <b-col></b-col>
        <b-col cols="6">
          <b-card>
            <h1>Lugares</h1>
            <p>Por favor seleccione un estante</p>
            <b-form-group label="Estante:">
              <b-form-select v-model="ubi" :options="ubicaciones" required></b-form-select>
            </b-form-group>
            <b-button @click="fetchObjByLoc" variant="primary">Buscar</b-button>
            <div v-for="(objeto, index) in fetchedObjs" :key="index">
              <h3>{{ objeto.name }}</h3>
              <p>Serial: {{ objeto.numserial }}</p>
              <p>Descripción: {{ objeto.descripcion }}</p>
                    <p>Cantidad: {{ objeto.cantidad }}</p>
              <img :src="objeto.imgUrl" width="200" height="200"/>
            </div>
            <br>
            <router-link to="/dashboard" class="btn btn-secondary">Back</router-link>
          </b-card>
        </b-col>
        <b-col></b-col>
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
      fetchedObjs: [] // Almacenará los objetos obtenidos de la petición
    }
  },
  methods: {
    // goBack() {
    //   this.$router.go(-1); // Go back one step in the history
    // },
    
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
  </style>
  
  
  
  
  