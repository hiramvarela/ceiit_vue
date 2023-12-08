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
          <b-card title="Search user">
            <b-form @submit.prevent="searchUsers">
              <b-form-group label="Matricula:">
                <b-form-input v-model="tuition" placeholder="Enter tuition" required></b-form-input>
              </b-form-group>
              <b-button type="submit" variant="primary">Buscar usuario</b-button>
            </b-form>
            <div v-if="fetchedTuition.length">
              <b-table striped hover :items="fetchedTuition" :fields="tuitionFields"></b-table>
            </div>
            <div v-if="objectDetails.name">
              <h3>Detalles del Objeto Seleccionado:</h3>
              <b-table striped hover :items="[objectDetails]" :fields="objectFields">
                <template v-slot:cell(imgUrl)="data">
                  <img :src="data.value" alt="Object Image" style="width: 60px; height: 60px;">
                </template>
              </b-table>
            </div>
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
      tuition: '',
      fetchedTuition: [],
      objectDetails: {
        name: '',
        descripcion: '',
        imgUrl: ''
      },
      tuitionFields: [
        { key: 'name', label: 'Nombre' },
        { key: 'surname', label: 'Apellido' },
        { key: 'tuition', label: 'Matricula' },
      ],
      objectFields: [
        { key: 'name', label: 'Nombre' },
        { key: 'descripcion', label: 'Descripción' },
        { key: 'imgUrl', label: 'Imagen' },
      ],
    };
  },
  created() {
    // Asignar los datos del objeto a objectDetails basado en la URL
    this.objectDetails.name = this.$route.query.name || '';
    this.objectDetails.descripcion = this.$route.query.descripcion || '';
    this.objectDetails.imgUrl = this.$route.query.imgUrl || '';
  },
  methods: {
    async searchUsers() {
      const requestBody = {
        tuition: this.tuition
      };
      try {
        const token = localStorage.getItem('token');
        const headers = {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        };
        const serverUrl = "https://tame-red-cockatoo-tie.cyclic.app/users/buscarUsuario";
        const response = await axios.post(serverUrl, requestBody, { headers });
        this.fetchedTuition = response.data.usuarios; // Asegúrate de que esta clave corresponda a la estructura de tu respuesta
      } catch (error) {
        console.error(error);
        alert("Error al buscar usuario");
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
/* Add your CSS styles here */
.error {
  color: red;
}
</style>
