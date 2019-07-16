<template>

<!-- FOOTER INDEX -->

  <v-footer 
    color="transparent"
    :class="`${ (showNext)? 'ma-4' : 'mx-0 mb-4' } pb-2 centered`"
    >

    <!-- <v-layout
      > -->

      <div
        :style="`z-index: 4; width:${ cardWidth( .9 ) }`"
        >

        <v-layout
          row wrap
          >

          <!-- LEFT SIDE ICONS -->
          <v-layout justify-start>
            <v-btn 
              v-for="btn in footerBtnsLeft"
              :key="btn.textCode"
              :to="btn.to"
              icon
              class="primary "
              flat
              >
              <v-icon>
                {{ btn.icon }}
              </v-icon>
            </v-btn>
          </v-layout>

          <!-- <v-spacer></v-spacer> -->

          <!-- RIGHT SIDE ICONS  -->
          <v-layout justify-end >

            <!-- <v-btn
              flat
              color="grey"
              @click.prevent="skip"
              >
              <span
                v-show="showNext"
                >
                {{ $t('cards.next') }}
              </span>
            </v-btn> -->

            <v-btn 
              v-if="!showNext"
              v-for="btn in footerBtnsRight"
              :key="btn.textCode"
              class="primary mr-0 text-xs-right "
              flat
              icon
              @click.prevent="skip"
              >
              <v-icon
                color="white"
                >
                {{ btn.icon }}
              </v-icon>
            </v-btn>
            

            <v-btn 
              v-else
              v-for="btn in footerBtnsRight"
              :key="btn.textCode"
              class="transparent mr-3 pr-2 pl-3 text-xs-right "
              round
              flat
              @click.prevent="skip"
              >

              <span
                v-show="showNext"
                class="grey--text mr-2"
                >
                {{ $t( btn.textCode ) }}
              </span>

              <v-avatar 
                class="next-translated"
                color="primary"
                size="36px"
                >
                <v-icon
                  color="white"
                  >
                  {{ btn.icon }}
                </v-icon>
              </v-avatar>

            </v-btn>


          </v-layout>

        </v-layout>

      </v-layout>

    </div>

  </v-footer>


</template>

<script>

import { mapState, mapGetters, mapActions } from 'vuex'
import { InteractEventBus } from 'vue2-interact'

import { EVENTS, INTERACT_EVENTS } from "~/config/interactEvents.js"


export default {

  name: "FooterCards",

  components: {
  },

  props: [
  ],

  beforeMount: function() {
    console.log("C-FooterCards / beforeMount....")
  },

  data() {

    return {

      footerBtnsLeft: [
        { textCode: "twitter", icon: "fab fa-twitter", to: "/about" },
        { textCode: "facebook", icon: "fab fa-facebook", to: "/credits" },
        { textCode: "screenshot", icon: "fas fa-camera", to: "/credits" },
      ],

      footerBtnsRight : [
        { textCode: "cards.next", icon: "fas fa-arrow-right", to: "/next" },
      ],

      showNextBreakpoints : [ 'sm', 'md' , 'lg', 'xl'],
      
      interactEventBus: {
        draggedRight: EVENTS.SKIP,
        draggedLeft: EVENTS.SKIP,
        draggedUp: EVENTS.SKIP
      },   

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

    showNext(){
      let screenBreakPoint = this.$vuetify.breakpoint.name
      return this.showNextBreakpoints.includes(screenBreakPoint)
    }
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

    skip() {
      console.log("C-FooterCards-skip ..." )
      console.log("C-FooterCards-skip ... InteractEventBus : \n", InteractEventBus )
      // InteractEventBus.$emit(EVENTS.SKIP)
      InteractEventBus.$emit(INTERACT_EVENTS.INTERACT_DRAGGED_RIGHT);
    },

  },

}
</script>


<style scoped>
  .centered{
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .next-translated {
    transform: translateX(8px);
  }
</style>