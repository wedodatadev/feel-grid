<template>

  
  <v-layout 
    id="swipeable-cards"
    fill-height
    align-center
    justify-center
    wrap
    >

    <!-- DEBUG -->
    <!-- {{ breakPointCode }}<br> -->
    <!-- {{ windowWidth }}<br> -->
    
    <!-- FIRST CARD -->
    <v-flex
      v-if="current"
      :class="`card card--one full-height fixed fixed--center ${ isVisible ? 'transition' :'' }`"
      :style="`z-index: 3; width:${ cardWidth( .9 )}; height:${ cardHeight }`"
      >

      <InteractDraggable
        v-if="isVisible"
        id="mainDraggableCard"
        ref="mainDraggableCard"
        class="full-height"

        :interact-out-of-sight-x-coordinate="700"
        :interact-max-rotation="15"
        :interact-x-threshold="200"
        :interact-y-threshold="200"

        :interact-event-bus-events="interactEventBus"

        interact-block-drag-down

        :interact-block-drag-up="isPauseInteract"
        :interact-block-drag-right="isPauseInteract"
        :interact-block-drag-left="isPauseInteract"

        :interact-lock-swipe-up="isPauseInteract"
        :interact-lock-swipe-right="isPauseInteract"
        :interact-lock-swipe-left="isPauseInteract"

        @draggedRight="emitAndNext('skip')"
        @draggedLeft="emitAndNext('skip')"
        @draggedUp="emitAndNext('skip')"


        @clickDraggableBtn="getClickSignal"
        >

        <CardData

          :itemData="current"
          
          :cardHeights="cardHeights"

          :cardWidth="cardWidth( .9 )"
          :breakPoint="this.$vuetify.breakpoint.name"

          :isPauseInteractParent="isPauseInteract"

          @needPauseInteract="pauseInteract"
          @click="stopPropagation"
          >
        </CardData>

      </InteractDraggable>

    </v-flex>


    <!-- SECOND CARD -->
    <v-flex
      v-if="getNexCard()"
      class="card card--two fixed fixed--center"
      :style="`z-index: 2; width:${ cardWidth( .85 )}; height:${ cardHeight }`"
      >
      <CardData
        :itemData="getNexCard()"
        :cardHeights="cardHeights"
        >
      </CardData>
    </v-flex> 



  </v-layout>

</template>


<script>
// interactjs
// based and adapted from : https://www.josephharveyangeles.com/blog/2019/kittynder
// interactjs docs & help 
// cf : https://dev.to/josephharveyangeles/creating-a-tinder-like-swipe-ui-on-vue-4aa4
// cf : https://css-tricks.com/swipeable-card-stack-using-vue-js-and-interact-js/
// cf : https://interactjs.io/
// cf : https://github.com/kimuraz/vue-interact

// transitions : http://animista.net/play/basic/rotate
// cf : https://github.com/sdras/page-transitions-travelapp
// cf : https://css-tricks.com/native-like-animations-for-page-transitions-on-the-web/
// cf : https://vuejs.org/v2/guide/transitions.html#Transition-Classes
// cf : https://blog.pusher.com/demystifying-page-transitions-nuxt/
// cf : https://nuxtjs.org/examples/routes-transitions/
// cf : https://nuxtjs.org/api/pages-transition/
// cf : https://codesandbox.io/embed/2xovlqpv9n

import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

import interact from 'interact.js'
// import { Vue2InteractDraggable, InteractEventBus } from 'vue2-interact'
// import { InteractEventBus } from 'vue2-interact'

import CardData from '~/components/UX-components/CardData'
import InteractDraggable from '~/components/UX-components/InteractDraggable'


import { EVENTS, INTERACT_EVENTS } from "~/config/interactEvents.js"

