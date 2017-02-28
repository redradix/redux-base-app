import { combineReducers } from 'redux'
import {reducer as formReducer} from 'redux-form'
import {routerReducer as routing} from 'react-router-redux'
import ui, {init as initUI} from 'modules/ui'
import filters, {init as initFilters} from 'modules/filters'
import entitiesReducer, { moduleName as entitiesPath } from 'modules/entities'
import dataReducer, { moduleName as dataPath } from 'modules/data'
import communication, {init as initCommunication} from 'modules/communication'
import pagination, {init as initPagination} from 'modules/pagination'
import config, {init as initConfig} from 'modules/config'

export const initializers = {
  ui: initUI,
  filters: initFilters,
  communication: initCommunication,
  pagination: initPagination,
  config: initConfig
}

const rootReducer = combineReducers({
  [dataPath]: dataReducer,
  [entitiesPath]: entitiesReducer,
  ui,
  filters,
  communication,
  pagination,
  config,
  routing,
  form: formReducer
})

export default rootReducer
