<template>
  <div id="item">
    <div class="row" v-if="!editar">
      <div class=" m-3">
        <div class="card">
          <div class="card-body" v-for="dato in item.data">
            <h5 class="card-title">{{ dato.prompt }}</h5>
            <p class="card-text">{{ dato.value }}</p>
          </div>
          <div class="row ">
            <button
              type="button"
              class="btn btn-primary col-2 m-4"
              @click="activaEdicion(item)"
            >
              Editar
            </button>
            <button
              type="button"
              class="btn btn-secondary col-2 m-4"
              @click="borrarElemento(item)"
            >
              Borrar
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="row" v-else>
      <form @submit.prevent="editarElemento(item)">
        <div v-for="dato in item.data">
          <div class="m-3">
            <label :for="dato.name" class="form-label"
              >{{ dato.prompt }}:</label
            >
            <input
              type="text"
              class="form-control"
              :placeholder="dato.prompt"
              :id="dato.name"
              v-model="dato.value"
              v-if="dato.type == 'text'"
              required
            />
            <input
              type="text"
              class="form-control"
              :placeholder="dato.prompt"
              :id="dato.name"
              v-model="dato.value"
              v-else-if="dato.type == 'embeddedVideo'"
              required
            />
            <textarea
              type="text"
              class="form-control"
              :placeholder="dato.prompt"
              :id="dato.name"
              v-model="dato.value"
              rows="5"
              v-else-if="dato.type == 'textarea'"
              required
            ></textarea>
            <input
              type="date"
              class="form-control"
              :placeholder="dato.prompt"
              :id="dato.name"
              v-model="dato.value"
              v-else-if="dato.type == 'date'"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          @click="activaEdicion(item)"
          class="btn btn-primary m-3"
        >
          Enviar
        </button>
        <button
          type="button"
          class="btn btn-secondary m-3"
          @click="activaEdicion(item)"
        >
          Cerrar
        </button>
      </form>
    </div>
  </div>
</template>

<script>
const urlAPI = "https://zzkr1nkz5b.execute-api.eu-west-1.amazonaws.com/latest";
export default {
  name: "item",
  props: ["item"],

  data: function() {
    return {
      editar: false,
    };
  },

  methods: {
    activaEdicion: function(item) {
      this.editar = !this.editar;
    },
    borrarElemento: async function(item) {
      var response = await fetch(urlAPI + item.href, {
        method: "DELETE",
      }).then(() => this.$emit("refrescar"));
      //this.obtenerColeccion(this.c.collection.href);
    },

    editarElemento: async function(item) {
      var response = await fetch(urlAPI + item.href, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({ template: this.item }),
      }).then(() => this.$emit("refrescar"));
      //this.obtenerColeccion(this.c.collection.href);
    },
  },
};
</script>

<style scoped></style>
