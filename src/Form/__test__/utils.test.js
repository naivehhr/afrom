import 'jest';
import { cleanObj, getType, isEmpty, get } from '../utils';

test('get', () => {
  const obj = {
    a: 1,
    a1: [1, 2, 3],
    a3: [
      {
        a31: 31,
        a32: [32],
      },
    ],
    a4: {
      a41: {
        a42: {
          a43: '43',
          a431: '431',
        },
      },
    },
    a5: [[[1], [2, 4], 7], [10]],
  };
  const p1 = 'a';
  const p2 = 'a1[1]';
  const p3 = 'a3[0].a31';
  const p4 = 'a4.a41.a42.a431';
  const p5 = 'a5[0][0]';
  const p6 = 'a6';
  const p7 = '';
  const p8 = undefined;

  expect(get(obj, p1)).toEqual(1);
  expect(get(obj, p2)).toEqual(2);
  expect(get(obj, p3)).toEqual(31);
  expect(get(obj, p4)).toEqual('431');
  expect(get(obj, p5)).toEqual([1]);
  expect(get(obj, p6)).toEqual(undefined);
  expect(get(obj, p7)).toEqual(undefined);
  expect(get(obj, p8)).toEqual(undefined);
});

test('isEmpty', () => {
  const v1 = [];
  const v2 = [1];
  const v3 = {};
  const v4 = { a: 1 };
  const v5 = '';
  const v6 = '1';
  const v7 = undefined;
  const v8 = null;
  const v9 = 0;
  const v10 = 1;
  expect(isEmpty(v1)).toBe(true);
  expect(isEmpty(v2)).toBe(false);
  expect(isEmpty(v3)).toBe(true);
  expect(isEmpty(v4)).toBe(false);
  expect(isEmpty(v5)).toBe(true);
  expect(isEmpty(v6)).toBe(false);
  expect(isEmpty(v7)).toBe(true);
  expect(isEmpty(v8)).toBe(true);
  expect(isEmpty(v9)).toBe(false);
  expect(isEmpty(v10)).toBe(false);
});

test('getType', () => {
  const a = 1;
  const a1 = '1';
  const a2 = { a2: 1 };
  const a3 = [3];
  const a4 = undefined;
  const a5 = null;
  expect(getType(a)).toBe('number');
  expect(getType(a1)).toBe('string');
  expect(getType(a2)).toBe('object');
  expect(getType(a3)).toBe('array');
  expect(getType(a4)).toBe('undefined');
  expect(getType(a5)).toBe('null');
});

test('cleanObj', () => {
  const obj = {
    a: 1,
    b: '',
    c: undefined,
    d: null,
    e: {},
    f: [{ f3: '' }, { f4: 44 }],
    g: 0,
    age: {
      age1: {
        age2: {
          name: '',
          name1: '',
        },
      },
    },
  };
  expect(cleanObj(obj)).toEqual({
    a: 1,
    g: 0,
    f: [{ f4: 44 }],
  });
});
