import { buildQueryString } from '../src';

describe('buildQueryString', () => {
  it('should return a query string', () => {
    expect(
      buildQueryString({
        foo: 'bar',
        bar: 'baz'
      })
    ).toEqual('?foo=bar&bar=baz');
  });

  it('should transform an array to a comma separated list', () => {
    expect(
      buildQueryString({
        foo: 'bar',
        bar: ['one', 'two', 'three']
      })
    ).toEqual('?foo=bar&bar=one%2Ctwo%2Cthree');
  });

  it('should make array based parameters appear as a separate param for each of the values in array if disableCSV flag is given', () => {
    expect(
      buildQueryString(
        {
          foo: 'bar',
          bar: ['one', 'two', 'three']
        },
        false,
        true
      )
    ).toEqual('?foo=bar&bar=one&bar=two&bar=three');
  });

  it('maintains case if no lowerCase flag is given', () => {
    expect(buildQueryString({ foo: 'BAR' })).toBe('?foo=BAR');
  });

  it('returns all lowercase if lowerCase flag is given', () => {
    expect(buildQueryString({ foo: 'BAR' }, true)).toBe('?foo=bar');
  });

  it('Disable CSV array: should transform an array to a comma separated list', () => {
    expect(
      buildQueryString(
        {
          foo: 'bar',
          bar: ['one', 'two', 'three']
        },
        false,
        'array'
      )
    ).toEqual('?foo=bar&bar[]=one&bar[]=two&bar[]=three');
  });

  it('Disable CSV order_asc: should transform an array to a comma separated list', () => {
    expect(
      buildQueryString(
        {
          foo: 'bar',
          bar: ['one', 'two', 'three']
        },
        false,
        'order_asc'
      )
    ).toEqual('?foo=bar&bar[0]=one&bar[1]=two&bar[2]=three');
  });

  it('Disable CSV order_desc: should transform an array to a comma separated list', () => {
    expect(
      buildQueryString(
        {
          foo: 'bar',
          bar: ['one', 'two', 'three']
        },
        false,
        'order_desc'
      )
    ).toEqual('?foo=bar&bar[2]=one&bar[1]=two&bar[0]=three');
  });
});
