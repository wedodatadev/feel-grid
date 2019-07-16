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

    <!-- FOOTER CARDS -->
    <FooterCards
      >
    </FooterCards>


  </v-app>
</template>

<script>

import { mapState, mapGetters, mapActions } from 'vuex'

import Navbar from '~/components/NAV-components/navbar.vue'
import FooterCards from '~/components/NAV-components/footer-cards'

export default {

  name: "CardLayout",

  components: {
    Navbar,
    FooterCards
  },

  props: [
  ],

  beforeMount: function() {
    console.log("L-CardLayout / beforeMount....")
  },

  data() {

    return {
      footerBtnsLeft: [
        { textCode: "twitter", icon: "fab fa-twitter", to: "/about" },
        { textCode: "facebook", icon: "fab fa-facebook", to: "/credits" },
        { textCode: "screenshot", icon: "fas fa-camera", to: "/credits" },
      ],

      footerBtnsRight : [
        { textCode: "favorite", icon: "favorite", to: "/favorites" },
      ]
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
