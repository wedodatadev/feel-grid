<style>

  .skip-navbar-more{
    margin-top: 75px;
  }

</style>


<template>

  <!-- <v-container
    > -->
    
    <v-layout 
      class="text-xs-center"
      align-center 
      justify-center 
      >

      <div>

        <!-- LOGO -->
        <p>xxx logo xxx</p>

        <h2> 
          {{ $t('title.development') }}
          <b>{{ $t('title.aces') }}</b>
        </h2>

        <br>

        <!-- LOCALE SELECTION -->
        <div v-show="!locSelected">

          <p>
          {{ $t('intro.chooseLang') }}
          </p>
        
          <v-btn 
            v-for="(loc, index) in locales"
            :key="index"
            round 
            color="primary" 
            :outline="loc.code !== locale "
            dark
            @click="changeLocale(loc)"
            >
            {{ loc.code }}
          </v-btn>
        
        </div>

        <!-- GO TO NEXT PAGE -->
        <div  v-show="locSelected">
          <v-btn 
            round
            outline
            color="primary"
            >
            GO TO NEXT PAGE
          </v-btn>
        </div>

      </div>
      
    </v-layout>

  <!-- </v-container> -->

</template>


<script>

import { mapState, mapGetters, mapActions } from 'vuex'

import GameCardsStack from '~/components/UX-components/GameCardsStack'
import BasicTable from '~/components/DATA-components/basic-table'

export default {

  name: "MainIndex",

  components: {
    BasicTable,
    GameCardsStack
  },

  middleware : [
  ],

  props: [
  ],

  beforeMount : function(){
    console.log("P-index / beforeMount....")
  },

  data() {
    return {
      locSelected: false,
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

    }),
  },

  methods: {

    changeLocale(loc){
      this.$i18n.locale = loc.code
      this.$store.commit('switchLocale', loc)
      this.locSelected = true
    },

  },

}
</script>
