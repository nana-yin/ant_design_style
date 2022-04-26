
/**
 * history pushState无刷新修改url
 * @param {string} url
 * @param {string} queryParams
 * @returns {String}
 */
export function pushState(queryParams) {
  const url = location.hash
  const arr = url.split('?')
  if (arr.length > 1) arr.splice(1, 1)
  let query = ''
  for (const key in queryParams) {
    query = query + '&' + key + '=' + queryParams[key]
  }
  query = query.substring(1)
  const uri = `${arr[0]}?${query}`
  history.pushState({ url: uri }, '', uri)
}
