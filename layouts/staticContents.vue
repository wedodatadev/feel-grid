<template>
  <v-app>

    <!-- NAVBAR & DRAWERS-->
    <Navbar>
    </Navbar>

    <v-layout fill-height>

      <!-- CONTENTS -->
      <v-content>
        <v-container fill-height>
          <nuxt />
        </v-container>
      </v-content>

    </v-layout>

    <!-- FOOTER CONTENTS -->
    <FooterAbout/>

  </v-app>
</template>

<script>

import { mapState, mapGetters, mapActions } from 'vuex'

import Navbar from '~/components/NAV-components/navbar.vue'
import FooterAbout from '~/components/NAV-components/footer-about'

export default {

  name: "staticContents",

  components: {
    Navbar,
    FooterAbout
  },

  props: [
  ],

  beforeMount: function() {
    console.log("L-staticContents / beforeMount....")
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
