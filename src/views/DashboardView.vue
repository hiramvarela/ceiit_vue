<template>
    <div>
        <b-sidebar visible id="sidebar-1" title="Catalogos" shadow>
            <h1>
                Ventanas de catalogos
            </h1>
            <ul>
                <li>
                    <router-link to = "dashboard/categorias">
                        Catalogo de categorias
                    </router-link>
                </li>
            </ul>
        </b-sidebar>
        <router-view></router-view>
    </div>
</template>
  
<script>
import axios from 'axios';

export default {
    name: 'App',
    components: {

    },
    data() {
        return {
            username: "",
            pass: ""
        }
    },
    methods: {
        async login(event) {

            event.preventDefault();
            const requestBody = {
                usrn: this.username,
                password: this.pass
            }
            try {
                const serverUrl = "https://tame-red-cockatoo-tie.cyclic.app/users/iniciar_sesion";
                const response = await axios.post(serverUrl, requestBody);
                console.log(response)
                alert("Haz iniciado sesión!!")
            } catch (error) {
                console.log(error)
                alert("Inicio de sesion erroneo")
            }

        }

    }
}
</script>
  
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
  
  
  
  
  