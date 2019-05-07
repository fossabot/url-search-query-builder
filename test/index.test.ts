import QueryBuilder from '../src';

const baseUrl = '/home';

describe('Query builder', () => {
  test('Builds the url with params', () => {
    const builder = new QueryBuilder();
    const result1 = `${baseUrl}?project=actively-maintain&category=programing`;
    const result2 = `${baseUrl}?project=actively-maintain&category=music`
    builder.buildUrl(baseUrl, 'project=actively-maintain&category=programing');
    expect(builder.toString()).toBe(result1);
    builder.buildUrl(baseUrl, {
      project: 'actively-maintain',
      category: 'music'
    });
    expect(builder.toString()).toBe(result2);
  })
  test('Gets all the queries', () => {
    const builder1 = new QueryBuilder(`${baseUrl}?project=actively-maintain&category=programing`);
    expect(builder1.getAll()).toEqual({ project: 'actively-maintain', category: 'programing' });
    expect(builder1.getAll(true)).toBe('?project=actively-maintain&category=programing');
    const builder2 = new QueryBuilder();
    builder2.buildUrl(baseUrl, 'project=actively-maintain&category=music');
    expect(builder2.getAll()).toEqual({ project: 'actively-maintain', category: 'music' });
    expect(builder2.getAll(true)).toBe('?project=actively-maintain&category=music');
    builder2.reset();
    expect(builder2.getAll()).toBe(null);
  })
  test('Gets the value of a props', () => {
    const builder = new QueryBuilder(`${baseUrl}?page=1&project=actively-maintain&category=programing`);
    expect(builder.get('project')).toBe('actively-maintain');
    expect(builder.get('category')).toBe('programing');
    expect(builder.get('page')).toBe('1');
    expect(builder.get('')).toBe(undefined);
  })
  test('Has', () => {
    const builder = new QueryBuilder(`${baseUrl}`);
    expect(builder.has('page')).toBeFalsy;
    builder.buildUrl(baseUrl, { page: 2 })
    expect(builder.has('page')).toBe(true);
  })
  test('Delete', () => {
    const builder = new QueryBuilder();
    builder.buildUrl(baseUrl, { page: 2, product: 'clothing' })
    expect(builder.has('page')).toBe(true);
    builder.delete('page');
    expect(builder.has('page')).toBeFalsy;
  })
  test('Reset', () => {
    const builder = new QueryBuilder();
    builder.buildUrl(baseUrl, { page: 2, product: 'clothing' });
    builder.reset();
    expect(builder.toString()).toBe(baseUrl);
  })
  test('Set', () => {
    const builder = new QueryBuilder();
    builder.buildUrl(baseUrl, { page: 2, product: 'clothing' });
    builder.set('page', 2);
    builder.set('product', 'helmet');
    expect(builder.get('page')).toBe('2');
    expect(builder.get('product')).toBe('helmet');
  })
})
