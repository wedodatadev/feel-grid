<template>

<!-- FOOTER INDEX -->

  <v-footer 
    color="transparent"
    class="ma-4 pb-2 centered"
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
              class="primary ma-1"
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

            <v-btn
              v-show="showNext"
              flat
              color="grey"
              @click="skip"
              >
              {{ $t('cards.next') }}
            </v-btn>

            <v-btn 
              v-for="btn in footerBtnsRight"
              :key="btn.textCode"
              icon
              class="primary ma-1"
              flat
              @click="skip"
              >
              <v-icon>
                {{ btn.icon }}
              </v-icon>
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
        { textCode: "next", icon: "fas fa-arrow-right", to: "/next" },
      ],

      showNextBreakpoints : [ 'sm', 'md' , 'lg', 'xl'],

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
      InteractEventBus.$emit(EVENTS.SKIP)
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
</style>