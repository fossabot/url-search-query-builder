function isStr(arg?: any): boolean {
  return typeof arg === "string";
}
function isObj(arg?: any): boolean {
  return typeof arg === "object" && arg !== null;
}
function isArr(arg?: any): boolean {
  return Array.isArray(arg);
}
function isEmpty(obj?: any): boolean {
  return isObj(obj) && Object.keys(obj).length === 0;
}

export { isStr, isObj, isArr, isEmpty };
