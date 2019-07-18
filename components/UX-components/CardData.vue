<template>

    <v-card
      :color="'primary'"
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
        class="justify-center pa-0 absolutePos"
        :style="`max-height:${ cardHeights['title'] };height:${ cardHeights['title'] }`"
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
          :class="`absolutePos ${ findMoreActive ? '' : '' }`"
          :style="`height:${ cardHeights['content'] }; max-height:${ cardHeights['content'] }`"
          align-center
          justify-center
          >

          <v-flex
            v-show="!findMoreActive"
            class="text-xs-center px-5"
            >
            <!-- <v-card-text 
              > -->

              <p class="caption">
              <!-- currentDsId : {{ currentDsId }}<br> -->
              <!-- cookieContent : {{ cookieContent.locale }} <br> -->
              <!-- locale (store) : {{ locale }}<br> -->
              triggerHover : <code>{{ triggerHover }}</code><br>
              triggerFav : <code>{{ triggerFav }}</code><br>
              </p>

              <br>

              <p class="headline font-weight-bold ">
                {{ itemData && getContentByLocale('mainContent') }}
              </p>

              <!-- <p>
                <v-btn 
                  icon
                  flat
                  outline
                  dark
                  @click.native="switchFavorite"
                  >
                  <v-icon
                    :color="isFavorite ? 'pink' : 'white' "
                    >
                    favorite
                  </v-icon>
                </v-btn>
              </p> -->

            <!-- </v-card-text> -->
          </v-flex> 

        </v-layout> 
      </transition>


      <!-- <v-container fluid grid-list-xl> -->

        <!-- <v-layout row>

          <v-flex xs8 offset-xs2 justify-center>
            <v-card dark color="secondary">
              <v-card-text>two</v-card-text>
            </v-card>
          </v-flex>

          <v-flex xs2>
            <v-card dark color="accent">
              <v-card-text>three</v-card-text>
            </v-card>
          </v-flex>

        </v-layout> -->
        
      <!-- </v-container> -->


      <!-- RESSOURCES CONTENTS -->
      <v-layout 
        ref="cardMore"
        :class="`pb-3 absolutePos ${ findMoreActive ? '' : '' }`"
        :style="`z-index: 6; max-height:${ cardHeights['more'] }; height:${ cardHeights['more'] }`"
        row
        align-end
        >

        <!-- FIND MORE TITLE -->
        <v-flex 
          justify-center
          align-center
          xs8 offset-xs2
          class="text-uppercase text-xs-center"
          >
          <p class="mb-0">
            {{ $t('cards.findMore') }}
          </p>
          <v-btn 
            flat
            icon
            @click=" findMoreActive = !findMoreActive "
            :class="`ma-0 ${ findMoreActive? 'close-to-plus-out' : 'close-to-plus-in roll-in' }`"
            >
            <v-icon
              >
              close
            </v-icon>
          </v-btn>

        </v-flex>

          <!-- :style="`z-index:4; max-height:${ cardHeights['footer'] }; height:${ cardHeights['footer'] }`" -->
        <v-flex
          xs2
          color="transparent" 
          class="pr-2 absolutePos "
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
              @click.native="switchFavorite()"
              @mouseover="switchHover()"
              >
              <v-icon
                :color="isFavorite ? 'pink' : 'white' "
                >
                favorite
              </v-icon>
            </v-btn>
          </v-layout>
        </v-flex>

        <!-- BTN OPEN/CLOSE -->
        <!-- <v-flex xs12
          :class="`text-xs-center`"
          >
        </v-flex> -->
        
      </v-layout>

      <!-- FAVORITES FOOTER -->
        <!-- fixed
        floating -->
      <!-- <v-flex
        color="transparent" 
        class="px-2 absolutePos "
        :style="`z-index:4; max-height:${ cardHeights['footer'] }; height:${ cardHeights['footer'] }`"
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
      </v-flex> -->
    
      <!-- CONTENT RESOURCES -->
      <transition name="slide">
        <v-flex xs12
          class="absolutePos"
          :style="`height:${ cardHeights['content'] }`"
          v-show="findMoreActive"
          >
          <v-card-text
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

      // debug cookies - btns - mobile
      triggerHover : false,
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

    chooseBackground() {
      
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

    switchHover(){
      this.triggerHover = !this.triggerHover
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

.absolutePos{
  // position: absolute;
  // left: 50vw;
}
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
