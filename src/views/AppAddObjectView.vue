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
          <b-card title="Add Object">
            <b-form @submit="addObj">

              <b-form-group label="Nombre:">
                <b-form-input v-model="objName" placeholder="Enter product name" required>
                </b-form-input>
              </b-form-group>

              <b-form-group label="Numero Serial:">
                <b-form-input v-model="serialNum" placeholder="Enter Serial Number" required>
                </b-form-input>
              </b-form-group>

              <b-form-group label="Estante:" label-cols-sm="4" label-align-sm="right" label-for="ubi-select">
                <b-form-select id="ubi-select" v-model="ubi" :options="ubicaciones" required
                  @change="readLocation"></b-form-select>
              </b-form-group>

              <b-form-group label="Descripción:">
                <b-form-textarea v-model="desc" placeholder="Enter a brief desc" required></b-form-textarea>
              </b-form-group>

              <b-form-group label="Cantidad:">
                <b-form-input v-model="cant" type="number" placeholder="Enter Quantity available" required>
                </b-form-input>
              </b-form-group>

              <b-form-group label="Image Url:">
                <b-form-input v-model="img" placeholder="Paste Image URL" required>
                </b-form-input>
              </b-form-group>

              <b-button type="submit" variant="primary">Add Object</b-button>

            </b-form>
            <router-link :to="{ name: 'Objetos' }" class="btn btn-secondary">Back</router-link>
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
  name: 'AddObj-component',
  data() {
    return {
      objName: '',
      serialNum: '',
      ubi: null,
      desc: '',
      cant: '',
      stat: false,
      qrCode: 'testQR',
      img: '',
      ubicaciones: [],
    }
  },
  mounted() {
    this.readLocation(); // Cargar ubicaciones al montar el componente
  },
  methods: {
    goBack() {
      this.$router.go(-1); // Go back one step in the history
    },

    async addObj(event) {
      event.preventDefault(); // Prevenir la recarga de la página por el evento de submit

      // Imprime el ObjectId seleccionado para depurar
      console.log('Selected Location ID:', this.ubi);

      // Construir el cuerpo de la solicitud
      const requestBody = {
        ob: this.objName,
        num: this.serialNum,
        ubi: this.ubi, // Aquí se usa el ObjectId seleccionado directamente
        des: this.desc,
        cant: this.cant,
        img: this.img
      };

      try {
        const token = localStorage.getItem('token');
        const headers = {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        };
        const serverUrl = "https://tame-red-cockatoo-tie.cyclic.app/ulsa/addObject";
        const response = await axios.post(serverUrl, requestBody, { headers });
        console.log('Response:', response);
        alert("Objeto agregado!");
      } catch (error) {
        console.error('Error:', error.response.data); // Mostrar la respuesta del error del servidor
        alert("Error al agregar objeto: " + (error.response.data.message || error.message));
      }
    },
    async readLocation() {
      try {
        const token = localStorage.getItem('token');
        const headers = {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        };
        const response = await axios.post('https://tame-red-cockatoo-tie.cyclic.app/ulsa/readLocation', {}, { headers });

        // Transformar los datos para el b-form-select
        this.ubicaciones = response.data.map(location => {
          return { text: location.ubicacion, value: location._id }; // Cambia 'value' para que sea el ObjectId
        });
      } catch (error) {
        console.error('Error al obtener todos los objetos:', error);
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
