<template>

  <!-- <v-layout
    fill-height
    justify-center
    align-center
    > -->

    <!-- class="mx-auto" -->
    <v-card
      color="primary rounded-borders"
      class=""
      dark
      >

          <v-layout 
            fill-height
            align-center
            justify-center
            >

      <!-- <v-card-title>
        <v-icon
          large
          left
          >
          mdi-twitter
        </v-icon>
        <span class="title font-weight-light">
          Twitter
        </span> 
      </v-card-title> -->


      <v-card-text class="headline font-weight-bold text-xs-center">
        {{ cardData && cardData['content-fr'] }}
      </v-card-text>

      </v-layout> 
      <!-- 
      <v-card-actions>
        <v-list-tile class="grow">
        </v-list-tile>
      </v-card-actions> 
      -->


      <v-footer 
        color="transparent" 
        class="pa-4"
        fixed
        height="100"
        >

        <v-layout
          align-center
          justify-end
          >
          <v-icon class="mr-1">
            favorite
          </v-icon>

        </v-layout>

      </v-footer>


    </v-card>

  <!-- </v-layout> -->

</template>


<script>

// based and adapted from : https://www.josephharveyangeles.com/blog/2019/kittynder

import { mapState, mapGetters, mapActions } from 'vuex'

export default {

  name: 'CardData',

  components: { 
  },

  props: [
    'cardData'
  ],

  mounted: function() {
    console.log("C-CardData / mounted....")
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

  },

  methods: {


  }
}
</script>

<style lang="scss" scoped>

.rounded-borders {
  border-radius: 12px;
}

</style>
