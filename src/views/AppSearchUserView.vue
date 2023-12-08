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
        <b-col cols="12">
          <b-card title="Search user">
            <b-form @submit.prevent="searchUsers">
              <b-form-group label="Matricula:">
                <b-form-input v-model="tuition" placeholder="Enter tuition" required></b-form-input>
              </b-form-group>
              <b-button type="submit" variant="primary">Buscar usuario</b-button>
            </b-form>
            <div v-if="fetchedTuition.length">
              <b-table striped hover :items="fetchedTuition" :fields="tuitionFields">

              </b-table>

            </div>
            <div v-if="objectDetails.name">
              <h3>Detalles del Objeto Seleccionado:</h3>
              <b-table striped hover :items="[objectDetails]" :fields="objectFields">
                <template v-slot:cell(imgUrl)="data">
                  <img :src="data.value" alt="Object Image" style="width: 60px; height: 60px;">
                </template>
              </b-table>
              <!-- Botón para realizar el préstamo, que lleva a la pantalla de préstamo -->
              <b-button @click="makeLoan" variant="primary">Make Loan</b-button>
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
      selectedUser: null, // Agregar esta línea
      objectDetails: {
        _id: '',
        name: '',
        descripcion: '',
        imgUrl: '',

      },
      tuitionFields: [
        { key: 'name', label: 'Nombre' },
        { key: 'surname', label: 'Apellido' },
        { key: 'tuition', label: 'Matricula' },
      ],
      objectFields: [
        { key: '_id', label: '_id' },
        { key: 'name', label: 'Nombre' },
        { key: 'descripcion', label: 'Descripción' },
        { key: 'imgUrl', label: 'Imagen' },

      ],
    };
  },
  created() {
    // Now _id should be available in the query parameters
    this.objectDetails._id = this.$route.query._id || '';
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
        this.fetchedTuition = response.data.usuarios;
        console.log(this.fetchedTuition); // Agregamos esto para depurar
        if (this.fetchedTuition.length > 0) {
          this.selectedUser = this.fetchedTuition[0]; // Seleccionamos el primer usuario
          console.log('Usuario seleccionado:', this.selectedUser); // Depuración para el usuario seleccionado
        } else {
          alert("No se encontraron usuarios.");
        }
      } catch (error) {
        console.error(error);
        alert("Error al buscar usuario");
      }
    },
    logout() {
      localStorage.removeItem('token');
      this.$router.push('/login');
    },


    makeLoan() {
      console.log('Usuario seleccionado del metodo searchUsers:', this.selectedUser);
      console.log('Detalles del objeto:', this.objectDetails);


      // Usa el _id del usuario seleccionado
      const userId = this.selectedUser._id;

      // Asegúrate de que los detalles del objeto también están presentes

      // Usa el _id del objeto seleccionado
      const objectId = this.objectDetails._id;
      const currentDate = new Date().toISOString();

      const token = localStorage.getItem('token');
      const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      };

      // Prepara los datos para el préstamo
      const loanData = {
        tuitionId: userId,
        objectId: objectId,
        date: currentDate
      };

      // Asegúrate de que la URL aquí coincide con la definida en tu backend
      axios.post('https://tame-red-cockatoo-tie.cyclic.app/ulsa/loanObject', loanData, { headers })
        .then(response => {
          alert('Préstamo realizado con éxito.');
          console.log('Préstamo creado:', response.data);
        })
        .catch(error => {
          alert('Error al realizar el préstamo. Por favor, intente de nuevo.');
          console.error('Error al crear el préstamo:', error);
        });
    },
  }
};
</script>
  
<style>
/* Add your CSS styles here */
.error {
  color: red;
}
</style>
