<template>

  <v-layout 
    fill-height
    row wrap 
    >

    <v-flex 
      xs10 offset-xs1
      sm8 offset-md2
      md6 offset-md3
      >

      <SwipeableCards
        :cardsArray="cardsArray"
        :dsId="dsId"
        :cardId="cardId"
        >
      </SwipeableCards>

    </v-flex>

  </v-layout>

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

    // SPECIFIC TO _dsId : find 
    let currentDsId = this.$nuxt.$route.params.dsId
    console.log("P-CardsPage / currentDsId : ", currentDsId)
    let firstDataset = this.datasets[0]
    let firstDatasetId = firstDataset.dsId
    if ( !currentDsId ){
      this.dsId = firstDatasetId
      // TO DO : append to url 
    } else {
      let isDsId = this.datasets.find( ds => { return ds.dsId === currentDsId })
      this.dsId = (isDsId)? currentDsId : firstDatasetId
    }

    // get dataset corresponding to dsId
    let cardsDataset = this.getOneDataset('datasets', this.dsId)
    console.log("P-CardsPage / cardsDataset : ", cardsDataset)
    let cardsArray = cardsDataset.dataRows

    // randomize stack
    let randomizedCards = ArrayShuffler( cardsArray )
    console.log( "P-CardsPage / randomizedCards : ", randomizedCards )


    // get idField for this dataset 
    let idField = this.currentIdField( this.dsId )
    console.log( "P-CardsPage / idField : ", idField )


    // SPECIFIC TO _card : find 
    let currentCardId = this.$nuxt.$route.params.card
    console.log( "P-CardsPage / currentCardId : ", currentCardId )
    let currentCard = randomizedCards.find( item => { return currentCardId === String(item[ idField ]) } )
    console.log( "P-CardsPage / currentCard : ", currentCard )
    if ( currentCardId ) {
      // put card on top of the deck 
      randomizedCards = randomizedCards.filter( item => { return item !== currentCard })
      randomizedCards.unshift( currentCard )
    }


    // set data stack locally
    // this.cardsArray = cardsArray
    this.cardsArray = randomizedCards

  },

  data() {
    return {

      cardsArray: undefined,
      dsId: 'aces-contents',
      cardId : undefined,

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
      getOneDataset : 'data/getOneDataset',
      currentIdField: 'users/getCurrentIdField',

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