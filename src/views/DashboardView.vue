<template>
    <div>
        <b-sidebar visible id="sidebar-1" title="Catalogos" shadow>
            <h1>
                Ventanas de catalogos
            </h1>
            <ul>
                <li>
                    <router-link :to = "{name: 'Estantes'}">
                        Catalogo de Estantes
                    </router-link>

                </li>
                <li>
                    <router-link :to = "{name: 'Objetos'}">
                        Catalogo de objetos
                    </router-link>
                </li>
                   
                
            </ul>
        </b-sidebar>
        <router-view></router-view>
    </div>
</template>
 
<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    background-image: url('https://www.ctifimpes.ulsachihuahua.edu.mx/images/urbanika_ulsa_1.jpg'); 
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
  
  
  
  
  