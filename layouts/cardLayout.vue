<template>
  <v-app>

    <!-- NAVABR -->
    <Navbar>
    </Navbar>

    <!-- DRAWER RIGHT -->

    <!-- DRAWER LEFT -->

    <!-- CONTENTS -->
    <v-content>
      <v-container fill-height>
        <nuxt />
      </v-container>
    </v-content>

    <!-- FOOTER INDEX -->
    <v-footer 
      color="transparent"
      class="ma-3 pb-5"
      >
      
        <v-btn 
          v-for="(btn, indexBtn) in footerBtnsLeft"
          :key="indexBtn"
          :to="btn.to"
          icon
          outline
          color="primary"
          >
          <v-icon>
            {{ btn.icon }}
          </v-icon>
        </v-btn>

        <v-spacer></v-spacer>

        <v-btn 
          v-for="(btn, indexBtn) in footerBtnsRight"
          :key="indexBtn"
          :to="btn.to"
          icon
          outline
          color="primary"
          >
          <v-icon>
            {{ btn.icon }}
          </v-icon>
        </v-btn>


    </v-footer>

  </v-app>
</template>

<script>

import { mapState, mapGetters, mapActions } from 'vuex'

import Navbar from '~/components/UX-components/navbar.vue'

export default {

  name: "DefaultLayout",

  components: {
    Navbar,
  },

  props: [
  ],

  beforeMount: function() {
    console.log("L-default / beforeMount....")
  //   this.$vuetify.theme.primary = '#1b5632';
  //   this.$vuetify.theme.secondary = '#6AAB84';
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
