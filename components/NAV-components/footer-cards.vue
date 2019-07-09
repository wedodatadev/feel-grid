<template>

  <!-- FOOTER INDEX -->
  <v-footer 
    color="transparent"
    class="ma-4 pb-2"
    >
    
    <!-- LEFT SIDE ICONS -->
    <v-btn 
      v-for="(btn, indexBtn) in footerBtnsLeft"
      :key="btn.textCode"
      :to="btn.to"
      icon
      outline
      color="primary"
      >
      <v-icon>
        {{ btn.icon }}
      </v-icon>
    </v-btn>

    <v-spacer></v-spacer>

    <!-- RIGHT SIDE ICONS  -->
    <v-btn 
      v-for="(btn, indexBtn) in footerBtnsRight"
      :key="btn.textCode"
      icon
      outline
      color="primary"
      @click="skip"
      >
      <v-icon>
        {{ btn.icon }}
      </v-icon>
    </v-btn>


  </v-footer>

</template>

<script>

import { mapState, mapGetters, mapActions } from 'vuex'
import { InteractEventBus } from 'vue2-interact'

const EVENTS = {
  // MATCH: 'match',
  SKIP: 'skip',
  // REJECT: 'reject'
}


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
      ]
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
  },

  methods: {

    skip() {
      InteractEventBus.$emit(EVENTS.SKIP)
    },

  },

}
</script>
