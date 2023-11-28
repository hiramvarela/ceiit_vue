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
                <b-col cols="6">
                    <b-card title="Edit Object">
                        <b-form @submit.prevent="editObject">
                            <!-- Formulario para editar el objeto -->
                            <b-form-group label="Nombre:">
                                <b-form-input v-model="editableObject.name" required></b-form-input>
                            </b-form-group>
                            <b-form-group label="Número Serial:">
                                <b-form-input v-model="editableObject.numserial" required></b-form-input>
                            </b-form-group>
                            <b-form-group label="Ubicación:">
                                <b-form-select v-model="editableObject.ubicacion" :options="ubicaciones"></b-form-select>
                            </b-form-group>
                            <b-form-group label="Descripción:">
                                <b-form-textarea v-model="editableObject.descripcion" rows="3"></b-form-textarea>
                            </b-form-group>
                            <b-form-group label="Cantidad:">
                                <b-form-input v-model="editableObject.cantidad" type="number" required></b-form-input>
                            </b-form-group>
                            <b-button type="submit" variant="primary">Guardar Cambios</b-button>
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
            editableObject: {
                name: '',
                numserial: '',
                ubicacion: '',
                descripcion: '',
                cantidad: '',
                imgUrl: '',
            },
            ubicaciones: ['Estante 1', 'Estante 2', 'Estante 3', 'Estante 4', 'Estante 5']
        };
    },
    methods: {
        async editObject() {
            try {
                const token = localStorage.getItem('token');
                const headers = {
                    Authorization: `Bearer ${token}`,
                };
                const requestBody = {
                    ob: this.editableObject.name,
                    num: this.editableObject.numserial,
                    ubi: this.editableObject.ubicacion,
                    des: this.editableObject.descripcion,
                    cant: this.editableObject.cantidad,
                };
                const response = await axios.put('https://tame-red-cockatoo-tie.cyclic.app/ulsa/updateObject', requestBody, { headers });
                console.log(response);
                alert("Objeto actualizado con éxito!");
                this.$router.push({ name: 'Objetos' });
            } catch (error) {
                console.error("Error al actualizar el objeto:", error);
                alert("Error al actualizar el objeto");
            }
        },
        logout() {
            localStorage.removeItem('token');
            this.$router.push('/login');
        }
    },
    created() {
        const objectDataString = this.$route.query.objectData;
        if (objectDataString) {
            this.editableObject = JSON.parse(objectDataString);
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