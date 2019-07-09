<style>

  .skip-navbar-more{
    margin-top: 75px;
  }

</style>


<template>

  <!-- :cards="visibleCards" -->
  <GameCardsStack
    :cards="allCards"
    @cardAccepted="handleCardAccepted"
    @cardRejected="handleCardRejected"
    @cardSkipped="handleCardSkipped"
    @hideCard="removeCardFromDeck"
  />

</template>


<script>

import { mapState, mapGetters, mapActions } from 'vuex'

import GameCardsStack from '~/components/UX-components/GameCardsStack'

export default {

  name: "CardPage",

  layout : "cardLayout",

  components: {
    GameCardsStack
  },

  middleware : [
  ],

  props: [
  ],

  beforeMount : function(){
    console.log("P-CardPage / beforeMount....")
    let allCards = this.getConcatenatedDatasets('datasets')

    // randomize stack


    // set data stack locally
    this.allCards = allCards

  },

  data() {
    return {
      // visibleCards: ["Test", "Vue.js", "Webpack"],
      allCards: undefined
    }
  },

  computed: {

    ...mapState({

      log : state => state.log, 

      locale : state => state.locale,
      locales : state => state.locales,
      defaultLocale : state => state.defaultLocale,

      datasets : state => state.data.datasets,
      correspondanceDicts : state => state.data.correspondanceDicts,
      dataTypes : state => state.data.dataTypes,



    }),

    ...mapGetters({

      getConcatenatedDatasets : 'data/getConcatenatedDatasets'
    }),
  },

  methods: {


    handleCardAccepted() {
      console.log("handleCardAccepted");
    },
    handleCardRejected() {
      console.log("handleCardRejected");
    },
    handleCardSkipped() {
      console.log("handleCardSkipped");
    },
    removeCardFromDeck() {
      this.visibleCards.shift();
    }
    
  },

}
</script>
