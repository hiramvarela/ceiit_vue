<template>
    <div>
      <b-container>
        <b-row>
          <b-col></b-col>
          <b-col cols="6">
            <b-card title="Objects">
              <b-button @click="fetchAllObjects" variant="primary">Fetch All Objects</b-button>
  
              <!-- Mostrar los objetos en la vista -->
              <div v-if="objects.length">
                <h2>Lista de Objetos:</h2>
                <ul>
                  <li v-for="obj in objects" :key="obj._id">
                    <b-card :title="obj.name">
                      <p>Serial: {{ obj.numserial }}</p>
                      <p>Ubicación: {{ obj.ubicacion }}</p>
                      <p>Descripción: {{ obj.descripcion }}</p>
                      <p>Cantidad: {{ obj.cantidad }}</p>
                      <img :src = "obj.imgUrl" width=200 height="200">

                      <!-- Agrega más campos según sea necesario -->
                    </b-card>
                  </li>
                </ul>
              </div>
              
              <div v-else>
                <p>No se encontraron objetos.</p>
              </div>
              <router-link to="/addObject">Agregar Objeto</router-link>
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
    data() {
      return {
        objects: [],
      };
    },
    methods: {
      async fetchAllObjects() {
        try {
          const token = localStorage.getItem('token');
  
          // Configurar el encabezado de la solicitud con el token
          const headers = {
            Authorization: `Bearer ${token}`,
          };
  
          // Hacer la solicitud para obtener todos los objetos
          const response = await axios.get('https://tame-red-cockatoo-tie.cyclic.app/ulsa/searchObject', { headers });
  
          // Actualizar la lista de objetos en el componente
          this.objects = response.data;
        } catch (error) {
          // Manejar errores aquí
          console.error('Error al obtener todos los objetos:', error);
        }
      },
    },
  };
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
  