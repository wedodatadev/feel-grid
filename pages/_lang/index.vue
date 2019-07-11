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
            :class="`text-uppercase ${ (loc.code === locale)? '' : 'font-weight-thin' }`"
            round 
            color="primary" 
            dark
            outline
            @click="changeLocale(loc, false)"
            @mouseover="changeLocale(loc, true)"
            >
            <!-- :outline="loc.code !== locale " -->
            {{ loc.code }}
          </v-btn>
        
        </div>

        <!-- GO TO ACES PAGE -->
        <div  v-show="locSelected">

          <p class="text-uppercase">
            {{ $t('intro.catchPhrase') }}
          </p>

          <v-btn 
            round
            outline
            color="primary"
            :to="(isFirstVisit)? '/about' : '/cards' "
            >
            {{ $t('intro.getAnAce')}}
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
  transition: 'static',

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
      // locSelected: false,
    }
  },

  computed: {

    ...mapState({

      log : state => state.log, 

      isFirstVisit : state => state.firstVisit,

      locale : state => state.locale,
      locales : state => state.locales,
      defaultLocale : state => state.defaultLocale,
      locSelected: state => state.locSelected,

      datasets : state => state.data.datasets,
      correspondanceDicts : state => state.data.correspondanceDicts,
      dataTypes : state => state.data.dataTypes,

    }),

    ...mapGetters({

    }),
  },

  methods: {

    changeLocale(loc, hover=true){
      // console.log("P-index / changeLocale ...")
      this.$i18n.locale = loc.code
      this.$store.commit('switchLocale', loc)
      if (!hover){
        // this.locSelected = true
        this.$store.commit('setLocSelected')
        // this.$router.push('/cards')
      } 
      // else {
      //   this.locSelected = true
      // }
    },

    openRandomCard(){
      console.log("P-index / openRandomCard ...")
      
    }

  },

}
</script>

<style scoped>

  .skip-navbar-more{
    margin-top: 75px;
  }

</style>