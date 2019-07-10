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

      <Vue2InteractDraggable
        v-if="isVisible"
        class="full-height"

        :interact-out-of-sight-x-coordinate="500"
        :interact-max-rotation="15"
        :interact-x-threshold="200"
        :interact-y-threshold="200"
        :interact-event-bus-events="interactEventBus"

        interact-block-drag-down

        @draggedRight="emitAndNext('match')"
        @draggedLeft="emitAndNext('reject')"
        @draggedUp="emitAndNext('skip')"
        >

        <CardData
          :cardData="current"
          :dsId="dsId"
          :cardHeights="cardHeights"

          :cardWidth="cardWidth( .9 )"
          :breakPoint="this.$vuetify.breakpoint.name"
          >
        </CardData>

      </Vue2InteractDraggable>

    </v-flex>


    <!-- SECOND CARD -->
    <v-flex
      v-if="next"
      class="card card--two fixed fixed--center"
      :style="`z-index: 2; width:${ cardWidth( .85 )}; height:${ cardHeight }`"
      >
      <CardData
        :cardData="next"
        :dsId="dsId"
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
      <CardData
        :cardData="{}"
        :dsId="dsId"
        :cardHeights="cardHeights"
        >
      </CardData>
    </v-flex>


    <!-- FOOTER -->
    <!-- 
    <div class="footer fixed">

      <div 
        class="btn btn--decline" 
        @click="reject"
        >
        <i class="material-icons">
          close
        </i>
      </div>

      <div 
        class="btn btn--skip" 
        @click="skip"
        >
        <i class="material-icons">
          call_missed
        </i>
      </div>

      <div 
        class="btn btn--like" 
        @click="match"
        >
        <i class="material-icons">
          favorite
        </i>
      </div>

    </div> 
    -->

    <!-- <FooterCards>
    </FooterCards> -->


  </v-layout>

</template>


<script>

// based and adapted from : https://www.josephharveyangeles.com/blog/2019/kittynder

import { mapState, mapGetters, mapActions } from 'vuex'

import { Vue2InteractDraggable, InteractEventBus } from 'vue2-interact'
import CardData from '~/components/UX-components/CardData'

const EVENTS = {
  MATCH: 'match',
  SKIP: 'skip',
  REJECT: 'reject'
}

export default {

  name: 'SwipeableCards',

  components: { 
    Vue2InteractDraggable,
    CardData
  },

  props: [
    'cardsArray',
    'dsId'
  ],

  mounted: function() {
    console.log("C-SwipeableCards / mounted....")

    // this.onResize()
    // window.addEventListener('resize', this.onResize, { passive: true })

    this.cards = this.cardsArray
  },

  // beforeDestroy () {
  //   if (typeof window !== 'undefined') {
  //     window.removeEventListener('resize', this.onResize, { passive: true })
  //   }
  // },

  data() {
    return {
      
      breakPointCode : undefined,
      windowWidth : 0,
  
      cardHeight: "70vh",
      cardHeights: {
        title: "10vh",
        content: "46vh",
        more: "7vh",
        footer: "7vh"
      },

      isVisible: true,

      index: 0,

      interactEventBus: {
        draggedRight: EVENTS.MATCH,
        draggedLeft: EVENTS.REJECT,
        draggedUp: EVENTS.SKIP
      },

      cards: [],
      
    }
  },

  computed: {

    ...mapState({
      log : state => state.log, 
      locale : state => state.locale,
    }),

    current() {
      return this.cards && this.cards[ this.index ]
    },
    
    next() {
      return this.cards && this.cards[ this.index + 1 ]
    },
  
  },

  methods: {

    cardWidth ( widthPercent ) {
      let maxWidth = 80
      let zWidth = maxWidth * widthPercent
      let step = 10
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return zWidth + 'vw'
        case 'sm': return ( zWidth - (step * 2) ) + 'vw'
        case 'md': return ( zWidth - (step * 3) ) + 'vw'
        case 'lg': return ( zWidth - (step * 4) ) + 'vw'
        case 'xl': return ( zWidth - (step * 5) ) + 'vw'
      }
    },

    match() {
      InteractEventBus.$emit(EVENTS.MATCH)
    },
    reject() {
      InteractEventBus.$emit(EVENTS.REJECT)
    },
    skip() {
      InteractEventBus.$emit(EVENTS.SKIP)
    },
    emitAndNext(event) {
      this.$emit(event, this.index)
      setTimeout(() => this.isVisible = false, 200)
      setTimeout(() => {
        this.index++
        this.isVisible = true
      }, 400)
    }

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
    transform: translate(-50%, -55%);
    // box-shadow: 0 6px 6px -3px rgba(0,0,0,.2), 0 10px 14px 1px rgba(0,0,0,.14), 0 4px 18px 3px rgba(0,0,0,.12);
  }
  &--three {
    // width: 76vw;
    // width: 80%;
    // background: rgba(white, .8);
    // transform: translate(-46%, -46%);
    // transform: scale(1, .6);
    transform: translate(-50%, -50%);
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
  animation: appear 200ms ease-in;
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
