# url-search-query-builder

A shortcut utility that allows get,delete,reset,set operation to your url path's query, either for pagination, filter or for SEO optimization.

## Environment.

Works in browser, node(Also older node version) and serverless environment.

## Install

```
$ npm install url-search-query-builder --save

import QueryBuilder from 'url-search-query-builder';

```

## Prerequisite

You should use this if you need a shortcut and don't wanna bother. The functionality is basic but good enough for most of the usage.

## Why?

This is also useful if you are changing the url based on many conditions using the shallow routing in React/Vue which doesn't re-render.

For example:

```
this.props.history.replace(url);
```

## Example.

```
import QueryBuilder from 'url-search-query-builder';

const path = // it could be any, it could be '/home' or '/home?type='website', we don't know!
const builder = new QueryBuilder(path);

if(builder.getAll()) {
  const url = builder.toString();
  // means there's query in the url.
  this.props.history.replace(url);
} else {
  // means there's no query in the url;
  if(this.props.websiteType !== undefined) {
    builder.set('type', 'website');
  }
  const url = builder.toString();
  this.props.history.replace(url);
}
```

# Usage.

## Initialization

```
const path = '/something';
const builder = new QueryBuilder();
builder.buildUrl(path, { category: 'TV' }); // it can be object with key and value
builder.buildUrl(path, "category=TV"); // or it can be string;
```

Or

```
const path = '/something';
const query = { category: 'TV' } or "category=TV";
const builder = new QueryBuilder(path, query); // query can be empty.
```

## Has, get, set, delete, reset.

```
const path = '/something';
const query = { type: 'website', page: 1 };  '/something?type=website&page=1'
const builder = new QueryBuilder(path, query);

const hasPage = builder.has('page'); // true;
const hasPageAndType = builder.has(['page', 'type']); // can also be an array.

const pageNumebr = Number(builder.get('page'));

builder.set('type', 'media'); // '/something?type=media&page=1'

builder.delete('type'); // '/something?page=1'

builder.reset(); // '/something'

builder.buildUrl(path, { anything: anything }); // '/something?anything=anything';
```

## Test

```
npm run test
```

## TroubleShooting

- The return url will be the pathname, not the entire website url, that means you need to combine them yourself:

```
const website = 'https://mywebsite.com';
const url = '/home';
const query = { section: 'room' };
const builder = new QueryBuilder(url, query);
const fullPath = `${website}${builder.toString()}` // https://mywebsite.com/home?section=room
```

- If the value of a search params is number, you need to parse it yourself as the following:

```
const url = '/home';
const query = { page: 1 };
const builder = new QueryBuilder();
builder.buildUrl(url,query);
const page = builder.get('page'); // it will return '1';
const pageNumber = Number(page); or parseInt(page, 10); // this will return 1.
```

## Donation

If this project help you reduce time to develop, you can give me a cup of coffee :)

[![paypal](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=GJSPRG9RKSJLQ&source=url)
