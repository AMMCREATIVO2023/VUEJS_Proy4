<template>
  <div id="app" class="container">
    <header>
      <div
        class="jumbotron jumbotron-fluid bg-dark bg-gradienty text-white p-3"
      >
        <div class="container">
          <h1 class="display-3">Cliente Biblioteca Multimedia</h1>
          <p class="lead">
            Selecciona tu busqueda.
          </p>
        </div>
      </div>

      <!-- TODO: collection title -->
    </header>

    <main>
      <!-- TODO: Plantilla de la aplicación -->
      <h1>{{ c.collection.title }}</h1>
      <a
        class="btn btn-primary m-4"
        role="button"
        :href="link.href"
        v-for="link in c.collection.links"
        @click.prevent="obtenerColeccion(link.href)"
      >
        {{ link.prompt }}
      </a>
      <hr />

      <item
        :item="item"
        v-for="item in c.collection.items"
        :key="item.name"
        @refrescar="obtenerColeccion(c.collection.href)"
      >
      </item>

      <!-- Añadir elementos -->
      <hr />
      <div class="container">
        <div class="abs-center">
          <h1 class="display-5">Introduzca un nuevo elemento</h1>
          <form
            v-if="c.collection.template && c.collection.template.data"
            @submit.prevent="crearElemento()"
          >
            <div v-for="dato in c.collection.template.data">
              <div class="mb-3">
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
            <button type="submit" class="btn btn-primary mb-3">
              Enviar
            </button>
          </form>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import item from "./components/item.vue";
const urlAPI = "https://zzkr1nkz5b.execute-api.eu-west-1.amazonaws.com/latest";
export default {
  name: "App",
  components: {
    item,
    // TODO: Añadir componentes si se van a utilizar
  },
  created: function() {
    // TODO: Inicialización: se ejecuta al crear el componente
    // Cuando se carga la aplicación, se conecta al punto de entrade de la API, '/'
    this.obtenerColeccion(window.location.pathname);
  },
  data: function() {
    return {
      c: null,
      // TODO: variables de datos
      // Como mínimo debe haber una variable para almacenar el objeto 'collection' que se esté procesando
    };
  },
  methods: {
    // TODO: Métodos
    obtenerColeccion: async function(url) {
      var response = await fetch(urlAPI + url);
      this.c = await response.json();
      history.pushState(null, "", url);
    },
    crearElemento: async function() {
      var response = await fetch(urlAPI + this.c.collection.href, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({ template: this.c.collection.template }),
      });
      this.obtenerColeccion(this.c.collection.href);
    },
  },
};
</script>

<style scope></style>
