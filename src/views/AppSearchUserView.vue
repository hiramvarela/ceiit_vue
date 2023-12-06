<template>
    <div>
      <div>
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="searchParams.name" />
      </div>
      <div>
        <label for="surname">Surname:</label>
        <input type="text" id="surname" v-model="searchParams.surname" />
      </div>
      <div>
        <label for="tuition">Tuition:</label>
        <input type="text" id="tuition" v-model="searchParams.tuition" />
      </div>
      <div>
        <button @click="searchUsers">Search</button>
      </div>
      <div v-if="error" class="error">{{ error }}</div>
      <table v-if="users.length > 0">
        <thead>
          <tr>
            <th>Name</th>
            <th>Surname</th>
            <th>Tuition</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in users" :key="index">
            <td>{{ user.name }}</td>
            <td>{{ user.surname }}</td>
            <td>{{ user.tuition }}</td>
          </tr>
        </tbody>
      </table>
      <div v-else-if="searchPerformed">No users found.</div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        searchParams: {
          name: '',
          surname: '',
          tuition: ''
        },
        users: [],
        error: '',
        searchPerformed: false
      };
    },
    methods: {
      async searchUsers() {
        // Validate that only one search parameter is provided
        const providedParams = Object.values(this.searchParams).filter(param => param !== '');
        if (providedParams.length !== 1) {
          this.error = 'Please provide exactly one search parameter (name, surname, or tuition).';
          this.users = [];
          this.searchPerformed = false;
          return;
        }
  
        try {
          const token = localStorage.getItem('token');
          const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          };
          const response = await fetch('https://tame-red-cockatoo-tie.cyclic.app/users/buscarUsuario', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(this.searchParams)
          });
  
          if (response.status === 200) {
            this.error = '';
            this.users = await response.json();
            this.searchPerformed = true;
          } else if (response.status === 404) {
            this.error = 'No users found.';
            this.users = [];
            this.searchPerformed = true;
          } else {
            this.error = 'An error occurred while searching for users.';
            this.users = [];
            this.searchPerformed = false;
          }
        } catch (error) {
          console.error(error);
          this.error = 'An error occurred while searching for users.';
          this.users = [];
          this.searchPerformed = false;
        }
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
