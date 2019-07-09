<template>

  <!-- FOOTER INDEX -->
  <v-footer 
    color="transparent"
    class="ma-4 pb-2"
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

</template>

<script>

import { mapState, mapGetters, mapActions } from 'vuex'

export default {

  name: "FooterCards",

  components: {
  },

  props: [
  ],

  beforeMount: function() {
    console.log("C-FooterCards / beforeMount....")
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
