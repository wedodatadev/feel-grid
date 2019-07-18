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



      <!-- TEXT CONTENTS -->
      <transition name="slide">
      <v-layout 
        ref="cardContent"
        v-show="!findMoreActive"
        align-center
        justify-center
        :style="`height:${ cardHeights['content'] }`"
        :class="`${ findMoreActive ? '' : '' }`"
        >

          <v-card-text 
            v-show="!findMoreActive"
            class="headline font-weight-bold text-xs-center px-5"
            >

            <!-- currentDsId : {{ currentDsId }}<br> -->
            cookieContent : {{ cookieContent.locale }} <br>
            locale (store) : {{ locale }}<br>
            triggerFav : {{ triggerFav }}<br>
            <hr>

            {{ itemData && getContentByLocale('mainContent') }}
            <br>

          </v-card-text>

      </v-layout> 
      </transition>



      <!-- RESSOURCES CONTENTS -->
      <v-layout 
        ref="cardMore"
        justify-center
        :style="`z-index: 5; height:${ cardHeights['more'] }`"
        :class="`${ findMoreActive ? '' : '' }`"
        row wrap
        >

        <!-- FIND MORE TITLE -->
        <v-flex 
          xs12 
          class="text-uppercase text-xs-center"
          >
          {{ $t('cards.findMore') }}
        </v-flex>

        <!-- BTN OPEN/CLOSE -->
        <v-flex xs12
          :class="`text-xs-center`"
          >
          <v-btn 
            flat
            icon
            @click=" findMoreActive = !findMoreActive "
            :class="`${ findMoreActive? 'close-to-plus-out' : 'close-to-plus-in roll-in' }`"
            >
            <v-icon
              >
              close
            </v-icon>
          </v-btn>
        </v-flex>
        

        <!-- FAVORITES FOOTER -->
        <v-footer
          color="transparent" 
          class="px-2 pb-4"
          fixed
          :style="`z-index: 4; height:${ cardHeights['footer'] }`"
          ref="cardFooter"
          >
          <v-layout
            align-center
            justify-end
            >
            <v-btn 
              icon
              flat
              outline
              dark
              @click="switchFavorite()"
              >
              <v-icon
                :color="isFavorite ? 'pink' : 'white' "
                >
                favorite
              </v-icon>
            </v-btn>
          </v-layout>
        </v-footer>
      
        <!-- CONTENT RESOURCES -->
        <transition name="slide">
          <v-flex xs12
            :style="`height:${ cardHeights['content'] }`"
            v-show="findMoreActive"
            >
            <v-card-text
              class=""
              >
              <v-divider></v-divider>

              <div 
                :class="`mt-4 limited-height`"
                :style="`max-height:${ cardHeights['resources'] }`"
                >

                <v-list-tile
                  v-for="favField in resourcesList.favFields"
                  :key="favField.textFieldCode"
                  style="z-index: 25"
                  class="text-xs-center"
                  >
                  
                  <v-list-tile-action
                    class="near-icon"
                    >
                    <v-icon small>
                      fas fa-arrow-right
                    </v-icon>
                  </v-list-tile-action>

                  <v-list-tile-content>
                    <v-list-tile-title>
                      <a 
                        class="white--text"
                        :href="itemData[ favField.linkFieldCode ]"
                        >
                        {{ itemData[ favField.textFieldCode ] }}
                      </a>
                    </v-list-tile-title>
                  </v-list-tile-content>


                </v-list-tile>


              </div>

            </v-card-text>

          </v-flex>
        </transition>



      </v-layout> 





    </div>

    </v-card>

</template>


<script>

// based and adapted from : https://www.josephharveyangeles.com/blog/2019/kittynder
var cookieparser = require('cookieparser')
import Cookie from 'js-cookie'

import { mapState, mapGetters, mapActions } from 'vuex'
import { InteractEventBus } from 'vue2-interact'

import { EVENTS, INTERACT_EVENTS } from "~/config/interactEvents.js"


