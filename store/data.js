// store for data

import { loadGoogleSheet, applyDataTypes, createDatasetHeaders } from "~/utils/loadGSheetData"

import { DataContentFields, CardResourcesFields, DataIdFields } from '~/config/dataContentFields'


export const state = () => ({

  log : process.env.LOG,

  // GOOGLE SHEET CONFIGS
  gSheetConfigsData: process.env.CONFIG_APP.gsheetConfigs_data,
  gSheetConfigsDicts: process.env.CONFIG_APP.gsheetConfigs_correspDicts,
  gSheetConfigsDataTypes: process.env.CONFIG_APP.gsheetConfigs_dataTypes,

  // GOOGLE SHEETS DATA
  datasets : [],
  correspondanceDicts : [],
  dataTypes : [],

  // data contents fields mapper
  contentFields : DataContentFields,
  resourcesFields : CardResourcesFields,
  idFields : DataIdFields,

  // isTypesApplied : false, 


  // OPTIONAL : QUERIES AND RESPONSES
  // query: undefined,


  //  OPTIONAL : SHUFFLE SEED
  shuffleIsSeeded : true,
  shuffleSeed : 1,

})

export const getters = {

  // GSHEET CONFIGS
  getGSheetConfigs : state => gSheetConfigName =>  {
    console.log("S-data-G-getGSheetConfigs / gSheetConfigName : ", gSheetConfigName)
    return state[ gSheetConfigName ]
  },

  // GSHEET DATA
  getDatasets: state => datasetName => {
    // console.log("S-data-G-getDatasets / datasetName : ", datasetName)
    return state[ datasetName ]
  },
  getOneDataset: state => ( datasetName, dsId ) => {
    console.log("S-data-G-getOneDataset / datasetName : ", datasetName)
    console.log("S-data-G-getOneDataset / dsId : ", dsId)
    console.log("S-data-G-getOneDataset / state[ datasetName ] : ", state[ datasetName ])
    return state[ datasetName ].find( d => {
      return d.dsId === dsId
    })
  },

  getConcatenatedDatasets: state => datasetName => {
    console.log("S-data-G-getConcatenatedDatasets ... ")
    let concatenated = []
    for (let dt of state[ datasetName ]){
      console.log("S-data-G-getConcatenatedDatasets / dt :", dt)
      let dtRows = dt.dataRows
      console.log("S-data-G-getConcatenatedDatasets / dtRows :", dtRows)
      concatenated = concatenated.concat( ...dtRows )
    }
    return concatenated
  },

  getConcatenatedDataTypes: state => {
    console.log("S-data-G-getConcatenatedDataTypes ... ")
    let concatenated = []
    for (let dt of state.dataTypes){
      console.log("S-data-G-getConcatenatedDataTypes / dt :", dt)
      let dtRows = dt.dataRows
      console.log("S-data-G-getConcatenatedDataTypes / dtRows :", dtRows)
      concatenated = concatenated.concat( ...dtRows )
    }
    return concatenated
  },

  getIsTypesApplied : state =>  {
    return state.isTypesApplied
  },

  getCurrentIdField : state => dsId => {
    // console.log("S-users-G-getCurrentIdField / dsId : ", dsId)
    let idFieldObject = state.idFields.find( f => {
      return dsId === f.dsId
    })
    // console.log("S-users-G-getCurrentIdField / idFieldObject : ", idFieldObject)
    return idFieldObject.idField 
  },

  getContentField: state => (dsId, currentLocale, fieldCode ) => {
    // console.log("S-data-G-getContentField ... ")

    let contentFieldsObject = state.contentFields.find( fieldObj => {
      return dsId == fieldObj.dsId
    }) 
    // console.log("S-data-G-getContentField / contentFieldsObject :", contentFieldsObject)
    let contentFields = contentFieldsObject.contentsFields
    let contentColName = contentFields.find( field => {
      return fieldCode === field.itemAppFieldCode
    })
    let fieldByLocale = contentColName && contentColName[ currentLocale ]
    // console.log("S-data-G-getContentField / fieldByLocale :", fieldByLocale)

    return fieldByLocale

  },

  getCardResourcesFields: (state) => (dsId) => {
    return state.resourcesFields.find( rscField => {
      return rscField.dsId === dsId  
    })
  },

  getOneItemFromDatasets: (state, getters, rootState, rootGetters) => ( dsId, itemId ) => {
    console.log("S-data-G-getOneItemFromDatasets ... ")

    let dataset = getters.getOneDataset('datasets', dsId )
    console.log("S-data-G-getOneItemFromDatasets / dataset :", dataset)

    // let idField = rootGetters['users/getCurrentIdField']( dsId )
    let idField = getters['getCurrentIdField']( dsId )
    console.log("S-data-G-getOneItemFromDatasets / idField :", idField)

    let itemData = dataset.dataRows.find( item => {
      // console.log("S-data-G-getOneItemFromDatasets / item :", item)
      return String(item[ idField ]) === String(itemId)
    })
    // console.log("S-data-G-getOneItemFromDatasets / itemData :", itemData)
    
    return itemData
  },

}

export const mutations = {

  // GSHEET DATA MUTATIONS
  setDatasets(state, datasetInfos) {
    console.log("S-data-M-setDatasets ...")
    state[ datasetInfos.datasetStoreKey ].push( datasetInfos.data )
  },
  setIsTypesApplied(state, status) {
    state.isTypesApplied = status
  },
  resetDatasets(state, datasetInfos) {
    console.log("S-data-M-setDatasets / datasets ")
    state[ datasetInfos.datasetStoreKey ] = []
  },

}

export const actions = {

  // GSHEET DATA OPERATIONS

  applyDataTypesToDatasets({state, commit, getters}){

    console.log("S-data-A-applyDataTypesToDatasets ... ")

    // get dataTypes 
    let currentDataTypes = getters['getDatasets']('dataTypes')
    console.log("S-data-A-applyDataTypesToDatasets / currentDataTypes : ", currentDataTypes)

    // TO DO 


    commit('setIsTypesApplied', true)

  },



  // reloadDatasets({state, commit, getters}){

  // },

}