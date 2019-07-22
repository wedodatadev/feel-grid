<template>
  <v-app
    class="card-background-color"
    >

    <!-- NAVABR -->
    <Navbar>
    </Navbar>

    <!-- CONTENTS -->
    <v-content
      >
      <v-container>
        <nuxt />
      </v-container>
    </v-content>



  </v-app>
</template>

<script>

import { mapState, mapGetters, mapActions } from 'vuex'

import Navbar from '~/components/NAV-components/navbar.vue'
// import FooterCards from '~/components/NAV-components/footer-cards'

export default {

  name: "CardLayout",

  components: {
    Navbar,
    // FooterCards
  },

  props: [
  ],

  beforeMount: function() {
    console.log("L-CardLayout / beforeMount....")
  },

  data() {

    return {
      
    }

  },

  computed: {

    ...mapState({
      log : state => state.log, 
      locale : state => state.locale,
      locSelected : state => state.locSelected,
    }),

    ...mapGetters({
    }),
  },

  methods: {
  },

}
</script>
