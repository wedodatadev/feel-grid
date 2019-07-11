<template>

  <div>

    <v-toolbar 
      color="transparent" 
      :dark="!isDrawerLeft"
      flat
      fixed
      >

      <!-- <v-toolbar-side-icon></v-toolbar-side-icon> -->

      <!-- BTN HOME -->
      <!-- <v-btn 
        icon
        to="/">
        <v-icon>fas fa-home</v-icon>
      </v-btn> -->

      <!-- TITLE -->
      <!-- <v-toolbar-title 
        class="white--text"
        to="/">
        {{ $t('basicDict.welcome')}}
      </v-toolbar-title> -->

      <v-spacer></v-spacer>

      <!-- <v-toolbar-title
        class="primary--text"
        >
        {{ mainLogoUrl }}
      </v-toolbar-title> -->

      <v-spacer></v-spacer>

      <!-- BTN SEARCH -->
      <!-- <v-btn icon>
        <v-icon>search</v-icon>
      </v-btn> -->

      <!-- BTN FAVS -->
      <!-- <v-btn icon>
        <v-icon>favorite</v-icon>
      </v-btn> -->


      <!-- LOCALES -->
      <v-menu 
        v-if="isDrawerLeft"
        offset-y 
        open-on-hover 
        nudge-bottom 
        nudge-left
        >
        
        <template 
          v-slot:activator="{ on }"
          >
          <v-toolbar-title 
            v-on="on"
            >
            
            <span
              class="text-uppercase grey--text subheading"
              >
              {{ locale }}
            </span>

            <v-icon
              color="grey"
              >
              arrow_drop_down
            </v-icon>
          </v-toolbar-title>
        </template>

        <v-list>

          <v-list-tile
            v-for="loc in locales"
            :key="loc.code"
            @click="changeLocale(loc)"
            >
            
            <v-list-tile-title
              :class="`${ loc.code !== locale ? 'font-weight-thin' : ''}`"
              >
              {{ loc.name }}
            </v-list-tile-title>

          </v-list-tile>

        </v-list>
      </v-menu>


      <!-- <v-toolbar-side-icon
        v-show="!isDrawerLeft"
        color="primary"
        @click.stop="drawer = !drawer"
        >
      </v-toolbar-side-icon> -->
      <v-btn
        v-show="!isDrawerLeft"
        icon
        flat
        color="primary"
        @click.stop="drawer = !drawer"
        >
        <v-icon>
          fas fa-bars
        </v-icon>
      </v-btn>


      <!-- BTN MORE VERT -->
      <!-- <v-btn icon>
        <v-icon>more_vert</v-icon>
      </v-btn> -->


    </v-toolbar>


    <!-- DRAWER RIGHT -->
    <v-navigation-drawer
      v-model="showDrawer"
      absolute
      floating
      :right="!isDrawerLeft"
      :class="isDrawerLeft ? 'transparent' : 'grey'"
      style="z-index: 50"
      :dark="!isDrawerLeft"
      >

      <!-- temporary -->
      <v-list class="pt-0" dense>

        <!-- CLOSE DRAWER -->
        <div
          class="text-xs-right"
          >
          <v-btn 
            v-show="!isDrawerLeft"
            flat
            icon
            small
            @click.stop="drawer = !drawer"
            >
            <v-icon>
              close
            </v-icon>
          </v-btn>
        </div>

        <v-divider
          v-show="!isDrawerLeft"
          >
        </v-divider>

        <!-- LOCALES -->
        <v-list-tile
          v-show="!isDrawerLeft"
          v-for="(loc, index) in locales"
          :key="index"
          @click="changeLocale(loc)"
          >
          <v-list-tile-content>
            <v-list-tile-title
              :class="`text-uppercase ${ (loc.code === locale)? '' : 'font-weight-thin' }`"
              >
              {{ loc.code }}
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-divider          
          v-show="!isDrawerLeft"
          >
        </v-divider>


        <br>

        <!-- LINKS -->
        <v-list-tile
          v-for="item in items"
          :key="item.title"
          :to="item.to"
          >
          <v-list-tile-action
            v-if="item.icom">
            <v-icon>
              {{ item.icon }}
            </v-icon>
          </v-list-tile-action>

          <!-- LINK TITLE -->
          <v-list-tile-content>
            <v-list-tile-title 
              class="text-uppercase"
              @click="drawer=false"
              >

              {{ $t( 'drawer.'+ item.titleCode)  }}

            </v-list-tile-title>
          </v-list-tile-content>

        </v-list-tile>

      </v-list>

    </v-navigation-drawer>

  </div>



</template>


<script>

import { mapState, mapGetters, mapActions } from 'vuex'

export default {

  name: "Navbar",

  components: {
  },

  props: [
  ],

  data: () => ({

    drawer: false,

    fullDrawerLeftBreakpoints : ['lg', 'xl'],

    items: [
      { titleCode: 'homepage', icon: 'home', to:"/" },
      { titleCode: 'favorites', icon: 'favorite', to:"/favorites" },
      { titleCode: 'about', icon: 'question_answer', to:"/about" },
      { titleCode: 'credits', icon: 'question_answer', to:"/credits" }
    ],

  }),


  computed: {

    ...mapState({
      log : state => state.log, 
      locale : state => state.locale,
      locales : state => state.locales,

      mainLogoUrl : state => state.mainLogoUrl, 
    }),

    ...mapGetters({
      // localeCode : 'getCurrentLocaleCode',
    }),

    isDrawerLeft() {
      let screenBreakPoint = this.$vuetify.breakpoint.name
      return this.fullDrawerLeftBreakpoints.includes(screenBreakPoint)
    },

    showDrawer(){
      return this.isDrawerLeft || this.drawer ? true : false 
    },

  },

  methods: {

    changeLocale(loc){
      this.$i18n.locale = loc.code
      this.$store.commit('switchLocale', loc)
    },



  },


}
</script>