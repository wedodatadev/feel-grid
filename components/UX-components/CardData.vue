<template>

    <v-card
      color="primary"
      class="full-height rounded-borders"
      ref="currentCard"
      dark
      >

      <div
        >

      <!-- LOGO TITLE -->
      <!-- <v-layout 
        justify-center
        > -->

      <v-card-title 
        ref="cardTitle"
        class="justify-center"
        :style="`height:${ cardHeights['title'] }`"
        >
        <h2 class="text-xs-center mb-0">
          xxx AFD LOGO xxx
        </h2>
      </v-card-title>
      <!-- </v-layout>  -->


      <!-- <br> -->

      <!-- TEXT CONTENTS -->

      <v-layout 
        ref="cardContent"
        align-center
        justify-center
        :style="`height:${ cardHeights['content'] }`"
        >

        <v-card-text class="headline font-weight-bold text-xs-center">

          {{ cardData && getContentByLocale('mainContent') }}
          <!-- <br>
          cardWidth : {{ cardWidth }}
          <br>
          breakPoint : {{ breakPoint }} -->
          <!-- <br>
          favs : <br><code>{{ favs }}</code> -->
          <!-- <br>
          favorites : <br><code>{{ favorites }}</code> -->
        </v-card-text>

      </v-layout> 


      <!-- </v-layout>  -->

      <!-- RESSOURCES CONTENTS -->
      <v-layout 
        ref="cardMore"
        justify-center
        :style="`height:${ cardHeights['more'] }`"
        row wrap
        >

        <!-- <v-card-actions> -->

          <v-flex 
            xs12 
            class="text-uppercase text-xs-center"
            >
            {{ $t('cards.findMore') }}
          </v-flex>

          <v-flex xs12
            class="text-xs-center"
            >
            <v-btn 
              flat
              icon
              >
              <v-icon>
                fas fa-plus
              </v-icon>
            </v-btn>
          </v-flex>
        <!-- </v-card-actions> -->
        
      </v-layout> 


      <!-- FAVORITES FOOTER -->
      <v-footer 
        color="transparent" 
        class="px-2 pb-2"
        fixed
        :style="`height:${ cardHeights['footer'] }`"
        ref="cardFooter"
        >
        <v-layout
          align-center
          justify-end
          >
          <v-btn 
            icon
            flat
            :color="isFavorite ? 'pink' : 'white' "
            @click="switchFavorite()"
            >
            <v-icon>
              favorite
            </v-icon>
          </v-btn>
        </v-layout>
      </v-footer>


    </div>

    </v-card>

</template>


<script>

// based and adapted from : https://www.josephharveyangeles.com/blog/2019/kittynder

import { mapState, mapGetters, mapActions } from 'vuex'
import { InteractEventBus } from 'vue2-interact'

import { EVENTS, INTERACT_EVENTS } from "~/config/interactEvents.js"


export default {

  name: 'CardData',

  components: { 
  },

  props: [
    'cardData',
    'dsId',

    // debug
    'cardWidth',
    'breakPoint',
    'cardHeights'
  ],

  mounted: function() {
    console.log("C-CardData / mounted....")
  },

  data() {

    return {
      
      contentHeight: 0,

    }
  },

  computed: {

    ...mapState({

      log : state => state.log, 
      locale : state => state.locale,

      contentFields : state => state.data.contentFields,

      itemIdField : state => state.users.itemIdField,

      favorites : state => state.users.favorites

    }),

    ...mapGetters({

      // favorites : 'users/getFavorites',

    }),

    isFavorite(){
      // console.log("C-CardData-isFavorite / this.itemIdField : ", this.itemIdField)
      let itemId = this.cardData[ this.itemIdField ]
      // console.log("C-CardData-isFavorite / itemId : ", itemId)
      return this.favorites.includes( String(itemId) )
    },

  },

  methods: {

    getContentByLocale( fieldCode ){

      // console.log("C-CardData-getContentByLocale..." )

      let currentLocale = this.locale
      let contentFields = this.contentFields[ this.dsId ]
      // console.log("C-CardData-getContentByLocale / contentFields : ", contentFields )

      let contentColName = contentFields.find( field => {
        return fieldCode === field.cardFieldCode
      })
      let fieldByLocale = contentColName && contentColName[ currentLocale ]
      // console.log("C-CardData-getContentByLocale / fieldByLocale :", fieldByLocale)

      // find correct field code
      return this.cardData[ fieldByLocale ]
    },

    computeContentHeight(){

      console.log("C-CardData-computeContentHeight..." )

      console.log("C-CardData-computeContentHeight / this.$refs :", this.$refs )

      // if ( this.cardData != {} ){

        let heightCard = this.$refs.currentCard.clientHeight
        let heightTitle = this.$refs.cardTitle.clientHeight
        let heightFooter = this.$refs.cardFooter.clientHeight

        console.log("C-CardData-computeContentHeight / heightCard :", heightCard )
        console.log("C-CardData-computeContentHeight / heightTitle :", heightTitle )
        console.log("C-CardData-computeContentHeight / heightFooter :", heightFooter )

        let heightContent = heightCard - ( heightTitle + heightFooter )
        console.log("C-CardData-computeContentHeight / heightContent :", heightContent )
    
        return heightContent

      // } else {
      //   return 
      // }
    },

    switchFavorite(){

      console.log("C-CardData-addAsFavorite..." )

      // InteractEventBus.$emit(EVENTS.MATCH)
      this.$store.dispatch('users/switchFavorite', this.cardData)

    },

  }
}
</script>

<style lang="scss" scoped>

.rounded-borders {
  border-radius: 12px;
}
.full-height{
  height: 100%;
}

</style>
