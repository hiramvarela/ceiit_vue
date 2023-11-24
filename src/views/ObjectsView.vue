<template>
  <div>
    <b-container>
      <b-row>
        <b-col cols="6">
          <b-card title="Objects">
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
                    <b-icon-trash-fill @click="deleteObject(obj.name)" class="trash-icon"></b-icon-trash-fill>
                    <router-link :to="{ name: 'editObject', query: { objectData: JSON.stringify(obj) } }">
                      <b-icon-pencil></b-icon-pencil>
                    </router-link>
                  </b-card>
                </li>
              </ul>
            </div>
            <div v-else>
              <p>No se encontraron objetos.</p>
            </div>
            <br>
            <router-link to="/addObject" class="btn btn-secondary">Agregar objeto</router-link>
            <br>
            <router-link to="/dashboard" class="btn btn-secondary">Back</router-link>
          </b-card>
        </b-col>
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
  mounted() {
    this.fetchAllObjects();
  },
  methods: {
    async fetchAllObjects() {
      try {
        const token = localStorage.getItem('token');
        const headers = {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        };
        const response = await axios.post('https://tame-red-cockatoo-tie.cyclic.app/ulsa/searchObject', {}, {
          headers: headers
        });
        this.objects = response.data;
      } catch (error) {
        console.error('Error al obtener todos los objetos:', error);
      }
    },
    async deleteObject(name) {
      try {
        const token = localStorage.getItem('token');
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        const requestBody = {
          ob: name,
        };
        await axios.delete('https://tame-red-cockatoo-tie.cyclic.app/ulsa/deleteObject', { headers, data: requestBody });
        alert('Objeto borrado con éxito!');
        // Después de borrar el objeto, forzamos una actualización de la vista
        this.fetchAllObjects();
      } catch (error) {
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

.btn-secondary {
  color: #fff;
  background-color: #6c757d;
  border-color: #6c757d;
}

.edit-icon {
  cursor: pointer;
  color: green;
  font-size: 1.35rem;
  margin-left: 10px;
  margin-right: 20px;
}
</style>
