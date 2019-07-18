<template>
    
  <!-- <v-layout 
    class="skip-navbar-content"
    > -->

    <v-flex 
      xs10 offset-xs1
      md8 offset-md2
      lg6 offset-lg3
      >
      
      <h1 class="text-xs-center">
        {{ $t('credits.title') }}
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
          {{ $t('credits.headline') }}
        </h3>

        <p class="pt-4">
          {{ $t('credits.content') }}
        </p>
      
      </div>

    </v-flex>

  <!-- </v-layout> -->


</template>


<script>

import { mapState, mapGetters, mapActions } from 'vuex'

export default {

  name: "CreditsPage",

  layout : "staticContents",
  transition: 'static',

  components: {
  },

  middleware : [
  ],

  props: [
  ],

  beforeMount : function(){
    console.log("P-CreditsPage / beforeMount....")
  },

  data() {
    return {
    }
  },

  computed: {

    ...mapState({
      log : state => state.log, 
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
    max-height: 85vw;
    overflow-y: auto;
  }

</style>
