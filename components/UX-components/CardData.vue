<template>

    <v-card
      color="primary rounded-borders"
      class=""
      dark
      >

      <!-- TEXT CONTENTS -->
      <v-layout 
        fill-height
        align-center
        justify-center
        >
        <v-card-text class="headline font-weight-bold text-xs-center">
          {{ cardData && getContentByLocale('mainContent') }}
        </v-card-text>
      </v-layout> 

      <!-- RESSOURCES CONTENTS -->
      <!-- TO DO -->

      <!-- FAVORITES FOOTER -->
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
          <v-btn 
            icon
            outline
            flat
            >
            <v-icon>
              favorite
            </v-icon>
          </v-btn>
        </v-layout>
      </v-footer>


    </v-card>

</template>


<script>

// based and adapted from : https://www.josephharveyangeles.com/blog/2019/kittynder

import { mapState, mapGetters, mapActions } from 'vuex'

export default {

  name: 'CardData',

  components: { 
  },

  props: [
    'cardData',
    'dsId'
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

      contentFields : state => state.data.contentFields,

    }),

  },

  methods: {

    getContentByLocale( fieldCode ){

      console.log("C-CardData-getContentByLocale..." )

      let currentLocale = this.locale
      let contentFields = this.contentFields[ this.dsId ]
      console.log("C-CardData-getContentByLocale / contentFields : ", contentFields )

      let contentColName = contentFields.find( field => {
        return fieldCode === field.cardFieldCode
      })
      let fieldByLocale = contentColName && contentColName[ currentLocale ]
      console.log("C-CardData-getContentByLocale / fieldByLocale :", fieldByLocale)

      // find correct field code
      return this.cardData[ fieldByLocale ]
    },

  }
}
</script>

<style lang="scss" scoped>

.rounded-borders {
  border-radius: 12px;
}

</style>
