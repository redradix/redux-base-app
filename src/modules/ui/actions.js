const MODULE_NAME = "base-app/ui/"

export const SELECTED_ITEM_ON_AUTOCOMPLETE = MODULE_NAME.concat("UI:SELECTED_ITEM_ON_AUTOCOMPLETE")

export function selectItemOnAutocomplete(payload) {
  return {
    type: SELECTED_ITEM_ON_AUTOCOMPLETE,
    payload
  }
}

