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

        >

        <!-- 
        @draggedDown="draggedDown"
        @draggedLeft="draggedLeft"
        @draggedRight="draggedRight"
        @draggedUp="draggedUp" 
        -->
        <!-- 
        @draggedRight="emitAndNext('match')"
        @draggedLeft="emitAndNext('reject')"
        @draggedUp="emitAndNext('skip')"
        -->

          <!-- :dsId="dsId" -->
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
        <!-- :dsId="dsId" -->
      <CardData
        :itemData="getNexCard()"
        :cardHeights="cardHeights"
        >
      </CardData>
    </v-flex> 


    <!-- THIRD CARD -->
    <v-flex
      v-if="index + 2 < cards.length"
      class="card card--three fixed fixed--center"
      :style="`z-index: 1; width:${ cardWidth( .8 )}; height:${ cardHeight }`"
      >
        <!-- :dsId="dsId" -->
      <CardData
        :itemData="{}"
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
import { InteractEventBus } from 'vue2-interact'

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
    // 'cardsArray',
    // 'dsId',
    // 'cardId'
  ],
  mounted: function() {
    console.log("C-SwipeableCards / mounted....")
    // interact('.vue-interact-animated').draggable({ ignoreFrom : 'button' })
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
      // cards: [],
      // cardsLength: 0,
      // index: 0,
      getPrevious: false,
      // interactjs
      isPauseInteract : false,
      // interactEventBus: {
      //   draggedRight: EVENTS.SKIP,
      //   draggedLeft: EVENTS.SKIP,
      //   draggedUp: EVENTS.SKIP
      // },
      
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
      InteractEventBus.$emit(INTERACT_EVENTS.INTERACT_DRAGGED_RIGHT)
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
      }, 200);
      setTimeout(() => {
          this.isShowing = true;
        }, 1000);
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
    // dragDown() {
    //   InteractEventBus.$emit(INTERACT_EVENTS.INTERACT_DRAGGED_DOWN);
    // },
    dragLeft() {
      InteractEventBus.$emit(INTERACT_EVENTS.INTERACT_DRAGGED_LEFT);
    },
    dragRight() {
      InteractEventBus.$emit(INTERACT_EVENTS.INTERACT_DRAGGED_RIGHT);
    },
    dragUp() {
      InteractEventBus.$emit(INTERACT_EVENTS.INTERACT_DRAGGED_UP);
    },
  }
}
</script>

<style lang="scss" scoped>
.full-height{
  height: 100%;
}
// .container {
//   // background: #eceff1;
//   width: 100%;
//   height: 100vh;
// }
// .header {
//   width: 100%;
//   height: 60vh;
//   z-index: 0;
//   top: 0;
//   left: 0;
//   color: white;
//   text-align: center;
//   font-style: italic;
//   font-family: 'Engagement', cursive;
//   background: #f953c6;
//   background: -webkit-linear-gradient(to top, #b91d73, #f953c6);
//   background: linear-gradient(to top, #b91d73, #f953c6);
//   clip-path: polygon(0 1%, 100% 0%, 100% 76%, 0 89%);
//   display: flex;
//   justify-content: space-between;
//   span {
//     display: block;
//     font-size: 4rem;
//     padding-top: 2rem;
//     text-shadow: 1px 1px 1px red;
//   }
//   i {
//     padding: 24px;
//   }
// }
// .footer {
//   width: 77vw;
//   bottom: 0;
//   left: 50%;
//   transform: translateX(-50%);
//   display: flex;
//   padding-bottom: 30px;
//   justify-content: space-around;
//   align-items: center;
// }
// .btn {
//   position: relative;
//   width: 50px;
//   height: 50px;
//   padding: .2rem;
//   border-radius: 50%;
//   background-color: white;
//   box-shadow: 0 6px 6px -3px rgba(0,0,0,0.02), 0 10px 14px 1px rgba(0,0,0,0.02), 0 4px 18px 3px rgba(0,0,0,0.02);
//   cursor: pointer;
//   transition: all .3s ease;
//   user-select: none;
//   -webkit-tap-highlight-color:transparent;
//   &:active {
//     transform: translateY(4px);
//   }
//   i {
//     position: absolute;
//     top: 50%;
//     left: 50%;
//     transform: translate(-50%, -50%);
//     &::before {
//       content: '';
//     }
//   }
//   &--like {
//     background-color: red;
//     padding: .5rem;
//     color: white;
//     box-shadow: 0 10px 13px -6px rgba(0,0,0,.2), 0 20px 31px 3px rgba(0,0,0,.14), 0 8px 38px 7px rgba(0,0,0,.12);
//     i {
//       font-size: 32px;
//     }
//   }
//   &--decline {
//     color: red;
//   }
//   &--skip {
//     color: green;
//   }
// }
// .flex {
//   display: flex;
//   &--center {
//     align-items: center;
//     justify-content: center;
//   }
// }
.fixed {
  position: fixed;
  &--center {
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}
// .rounded-borders {
//   border-radius: 12px;
// }
.card {
  // height: 70vh;
  // height: 85%;
  // color: black;
  // img {
    //   object-fit: cover;
  //   display: block;
  //   width: 100%;
  //   height: 100%;
  // }
  &--one {
    // width: 80vw;
    // width: 100%;
    transform: translate(-50%, -60%);
    // background: rgba(white, 1);
    // box-shadow: 0 1px 3px rgba(0,0,0,.2), 0 1px 1px rgba(0,0,0,.14), 0 2px 1px -1px rgba(0,0,0,.12);
  }
  &--two {
    // width: 78vw;
    // width: 85%;
    // background: rgba(white, .9);
    // transform: translate(-48%, -48%);
    // transform: scale(1, .8);
    transform: translate(-50%, -57%);
    // box-shadow: 0 6px 6px -3px rgba(0,0,0,.2), 0 10px 14px 1px rgba(0,0,0,.14), 0 4px 18px 3px rgba(0,0,0,.12);
  }
  &--three {
    // width: 76vw;
    // width: 80%;
    // background: rgba(white, .8);
    // transform: translate(-46%, -46%);
    // transform: scale(1, .6);
    transform: translate(-50%, -54%);
    // box-shadow: 0 10px 13px -6px rgba(0,0,0,.2), 0 20px 31px 3px rgba(0,0,0,.14), 0 8px 38px 7px rgba(0,0,0,.12);
  }
  // .text {
  //   position: absolute;
  //   bottom: 0;
  //   width: 100%;
  //   background:black;
  //   background:rgba(0,0,0,0.5);
  //   border-bottom-right-radius: 12px;
  //   border-bottom-left-radius: 12px;
  //   text-indent: 20px;
  //   span {
  //     font-weight: normal;
  //   }
  // }
}
.transition {
  animation: appear 400ms ease-in;
}
@keyframes appear {
  from {
    transform: translate(-50%, -47%);
  }
  to {
    transform: translate(-50%, -60%);
  }
}
</style>