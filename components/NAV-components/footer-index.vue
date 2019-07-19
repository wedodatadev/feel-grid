<template>

  <!-- FOOTER INDEX -->
  <v-footer 
    v-show="locSelected" 
    color="transparent"
    class="ma-3 pb-5"
    >

    <v-layout 
      justify-center
      >
    
      <v-btn 
        v-for="(btn, indexBtn) in footerBtns"
        round
        class="btn-gradient white--text"
        :key="indexBtn"
        :to="btn.to"
        >
        <!-- color="white" -->
        <!-- outline -->
        {{ $t('links.' + btn.textCode) }}
      </v-btn>

    </v-layout>
    
  </v-footer>

</template>

<script>

import { mapState, mapGetters, mapActions } from 'vuex'

export default {

  name: "FooterIndex",

  components: {
  },

  props: [
  ],

  beforeMount: function() {
    console.log("C-FooterIndex / beforeMount....")
  },

  data() {

    return {
      footerBtns: [
        { textCode: "about", to: "/about" },
        { textCode: "credits", to: "/credits" },
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
