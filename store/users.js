// store for users

import Cookie from 'js-cookie'
// import { DataIdFields } from '~/config/dataContentFields'

export const state = () => ({

  infos : undefined,

  // itemIdField : 'card-id',
  // idFields : DataIdFields,

  favorites : [ ],
  
})

export const getters = {

  getFavorites : state => {
    console.log("S-users-G-getFavorites / state.favorites : ", state.favorites)
    // return state.favorites.filter( dsFav => {
    //   return dsFav.favorites.filter( fav => {
    //     return fav !== 'undefined' 
    //   })
    // })
    return state.favorites
  },

  // getCurrentIdField : state => dsId => {
  //   // console.log("S-users-G-getCurrentIdField / dsId : ", dsId)
  //   let idFieldObject = state.idFields.find( f => {
  //     return dsId === f.dsId
  //   })
  //   // console.log("S-users-G-getCurrentIdField / idFieldObject : ", idFieldObject)
  //   return idFieldObject.idField 
  // },
  
  isInFavorites : state => itemPayload => {

    // console.log("\nS-users-G-isInFavorites / itemPayload : ", itemPayload)
    let dsId = itemPayload.itemDsId
    let itemId = itemPayload.itemId

    // console.log("S-users-G-isInFavorites / state.favorites : ", state.favorites)

    let isInFavorites = state.favorites.find( dsFav => {

      let isDsId = (dsFav.dsId === dsId)? true : false
      // console.log("S-users-G-isInFavorites / isDsId : ", isDsId)

      let isItemIdInDsFavorites = false 
      if ( isDsId ){
        isItemIdInDsFavorites = dsFav.favorites.includes( itemId )
      }
      return isDsId && isItemIdInDsFavorites
    })


    // console.log("S-users-G-isInFavorites / isInFavorites : ", isInFavorites)
    return isInFavorites
  }

}

export const mutations = {

  resetFavorites (state){
    state.favorites = []
  },

  setFavorites (state, favorites ){
    state.favorites = favorites
  },

  appendToFavorites (state, { itemDsId, itemId }) {

    console.log("S-users-M-appendToFavorites / itemDsId : ", itemDsId)
    let dsFavorites = state.favorites.find( dsFavs => { return dsFavs.dsId === itemDsId } )

    let isItemIdDefined = itemId !== "undefined"

    // existing ds fav list
    if ( isItemIdDefined && dsFavorites ) {
      let dsFavList = dsFavorites.favorites.push( itemId )
    } 

    // new ds fav list
    else if ( isItemIdDefined && !dsFavorites ) {
      let newDsFavs = {
        dsId : itemDsId,
        favorites : [ itemId ]
      }
      state.favorites.push(newDsFavs)

    }

  },

  deleteFromFavorites (state, { itemDsId, itemId } ) {
    
    console.log("\nS-users-M-switchFavorite / itemDsId : ", itemDsId)
    console.log("S-users-M-switchFavorite / itemId : ", itemId)

    let dsFavorites = state.favorites.find( dsFavs => {
      return dsFavs.dsId === itemDsId
    })
    let newArray = dsFavorites.favorites.filter( item => {
      return item !== itemId && item !== "undefined"
    })
    
    // temporarily delete whole dsId favs
    state.favorites = state.favorites.filter( dsFavs => { return dsFavs.dsId !== itemDsId } )

    // re-append dsId favs to list
    state.favorites.push({ dsId: itemDsId, favorites : newArray })
  }

}

export const actions = {

  switchFavorite({state, commit, getters}, { item, dsId, idField } ){

    console.log("\nS-users-A-switchFavorite / item : ", item)
    console.log("S-users-A-switchFavorite / dsId : ", dsId)
    console.log("S-users-A-switchFavorite / idField : ", idField)

    let itemId = String( item[ idField ] )
    console.log("S-users-A-switchFavorite / itemId : ", itemId)

    let itemPayload = {
      'itemDsId': dsId,
      'itemId': itemId,
    }

    // add/delete favorite in/from store
    // let isInFavorites = state.favorites.find( dsFav => {
    //   let isDsId = dsFav.dsId === dsId
    //   let isItemIdInDsFavorites = false 
    //   if ( isDsId ){
    //     isItemIdInDsFavorites = dsFav.favorites.includes( itemId )
    //   }
    //   return isDsId && isItemIdInDsFavorites
    // })
    let isInFavorites = getters.isInFavorites( itemPayload )

    if ( isInFavorites ){
      console.log("S-users-A-switchFavorite / deleteFromFavorites ... ")
      commit('deleteFromFavorites', itemPayload)
    } 
    
    else {
      console.log("S-users-A-switchFavorite / appendToFavorites ... ")
      commit('appendToFavorites', itemPayload)
    }

    // set cookie/favorites
    let cookieFavorites = Cookie.get('favorites')
    console.log("S-users-A-switchFavorite / cookieFavorites : ", cookieFavorites)

    let favoritesForCookie = JSON.stringify(getters.getFavorites)
    console.log("S-users-A-switchFavorite / favoritesForCookie : ", favoritesForCookie)
    
    Cookie.set('favorites', favoritesForCookie )
    
  }

}