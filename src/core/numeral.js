import numeral from 'numeral'
import { t } from 'core/i18n'

numeral.defaultFormat(t('format:number', '0,0.00'))

export const n = (number, format) => numeral(number).format(format)

export const c = number => n(number, t('format:currency', '$0,0.00'))

// NOTE: We do `number / 100` because ims uses 0..100 for percentages, instead of 0..1
export const p = number => n(number / 100, t('format:percentage', '[00].[0]%'))

export default numeral
