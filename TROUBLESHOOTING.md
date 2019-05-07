## Troubleshooting.

* The return url will be the pathname, not the entire website url, that means you need to combine them yourself:

```
const website = 'https://mywebsite.com';
const url = '/home';
const query = { section: 'room' };
const builder = new QueryBuilder(url, query);
const fullPath = `${website}${builder.toString()}` // https://mywebsite.com/home?section=room
```

* If the value of a search params is number, you need to parse it your self as the following:

```
const url = '/home';
const query = { page: 1 };
const builder = new QueryBuilder();
builder.buildUrl(url,query);
const page = builder.get('page'); // it will return '1';
const pageNumber = Number(page); or parseInt(page, 10); // this will return 1.
```
