<template>
    
  <!-- <v-layout 
    class="skip-navbar-content"
    > -->

    <v-flex xs10 offset-xs1>
      
      <h1 class="text-xs-center">
        {{ $t('about.title') }}
      </h1>

      <v-layout justify-center>
        <v-btn 
          flat
          icon
          color="primary"
          @click="goBack"
          >
          <v-icon>
            close
          </v-icon>
        </v-btn>
      </v-layout>

      <hr>

      <div 
        class="limited-height"
        >

        <h3 class="pt-3">
          {{ $t('about.headline') }}
        </h3>

        <p class="pt-4">
          {{ $t('about.content') }}
        </p>

      </div>

    </v-flex>

  <!-- </v-layout> -->

</template>


<script>

import { mapState, mapGetters, mapActions } from 'vuex'

export default {

  name: "AboutPage",

  layout : "staticContents",

  // TO DO 
  pageTransition: {
  },

  components: {
    // FooterAbout,
  },

  middleware : [
  ],

  props: [
  ],

  beforeMount : function(){
    console.log("P-AboutPage / beforeMount....")
  },

  data() {
    return {
    }
  },

  computed: {

    ...mapState({
      log : state => state.log, 
      isFirstVisit : state => state.firstVisit,
      locale : state => state.locale,
    }),

    ...mapGetters({

    }),
  },

  methods: {

    goBack(e){
      e.preventDefault()
      this.$router.back()
    }

  },

}
</script>


<style scoped>

.skip-navbar-content{
  margin-top: 200px;
}

.limited-height{
  max-height: 80vw;
  overflow-y: auto;
}

</style>
