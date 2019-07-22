<template>

  <div>
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
        >
      </SwipeableCards>

    </v-flex>

  </v-layout>

  <!--   
  <FooterCards
    class="fixed-bottom"
    @reloadPreviousItem="reloadPreviousItem()"
    >
  </FooterCards> -->

  </div>

</template>


<script>

import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

import ArrayShuffler from '~/utils/shuffler.js'

import SwipeableCards from '~/components/UX-components/SwipeableCards'
import FooterCards from '~/components/NAV-components/footer-cards'

export default {

  name: "CardsPage",

  layout : "cardLayout",
  transition: 'static',

  components: {
    SwipeableCards,
    FooterCards
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
    this.setCurrentDsId( this.dsId )

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

      this.setCurrentCardId( currentCardId )

      // put card on top of the deck 
      randomizedCards = randomizedCards.filter( item => { return item !== currentCard })
      randomizedCards.unshift( currentCard )
    }


    // set data stack locally
    // this.cardsArray = cardsArray
    this.cardsArray = randomizedCards
    this.setCurrentCardsArrray( randomizedCards )

  },

  data() {
    return {

      cardsArray: undefined,
      dsId: undefined,
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

      currentDsId : state => state.cards.currentDsId,
      currentCardsArrray : state => state.cards.currentCardsArrray,
      currentCardId : state => state.cards.currentCardId,
      // currentCardIndex : state => state.cards.currentCardIndex,
      
    }),

    ...mapGetters({

      getConcatenatedDatasets : 'data/getConcatenatedDatasets',
      getOneDataset : 'data/getOneDataset',
      currentIdField: 'data/getCurrentIdField',

    }),


  },

  methods: {

    ...mapMutations({
      setCurrentDsId: 'cards/setCurrentDsId',
      setCurrentCardsArrray: 'cards/setCurrentCardsArrray',
      setCurrentCardId: 'cards/setCurrentCardId',
      // setCurrentCardIndex: 'cards/setCurrentCardIndex',
    }),

    reloadPreviousItem(){
      console.log( "P-CardsPage-reloadPreviousItem... " )
    },



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

  .fixed-bottom{
    position: fixed;
    bottom: 0;
    left:0;
    bottom:0;
    width: 100%;
    text-align: center;
  }

</style>