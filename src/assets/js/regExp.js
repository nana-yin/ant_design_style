/**
 * @file 正则校验
 * @Author heyuze
 * @Date 2018-12-15
 */

// 非负整数
export const NON_NEG_INTEGER = /^\d+$/
// 正整数
export const POSITIVE_INTEGER = /^[1-9][0-9]*$/
// 1位小数
export const DECIMAL_STEP_1 = /^([1-9]\d*|0)(\.\d{1})?$/
// 2位小数
export const DECIMAL_STEP_2 = /^([1-9]\d*|0)(\.\d{1,2})?$/
// 4位小数
export const DECIMAL_STEP_4 = /^([1-9]\d*|0)(\.\d{1,4})?$/
