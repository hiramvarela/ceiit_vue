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
        <b-col cols="6">
          <b-card title="Objects">

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
            <div v-else class="empty-state">
              <img src="https://res.cloudinary.com/dzfglb0m4/image/upload/v1701209794/35f48d50910679.58dcde64b9214_meq4l3.png" alt="No hay objetos" class="empty-state-image">
              <p>No se encontraron objetos. <router-link to="/addObject">Agregar un nuevo objeto</router-link> para
                comenzar.</p>
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
        const response = await axios.post('https://tame-red-cockatoo-tie.cyclic.app/ulsa/searchObject', {}, { headers });
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
        this.fetchAllObjects();
      } catch (error) {
        console.error('Error al borrar objeto:', error);
      }
    },
    logout() {
      localStorage.removeItem('token');
      this.$router.push('/login');
    }
  }
};
</script>

<style>
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
  width: 150px;
  margin-bottom: 20px;
}
</style>
