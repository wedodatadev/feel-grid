// store for users

import Cookie from 'js-cookie'

export const state = () => ({

  infos : undefined,

  itemIdField : 'card-id',

  favorites : [ "2", "11", "8", "1" ],
  
})

export const getters = {
  getFavorites : state => {
    return state.favorites
  }
}

export const mutations = {

  resetFavorites (state){
    state.favorites = []
  },

  setFavorites (state, favorites ){
    state.favorites = favorites
  },

  appendToFavorites (state, itemId) {
    state.favorites.push( itemId )
  },

  deleteFromFavorites (state, itemId) {
    let newArray = state.favorites.filter( item => {
      return item != itemId
    })
    state.favorites = newArray
  }

}

export const actions = {

  switchFavorite({state, commit, getters}, item ){
    
    console.log("S-users-A-switchFavorite / item : ", item)

    let itemId = String(item[ state.itemIdField ])
    console.log("S-users-A-switchFavorite / itemId : ", itemId)

    // add/delete favorite in/from store
    let isInFavorites = state.favorites.includes( itemId )
    if (isInFavorites){
      console.log("S-users-A-switchFavorite / deleteFromFavorites ... ")
      commit('deleteFromFavorites', itemId)
    } else {
      console.log("S-users-A-switchFavorite / appendToFavorites ... ")
      commit('appendToFavorites', itemId)
    }

    // set cookie/favorites
    let cookieFavorites = Cookie.get('favorites')
    console.log("S-users-A-switchFavorite / cookieFavorites : ", cookieFavorites)

    let favoritesForCookie = JSON.stringify(getters.getFavorites)
    console.log("S-users-A-switchFavorite / favoritesForCookie : ", favoritesForCookie)
    
    Cookie.set('favorites', favoritesForCookie )

    // if ( !cookieFavorites ){
    //   // Cookie.set('favorites', favoritesForCookie )
    // } else {
    //   // Cookie.set('favorites', favoritesForCookie )
    // }
    
  }

}