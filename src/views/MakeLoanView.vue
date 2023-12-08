<template>
  <div>
    <b-container>
      <b-row>
        <b-col></b-col>
        <b-col cols="6">
          <b-card title="Search Results">
            <b-form @submit.prevent="searchObject">
              <b-form-group label="Search Object:">
                <b-form-input v-model="searchTerm" placeholder="Type Object name" required></b-form-input>
              </b-form-group>
              <b-button type="submit" variant="primary">Search</b-button>
            </b-form>
            <b-list-group>
              <b-list-group-item v-for="(result, index) in results" :key="index"
                :class="{ 'list-group-item-success': result.status, 'list-group-item-danger': !result.status }">
                <div class="media">
                  <img :src="result.imgUrl" class="mr-3" alt="Object Image" style="width: 60px; height: 60px;">
                  <div class="media-body">
                    <h5 class="mt-0">{{ result.name }}</h5>
                    <p>{{ result.descripcion }}</p>
                    <b-badge v-if="result.status" variant="success">Available</b-badge>
                    <b-badge v-else variant="danger">Unavailable</b-badge>
                    <router-link v-if="result.status" :to="{
                      name: 'addUser',
                      query: {
                        _id: result._id, // Add _id here
                        name: result.name,
                        descripcion: result.descripcion,
                        imgUrl: result.imgUrl
                      }
                    }" tag="button" class="btn btn-secondary">Make Loan
                    </router-link>
                  </div>
                </div>
              </b-list-group-item>
            </b-list-group>
            <p v-if="error" class="text-danger">{{ error }}</p>
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
  name: 'SearchComponent',
  data() {
    return {
      searchTerm: '',
      results: [],
      error: ''
    };
  },
  methods: {
    async searchObject() {
      try {
        const token = localStorage.getItem('token');
        const headers = {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        };
        const response = await axios.post('https://tame-red-cockatoo-tie.cyclic.app/ulsa/searchByName', { name: this.searchTerm }, { headers });
        this.results = response.data;
        this.error = '';
      } catch (err) {
        this.error = 'An error occurred while searching.';
        this.results = [];
      }
    }
  }
};
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

.list-group-item-success {
  background-color: #d4edda;
  /* Light green background for available items */
}

.list-group-item-danger {
  background-color: #f8d7da;
  /* Light red background for unavailable items */
}

.media {
  display: flex;
  align-items: center;
}

.media-body {
  flex: 1;
}
</style>
  