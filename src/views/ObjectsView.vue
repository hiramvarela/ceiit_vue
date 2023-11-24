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
                    <img :src="obj.imgUrl" width="200" height="200">
                    <b-icon-trash-fill @click="deleteObject(obj._id)" class="trash-icon"></b-icon-trash-fill>
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
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    };

    // Hacer la solicitud para obtener todos los objetos
    // Si el backend espera un cuerpo vacío, envía un objeto vacío o el cuerpo apropiado
    const response = await axios.post('https://tame-red-cockatoo-tie.cyclic.app/ulsa/searchObject', {}, {
      headers: headers
    });

    // Actualizar la lista de objetos en el componente
    this.objects = response.data;
  } catch (error) {
    // Manejar errores aquí
    console.error('Error al obtener todos los objetos:', error);
  }
},


    async deleteObject(objectId) {
      try {
        const token = localStorage.getItem('token');
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        const requestBody = {
          ob: objectId,
        };

        await axios.delete('https://tame-red-cockatoo-tie.cyclic.app/ulsa/deleteObject', { headers, data: requestBody });
        alert('Objeto borrado con éxito!');

        // Fetch all objects again after deletion
        this.fetchAllObjects();
      } catch (error) {
        // Handle errors here
        console.error('Error al borrar objeto:', error);
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
  background-image: url('https://www.ctifimpes.ulsachihuahua.edu.mx/images/urbanika_ulsa_1.jpg'); 
  color: #2c3e50;
  margin-top: 60px;
}

.trash-icon {
  cursor: pointer;
  color: red;
  font-size: 1.5rem;
  margin-left: 10px;
}
</style>
