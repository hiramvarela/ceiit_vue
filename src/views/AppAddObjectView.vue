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

<template>
    <div>
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
  
                <b-form-group label="Ubicación:">
                  <b-form-select v-model="ubi" :options="ubicaciones" required></b-form-select>
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
              <button @click="goBack">Back</button>
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
      ubi: '', // Cambiado a un campo de texto
      desc: '',
      cant: '',
      stat: false,
      qrCode: 'testQR',
      img: '',
      ubicaciones: ['Estante 1', 'Estante 2', 'Estante 3', 'Estante 4', 'Estante 5'],
      }
    },
    methods: {
        goBack() {
      this.$router.go(-1); // Go back one step in the history
    },
    
      async addObj(event) {
        event.preventDefault();
        const requestBody = {
          ob: this.objName,
          num: parseInt(this.serialNum),
          ubi: this.ubi,
          des: this.desc,
          cant: parseInt(this.cant),
          esta: this.stat,
          qr: this.qrCode,
          img: this.img
        }
        try {
            const token = localStorage.getItem('token');
            const headers = {
            Authorization: `Bearer ${token}`,
          };
          const serverUrl = "https://tame-red-cockatoo-tie.cyclic.app/ulsa/addObject";
          const response = await axios.post(serverUrl, requestBody,{headers});
          console.log(response)
          alert("Objeto agregado!")
        } catch (error) {
          console.log(error)
          alert("Error al agregar objeto")
        }
      }
    }
  }
  </script>


