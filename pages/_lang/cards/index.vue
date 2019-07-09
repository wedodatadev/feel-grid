<template>

  <SwipeableCards
    :cardsArray="cardsArray"
    :dsId="dsId"
    >
  </SwipeableCards>

</template>


<script>

import { mapState, mapGetters, mapActions } from 'vuex'

import ArrayShuffler from '~/utils/shuffler.js'

import SwipeableCards from '~/components/UX-components/SwipeableCards'

export default {

  name: "CardsPage",

  layout : "cardLayout",

  components: {
    SwipeableCards,
  },

  middleware : [
  ],

  props: [
  ],

  beforeMount : function(){

    console.log("P-CardsPage / beforeMount....")
    // let cardsArray = this.getConcatenatedDatasets('datasets')
    let cardsDataset = this.getOneDataset('datasets', this.dsId)
    let cardsArray = cardsDataset.dataRows

    // randomize stack
    let randomizedCards = ArrayShuffler( cardsArray )

    // set data stack locally
    // this.cardsArray = cardsArray
    this.cardsArray = randomizedCards
  },

  data() {
    return {

      cardsArray: undefined,
      dsId: 'contents'

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

      getConcatenatedDatasets : 'data/getConcatenatedDatasets',
      getOneDataset : 'data/getOneDataset'

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

  .skip-navbar-more{
    margin-top: 75px;
  }

</style>