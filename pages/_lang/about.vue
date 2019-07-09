<style>

</style>


<template>

    
  <v-layout 
    class="text-xs-center"
    align-center 
    justify-center 
    >

    About Page...


  </v-layout>


</template>


<script>

import { mapState, mapGetters, mapActions } from 'vuex'

export default {

  name: "AboutPage",

  components: {
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
      locale : state => state.locale,
    }),

    ...mapGetters({

    }),
  },

  methods: {

  },

}
</script>
