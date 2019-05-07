import * as urlParser from "url";

import { objectType, optionalStr, optionalProps, parseUrlType } from "./types";
import { isStr, isObj, isArr, isEmpty } from "./utils";
/*
No error handling because this is quite straightforward;
*/
class QueryBuilder {
  public url: string;
  public parsedUrl: parseUrlType;
  constructor(url: string = "") {
    this.url = url;
    this.parsedUrl = urlParser.parse(this.url, true);
  }
  buildUrl(url: string, params?: objectType | string) {
    this.url = urlParser.format({
      pathname: url,
      search: isStr(params) ? params : null,
      query: isObj(params) ? params : null
    });
    this.parsedUrl = urlParser.parse(this.url, true);
  }
  toString(): string {
    return this.url;
  }
  getAll(toString: boolean = false): objectType | string {
    // get all query
    if (toString) {
      return this.parsedUrl.search;
    }
    if (isEmpty(this.parsedUrl.query)) {
      return null;
    }
    return this.parsedUrl.query;
  }
  get(props: string): string {
    // get the value of a query props.
    return this.parsedUrl.query[props];
  }
  // can't figure out why Typescript is complaining about string | string[];
  has(params: any): boolean {
    // check if one or multiple query params exsit.
    // if its multiple then the input needs to be an array.
    if (isArr(params)) {
      return params.every(props => Boolean(this.parsedUrl.query[props]));
    } else {
      return Boolean(this.parsedUrl.query[params]);
    }
  }
  delete(props: string): undefined | string {
    if (this.has(props)) {
      const obj = this.parsedUrl.query;
      const baseUrl = this.parsedUrl.pathname;
      delete obj[props];
      this.buildUrl(baseUrl, obj);
      return this.url;
    } else {
      return undefined;
    }
  }
  reset(): string {
    // delete all the query params, returns the clean path.
    const baseUrl = this.parsedUrl.pathname;
    this.buildUrl(baseUrl);
    return this.url;
  }
  set(props: string, value: any): undefined | string {
    if (this.has(props)) {
      const obj = { ...this.parsedUrl.query, [props]: value };
      const baseUrl = this.parsedUrl.pathname;
      this.buildUrl(baseUrl, obj);
      return this.url;
    }
    return undefined;
  }
}

export default QueryBuilder;
