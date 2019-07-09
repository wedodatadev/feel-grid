<template>

  <div>

    <v-toolbar 
      color="transparent" 
      dark
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

      <v-toolbar-title
        class="primary--text"
        >
        {{ mainLogoUrl }}
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-side-icon
        color="primary"
        @click.stop="drawer = !drawer"
        >
      </v-toolbar-side-icon>

      <!-- BTN SEARCH -->
      <!-- <v-btn icon>
        <v-icon>search</v-icon>
      </v-btn> -->

      <!-- BTN FAVS -->
      <!-- <v-btn icon>
        <v-icon>favorite</v-icon>
      </v-btn> -->


      <!-- LOCALES -->
      <!-- <v-menu offset-y open-on-hover nudge-bottom nudge-left>
        
        <template v-slot:activator="{ on }">
          <v-toolbar-title v-on="on">
            <span>{{ locale }}</span>
            <v-icon dark>arrow_drop_down</v-icon>
          </v-toolbar-title>
        </template>

        <v-list>

          <v-list-tile
            v-for="loc in locales"
            :key="loc.code"
            @click="changeLocale(loc)"
            >
            
            <v-list-tile-title 
              v-text="loc.name"
              >
            </v-list-tile-title>

          </v-list-tile>

        </v-list>
      </v-menu> -->


      <!-- BTN MORE VERT -->
      <!-- <v-btn icon>
        <v-icon>more_vert</v-icon>
      </v-btn> -->


    </v-toolbar>


    <!-- DRAWER RIGHT -->
    <v-navigation-drawer
      v-model="drawer"
      absolute
      floating
      right
      class="grey"
      style="z-index: 10"
      dark
      >

      <!-- temporary -->

      <v-list class="pt-0" dense>


        <!-- CLOSE DRAWER -->
        <div
          class="text-xs-right"
          >
          <v-btn 
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

        <v-divider></v-divider>

        <!-- LOCALES -->
        <v-list-tile
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


        <v-divider></v-divider>

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
    items: [
      { titleCode: 'homepage', icon: 'home', to:"/" },
      { titleCode: 'favorites', icon: 'favorite', to:"/favorites" },
      { titleCode: 'about', icon: 'question_answer', to:"/about" },
      { titleCode: 'credits', icon: 'question_answer', to:"/credits" }
    ]
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

  },

  methods: {

    changeLocale(loc){
      this.$i18n.locale = loc.code
      this.$store.commit('switchLocale', loc)
    },



  },


}
</script>