// sql语句校验
export function antiSqlValid(value) {
  const reg = /select|update|delete|truncate|join|union|exec|insert|drop|count|'|"|=|;|>|<|%/i
  return reg.test(value)
}
