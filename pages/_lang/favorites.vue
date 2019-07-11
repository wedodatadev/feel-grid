<template>
    
  <!-- <v-layout 
    class="skip-navbar-content"
    > -->

    <v-flex xs10 offset-xs1>
      
      <h1 class="text-xs-center">
        {{ $t('favorites.title') }}
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

      <h3 class="pt-3">
        {{ $t('favorites.headline') }}
      </h3>

      <br>

      <!-- FAVORITES LIST -->
      <v-list 
        dense 
        class="transparent limited-height"
        >

        <div
          v-for="dsFavorites in favorites"
          :key="dsFavorites.dsId"
          >

          <v-list-tile
            v-for="item in dsFavorites.favorites"
            :key="item[ itemIdField ]"
            :to="'/cards/' + dsFavorites.dsId + '/' + item "
            >

            <!-- icon -->
            <v-list-tile-action>
              <v-icon color="pink">
                favorite
              </v-icon>
            </v-list-tile-action>

            <!-- favorite title -->
            <v-list-tile-content>
              <v-list-tile-title>
                {{ dsFavorites.dsId + '/' + item }}
              </v-list-tile-title>
            </v-list-tile-content>
          
          </v-list-tile>

        </div>

      </v-list>


    </v-flex>

  <!-- </v-layout> -->

</template>


<script>

import { mapState, mapGetters, mapActions } from 'vuex'

export default {

  name: "FavoritesPage",

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
    console.log("P-FavoritesPage / beforeMount....")
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

      itemIdField : state => state.users.itemIdField,

      favorites : state => state.users.favorites

    }),

    ...mapGetters({

    }),

  },

  methods: {

    goBack(e){
      e.preventDefault()
      this.$router.back()
    },

    getItemFromDatasets(itemId){
      
      let itemIdField = this.itemIdField
      // TO DO 

    },

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