export default {
  name: 'SwipeableCards',
  components: { 
    CardData,
    InteractDraggable,
    // Vue2InteractDraggable,
  },
  props: [
  ],
  mounted: function() {
    console.log("C-SwipeableCards / mounted....")
  },
  data() {
    return {
      
      // UI data
      breakPointCode : undefined,
      windowWidth : 0,
  
      cardHeight: "75vh",
      cardHeights: {
        title: "10vh",
        content: "54vh",
        more: "12vh",
        resources: "39vh",
        // footer: "8vh"
      },
      // cards iteration variables
      isVisible: true,

      getPrevious: false,
      
      // interactjs
      isPauseInteract : false,
      
      interactEventBus: {
        draggedRight: INTERACT_EVENTS.INTERACT_DRAGGED_RIGHT,
        draggedLeft: INTERACT_EVENTS.INTERACT_DRAGGED_LEFT,
        draggedUp: INTERACT_EVENTS.INTERACT_DRAGGED_UP
      },


    }
  },
  computed: {
    ...mapState({
      log : state => state.log, 
      locale : state => state.locale,
      dsId : state => state.cards.currentDsId,
      cards : state => state.cards.currentCardsArrray,
      cardId : state => state.cards.currentCardId,
      index : state => state.cards.currentCardIndex,
    }),
    ...mapGetters({
      cardsLength : 'cards/getCardsArrrayLength',
    }),
    current() {
      return this.cards && this.cards[ this.index ]
    },
    
    next() {
      return this.cards && this.cards[ this.index + 1 ]
    },
  
    previous() {
      if ( this.index !== 0 ){
        return this.cards && this.cards[ this.index - 1 ]
      } else {
        return this.cards && this.cards[ -1 ]
      }
    },
  },
  methods: {
    
    getClickSignal(event){
      console.log("C-SwipeableCards-getClickSignal / event : ", event )
      e.stopImmediatePropagation()
      e.stopPropagation()
      e.preventDefault()
    },

    ...mapMutations({
      setCurrentDsId: 'cards/setCurrentDsId',
      setCurrentCardsArrray: 'cards/setCurrentCardsArrray',
      setCurrentCardId: 'cards/setCurrentCardId',
      setCurrentCardIndex: 'cards/setCurrentCardIndex',
    }),

    // compute card width
    cardWidth ( widthPercent ) {
      let maxWidth = 100
      let zWidth = maxWidth * widthPercent
      let step = 10
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return zWidth + 'vw'
        case 'sm': return ( zWidth - (step * 4) ) + 'vw'
        case 'md': return ( zWidth - (step * 5) ) + 'vw'
        case 'lg': return ( zWidth - (step * 6) ) + 'vw'
        case 'xl': return ( zWidth - (step * 7) ) + 'vw'
      }
    },
    getNexCard(){
      if ( !this.getPrevious ){
        return this.next
      } else {
        return this.previous
      }
    },


    // WARNING ! careful to study this before
    // cf : https://codesandbox.io/s/5wo373kqwk
    skip() {
      console.log("C-SwipeableCards / skip ..." )
      // InteractEventBus.$emit(EVENTS.SKIP)
      // InteractEventBus.$emit(INTERACT_EVENTS.INTERACT_DRAGGED_RIGHT)
      this.$bus.$emit(INTERACT_EVENTS.INTERACT_DRAGGED_RIGHT)
      // this.emitAndNext('skip')
    },

    // match() {
    //   console.log("C-SwipeableCards / match ..." )
    //   // InteractEventBus.$emit(EVENTS.MATCH)
    //   this.emitAndNext('match')
    // },
    // reject() {
    //   console.log("C-SwipeableCards / reject ..." )
    //   // InteractEventBus.$emit(EVENTS.REJECT)
    //   this.emitAndNext('reject')
    // },


    
    stopPropagation(e){
      console.log("C-SwipeableCards-stopPropagation / event : ", event )
      e.stopImmediatePropagation()
      e.stopPropagation()
      e.preventDefault()
    },



    pauseInteract( isPause ){
      console.log("C-SwipeableCards-pauseInteract / isPause :", isPause )
      this.isPauseInteract = isPause
    },




    emitAndNext(event) {
      console.log("C-SwipeableCards-emitAndNext / event :", event )
      console.log("C-SwipeableCards-emitAndNext / this.index (A) :", this.index )
      // emit event to parent
      // this.$emit(event, this.index)
      // make card disappear
      setTimeout(() => {
        console.log("C-SwipeableCards-emitAndNext / setTimeout disappear..." )
        this.isVisible = false
        if ( event === 'previous' ){
          this.getPrevious = true
        }
      }, 300)
      // show next card by adding +1 to index
      setTimeout(() => {
        console.log("C-SwipeableCards-emitAndNext / setTimeout reappear..." )
        let newIndex = this.index
        if ( event === 'previous' ){
          newIndex -= 1
        } else {
          newIndex += 1
        }
        if ( newIndex < 0 ){
          newIndex = this.cardsLength - 1
        }
        console.log("C-SwipeableCards-emitAndNext / newIndex (B) :", newIndex )
        
        // let newPreviousIndex = newIndex - 1 
        // reset deck if no more cards
        if ( newIndex >= this.cardsLength - 1  ){
          // this.index = 0
          this.setCurrentCardIndex( 0 )
        } 
        else {
          // this.index = newIndex
          this.setCurrentCardIndex( newIndex )
        }
        this.isVisible = true
        this.getPrevious = false
      }, 400 )
    },
    shiftCard() {
      
      setTimeout(() => {
        this.isShowing = false;
      }, 200)
      setTimeout(() => {
        this.isShowing = true;
      }, 1000)
    },


    // draggedDown() {
    //   console.log("dragged down!");
    //   this.shiftCard();
    // },
    draggedLeft() {
      console.log("dragged left!");
      this.shiftCard();
    },
    draggedRight() {
      console.log("dragged right!");
      this.shiftCard();
    },
    draggedUp() {
      console.log("dragged up!");
      this.shiftCard();
    },


    dragLeft() {
      this.$bus.$emit(INTERACT_EVENTS.INTERACT_DRAGGED_LEFT);
    },
    dragRight() {
      this.$bus.$emit(INTERACT_EVENTS.INTERACT_DRAGGED_RIGHT);
    },
    dragUp() {
      this.$bus.$emit(INTERACT_EVENTS.INTERACT_DRAGGED_UP);
    },
  }
}
</script>

<style lang="scss" scoped>
.full-height{
  height: 100%;
}
.fixed {
  position: fixed;
  &--center {
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}

.card {
  &--one {

    transform: translate(-50%, -60%);
  }
  &--two {
    transform: translate(-50%, -57%);
  }
  &--three {
    transform: translate(-50%, -54%);
  }

}
.transition {
  animation: appear 400ms ease-in;
}
@keyframes appear {
  from {
    transform: scaleY(.85);
    transform: translate(-50%, -57%);
  }
  to {
    transform: scaleY(.9);
    transform: translate(-50%, -60%);
  }
}
</style>