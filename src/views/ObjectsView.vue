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
        <b-col cols="12">

          <b-card title="Lista de Objetos:">
            <div v-if="objects.length">

              <b-table striped hover :items="objects" :fields="fields">
                <template v-slot:cell(name)="data">
                  {{ data.item.name }}
                </template>
                <template v-slot:cell(numserial)="data">
                  {{ data.item.numserial }}
                </template>
                <template v-slot:cell(ubicacion)="data">
                  {{ data.item.ubicacion ? data.item.ubicacion.ubicacion : "N/a" }}
                </template>
                <template v-slot:cell(descripcion)="data">
                  {{ data.item.descripcion }}
                </template>
                <template v-slot:cell(cantidad)="data">
                  {{ data.item.cantidad }}
                </template>
                <template v-slot:cell(imgUrl)="data">
                  <img :src="data.item.imgUrl" width="150" height="150">
                </template>
                <template v-slot:cell(buttons)="data">
                  <b-icon-trash-fill @click="deleteObject(data.item.name)" class="trash-icon"></b-icon-trash-fill>
                  <router-link :to="{ name: 'editObject', query: { objectData: JSON.stringify(data.item) } }">
                    <b-icon-pencil></b-icon-pencil>
                  </router-link>
                </template>
              </b-table>

            </div>
            <div v-else class="empty-state">
              <img
                src="https://res.cloudinary.com/dzfglb0m4/image/upload/v1701209794/35f48d50910679.58dcde64b9214_meq4l3.png"
                alt="No hay objetos" class="empty-state-image">
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
      fields: [
        { key: 'name', label: 'Nombre' },
        { key: 'numserial', label: 'Serial' },
        { key: 'ubicacion', label: 'Ubicación' },
        { key: 'descripcion', label: 'Descripción' },
        { key: 'cantidad', label: 'Cantidad' },
        { key: 'imgUrl', label: 'Imagenes' },
        { key: 'buttons', label: '' }
      ],
    };
  },
  mounted() {
    this.fetchAllObjects();
  },
  async created() {
      await this.fetchProducts();
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
};
</script>

<style>
.trash-icon {
  cursor: pointer;
  color: red;
  font-size: 1.5rem;
  margin-bottom: 10px;
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
  margin-top: 20px;
  margin-left: 10px;
  margin-right: 40px;
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
