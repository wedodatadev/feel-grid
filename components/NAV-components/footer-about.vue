<template>

  <!-- FOOTER ABOUT -->
  <v-footer 
    v-show="isFirstVisit" 
    color="transparent"
    class="ma-3 pb-5"
    >

    <v-layout 
      justify-center
      >
    
      <v-btn 
        v-for="(btn, indexBtn) in footerBtns"
        round
        outline
        color="white"
        :key="indexBtn"
        @click="goToCards()"
        >
        <!-- :to="btn.to" -->
        {{ $t(btn.textCode) }}
      </v-btn>

    </v-layout>
    
  </v-footer>

</template>

<script>

import { mapState, mapGetters, mapActions } from 'vuex'

export default {

  name: "FooterAbout",

  components: {
  },

  props: [
  ],

  beforeMount: function() {
    console.log("C-FooterAbout / beforeMount....")
  },

  data() {

    return {
      footerBtns: [
        { textCode: "intro.getAnAce", to: "/cards" },
      ]
    }

  },

  computed: {

    ...mapState({
      log : state => state.log, 
      locale : state => state.locale,
      locSelected : state => state.locSelected,

      isFirstVisit : state => state.firstVisit,

    }),

    ...mapGetters({
    }),
  },

  methods: {

    goToCards() {
      console.log("C-FooterAbout / goToCards....")
      this.$store.commit('setFirstVisit', false)
      this.$router.push('/cards')
    }

  },

}
</script>
