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
      <div
        v-for="dsFavorites in favorites"
        :key="dsFavorites.dsId"
        >


        <v-list 
          v-for="item in dsFavorites.favorites"
          :key="item[ getItemIdField( dsFavorites.dsId ) ]"
          three-lines
          class="transparent limited-height py-0"
          >

          <v-list-tile
            :to=" locale + '/cards/' + dsFavorites.dsId + '/' + item "
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
                
                <span 
                  class=""
                  >
                  "{{ getFavoriteItem( dsFavorites.dsId, item, 'favText' ) }}"
                </span>
                <v-icon
                  color="grey"
                  >
                  chevron_right
                </v-icon>

              </v-list-tile-title>
            </v-list-tile-content>
          
          </v-list-tile>

          <v-divider inset></v-divider>
  
        </v-list>
  
      </div>


    </v-flex>

  <!-- </v-layout> -->

</template>


<script>

import { mapState, mapGetters, mapActions } from 'vuex'

export default {

  name: "FavoritesPage",

  layout : "staticContents",
  transition: 'static',

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
      idField: undefined,

    }
  },

  computed: {
    
    ...mapState({
      
      log : state => state.log, 
      isFirstVisit : state => state.firstVisit,
      locale : state => state.locale,

      contentFields : state => state.data.contentFields,
      // itemIdField : state => state.users.itemIdField,

      favorites : state => state.users.favorites

    }),

    ...mapGetters({

      currentIdField: 'data/getCurrentIdField',
      getContentField: 'data/getContentField',
      getItemData: 'data/getOneItemFromDatasets',

    }),

  },

  methods: {

    goBack(e){
      e.preventDefault()
      this.$router.back()
    },


    getItemIdField( dsId ){
      console.log("P-FavoritesPage-getItemFieldId / this.currentIdField( dsId ) : ", this.currentIdField( dsId ) )
      return this.currentIdField( dsId )
    },

    getFavoriteItem( dsId, itemId, fieldCode  ){

      let currentLocale = this.locale
      
      console.log("P-FavoritesPage-getFavoriteText / dsId : ", dsId )
      console.log("P-FavoritesPage-getFavoriteText / itemId : ", itemId )

      console.log("P-FavoritesPage-getFavoriteText / this.contentFields : ", this.contentFields )

      let contentFieldsObject = this.contentFields.find( fieldObj => {
        return dsId == fieldObj.dsId
      }) 
      let contentFields = contentFieldsObject.contentsFields
      console.log("P-FavoritesPage-getFavoriteText / contentFields : ", contentFields )

      let contentColName = contentFields.find( field => {
        return fieldCode === field.itemAppFieldCode
      })
      console.log("P-FavoritesPage-getFavoriteText / contentColName : ", contentColName )

      let itemData = this.getItemData( dsId, itemId)
      console.log("P-FavoritesPage-getFavoriteText / itemData : ", itemData )


      let fieldByLocale = this.getContentField( dsId, currentLocale, fieldCode)
      console.log("P-FavoritesPage-getFavoriteText / fieldByLocale : ", fieldByLocale )

      return itemData[ fieldByLocale ]
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
