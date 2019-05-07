export type objectType = {
  [key: string]: any;
};
export type optionalStr = string | undefined | null;
export type optionalProps = objectType | null | undefined;
export type parseUrlType = {
  host?: optionalStr;
  hostname?: optionalStr;
  href?: optionalStr;
  path?: optionalStr;
  pathname?: optionalStr;
  port?: optionalStr;
  protocol?: optionalStr;
  query: optionalProps;
  search?: optionalStr;
  slashes?: boolean;
};

export default class QueryBuilder {}
