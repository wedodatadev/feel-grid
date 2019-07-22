<template>
  <v-app
    >
    <!-- class="splashscreen-gradient" -->

    <!-- NAVBAR & DRAWERS-->
<!--     <Navbar>
    </Navbar> -->

    <!-- CONTENTS -->
    <v-content>
      <v-container fill-height>
        <nuxt />
      </v-container>
    </v-content>

    <!-- FOOTER INDEX -->
<!--     <FooterIndex>
    </FooterIndex> -->

  </v-app>
</template>

<script>

import { mapState, mapGetters, mapActions } from 'vuex'

import Navbar from '~/components/NAV-components/navbar.vue'
import FooterIndex from '~/components/NAV-components/footer-index.vue'

export default {

  name: "DefaultLayout",

  components: {
    Navbar,
    FooterIndex
  },

  props: [
  ],

  beforeMount: function() {
    console.log("L-default / beforeMount....")
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
