import { combineReducers } from 'redux'
import { batchEnhancer } from 'utils/batch'
import { reducer as form } from 'redux-form'
import { routerReducer as routing } from 'react-router-redux'
import uiReducer, { moduleName as uiPath } from 'modules/ui'
import entitiesReducer, { moduleName as entitiesPath } from 'modules/entities-with-redux-query'
import dataReducer, { moduleName as dataPath } from 'modules/data'
import communicationReducer, { moduleName as communicationPath } from 'modules/communication'
import paginationReducer, { moduleName as paginationPath } from 'modules/pagination'
import configReducer, { moduleName as configPath } from 'modules/config'

let rootReducer = combineReducers({
  [dataPath]: dataReducer,
  [entitiesPath]: entitiesReducer,
  [paginationPath]: paginationReducer,
  [uiPath]: uiReducer,
  [configPath]: configReducer,
  [communicationPath]: communicationReducer,
  routing,
  form
})

rootReducer = batchEnhancer(rootReducer)

export default rootReducer
