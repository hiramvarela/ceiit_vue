<template>
  <div>
    <div class="menu-container">
      <!-- ... -->
    </div>
    <b-container>
      <b-row>
        <b-col cols="6">
          <b-card title="Edit Location">
            <b-form @submit.prevent="editLocation">
              <b-form-group label="Estante:">
                <b-form-input v-model="editableLocation.ubicacion"></b-form-input>
              </b-form-group>
              <b-button type="button" variant="primary" @click="editLocation">Guardar Cambios</b-button>
              <br>
              <router-link :to="{ name: 'Estantes' }" class="btn btn-secondary">Back</router-link>
            </b-form>
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
      editableLocation: {
        _id: '',
        ubicacion: '',
      }
    };
  },
  methods: {

    async editLocation() {
      try {
        const token = localStorage.getItem('token');
        const headers = {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        };
        const response = await axios.put(`https://tame-red-cockatoo-tie.cyclic.app/ulsa/updateLocation/${this.editableLocation._id}`, {
          ubicacion: this.editableLocation.ubicacion,
        }, { headers });
        console.log(response);
        alert("Estante actualizado con éxito!");
        this.$router.push({ name: 'Estantes' });
      } catch (error) {
        console.error("Error al actualizar el estante:", error);
        alert("Error al actualizar el estante");
      }
    },
    


    logout() {
      localStorage.removeItem('token');
      this.$router.push('/login');
    },
    handleErrorResponse(error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
      alert("Error al actualizar el estante");
    }
  },
  created() {
    const locationDataString = this.$route.query.locationData;
    if (locationDataString) {
      const locationData = JSON.parse(decodeURIComponent(locationDataString));
      this.editableLocation._id = locationData._id;
      this.editableLocation.ubicacion = locationData.ubicacion;
    }
  },

};
</script>
  
<style>
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