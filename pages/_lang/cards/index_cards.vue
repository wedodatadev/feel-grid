<template>

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
// import BasicTable from '~/components/DATA-components/basic-table'

import ArrayShuffler from '~/utils/shuffler.js'

export default {

  name: "CardsPage",

  layout : "cardLayout",

  components: {
    // BasicTable,
    GameCardsStack
  },

  middleware : [
  ],

  props: [
  ],

  beforeMount : function(){

    console.log("P-CardsPage / beforeMount....")
    let allCards = this.getConcatenatedDatasets('datasets')

    // randomize stack
    let randomizedCards = ArrayShuffler( allCards )

    // set data stack locally
    // this.allCards = allCards
    this.allCards = randomizedCards
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


<style scoped>
</style>