export default {

  name: 'CardData',

  components: { 
  },

  props: [

    'itemData',
    // 'dsId',

    // debug
    'cardWidth',
    'breakPoint',
    'cardHeights',

    'currentDsId'
  ],

  beforeMount() {
    console.log("C-CardData / beforeMount....")
    console.log("C-CardData / beforeMount / this.currentDsId : ", this.currentDsId )
    this.idField = this.currentIdField( this.dsId )
    this.resourcesList = this.getCardResourcesFields( this.dsId )
  },

  mounted: function() {
    console.log("C-CardData / mounted....")
  },

  data() {

    return {
      
      contentHeight: 0,
      idField: undefined,
      resourcesList: undefined,

      findMoreActive: false,

      // debug cookies
      triggerFav : false,

    }
  },

  computed: {

    ...mapState({

      log : state => state.log, 
      locale : state => state.locale,

      dsId : state => state.cards.currentDsId,

      contentFields : state => state.data.contentFields,

      // itemIdField : state => state.users.itemIdField,

      favorites : state => state.users.favorites

    }),

    ...mapGetters({

      // favorites : 'users/getFavorites',
      currentIdField: 'data/getCurrentIdField',
      getContentField: 'data/getContentField',
      getCardResourcesFields: 'data/getCardResourcesFields',
      isInFavorites: 'users/isInFavorites',

    }),

    isFavorite(){

      // console.log("C-CardData-isFavorite / this.idField : ", this.idField)
      let itemId = this.itemData[ this.idField ]

      let itemPayload = {
        'itemDsId': this.dsId,
        'itemId': String(itemId),
      }
      return this.isInFavorites( itemPayload )
    },

    cookieContent(){
      let parsed = cookieparser.parse(document.cookie)
      console.log("C-CardData-cookieContent / parsed :", parsed)
      return parsed
    }

  },

  methods: {

    getContentByLocale( fieldCode ){

      // console.log("C-CardData-getContentByLocale..." )

      let currentLocale = this.locale
      // let contentFieldsObject = this.contentFields.find( fieldObj => {
      //   return this.dsId == fieldObj.dsId
      // }) 
      // let contentFields = contentFieldsObject.contentsFields
      // // console.log("C-CardData-getContentByLocale / contentFields : ", contentFields )

      // let contentColName = contentFields.find( field => {
      //   return fieldCode === field.itemAppFieldCode
      // })
      // let fieldByLocale = contentColName && contentColName[ currentLocale ]
      // console.log("C-CardData-getContentByLocale / fieldByLocale :", fieldByLocale)

      let fieldByLocale = this.getContentField( this.dsId, currentLocale, fieldCode )
      console.log("C-CardData-getContentByLocale / fieldByLocale :", fieldByLocale)

      // find correct field code
      return this.itemData[ fieldByLocale ]
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

      // debug cookies mobile 
      this.triggerFav = !this.triggerFav

      // InteractEventBus.$emit(EVENTS.MATCH)
      let payload = {
        item : this.itemData,
        dsId : this.dsId,
        idField : this.idField
      }
      // this.$store.dispatch('users/switchFavorite', this.cardData)
      this.$store.dispatch('users/switchFavorite', payload )

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

.limited-height{
  // max-height: 55vh;
  overflow-y: auto;
}

.close-to-plus-in{
  transform: rotate(45deg)
}

@keyframes rollin {
  0% { transform: rotate(0); }
  100% { transform: rotate(45deg); }
}
@keyframes rollout {
  0% { transform: rotate(0); }
  100% { transform: rotate(-45deg); }
}
.roll-in { 
  animation: rollin .5s cubic-bezier(0.55, 0.085, 0.68, 0.53) ; 
}
.roll-out { 
  animation: rollout .5s cubic-bezier(0.55, 0.085, 0.68, 0.53) ; 
}


.slide-enter-active {
   -moz-transition-duration: 0.3s;
   -webkit-transition-duration: 0.3s;
   -o-transition-duration: 0.3s;
   transition-duration: 0.3s;
   -moz-transition-timing-function: ease-in;
   -webkit-transition-timing-function: ease-in;
   -o-transition-timing-function: ease-in;
   transition-timing-function: ease-in;
}

.slide-leave-active {
   -moz-transition-duration: 0.3s;
   -webkit-transition-duration: 0.3s;
   -o-transition-duration: 0.3s;
   transition-duration: 0.3s;
   -moz-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
   -webkit-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
   -o-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
   transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
}

.slide-enter-to, .slide-leave {
   max-height: 100px;
   overflow: hidden;
}

.slide-enter, .slide-leave-to {
   overflow: hidden;
   max-height: 0;
}

.near-icon{
  min-width: 30px;
}


</style>
