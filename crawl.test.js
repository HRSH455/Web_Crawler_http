const { normalizeURL, getURLsFromHTML } = require('./crawl.js')
const { test, expect } = require('@jest/globals')

test('normalizeURL protocol', () => {
  const input = 'https://www.geeksforgeeks.org/nodejs/'
  const actual = normalizeURL(input)
  const expected = 'geeksforgeeks.org/nodejs/'
  expect(actual).toEqual(expected)
})

test('normalizeURL slash', () => {
  const input = 'https://www.geeksforgeeks.org/nodejs/'
  const actual = normalizeURL(input)
  const expected = 'geeksforgeeks.org/nodejs'
  expect(actual).toEqual(expected)
})

test('normalizeURL capitals', () => {
  const input = 'https://www.GEEKSFORGEEKS.org/nodejs/'
  const actual = normalizeURL(input)
  const expected = 'geeksforgeeks.org/nodejs/'
  expect(actual).toEqual(expected)
})

test('normalizeURL http', () => {
  const input = 'https://www.GEEKSFORGEEKS.org/nodejs/'
  const actual = normalizeURL(input)
  const expected = 'geeksforgeeks.org/nodejs/'
  expect(actual).toEqual(expected)
})

test('getURLsFromHTML absolute', () => {
  const inputURL = 'https://www.geeksforgeeks.org/nodejs/'
  const inputBody = '<html><body><a href="https://www.geeksforgeeks.org/nodejs/"><span>geeksforgeeks></span></a></body></html>'
  const actual = getURLsFromHTML(inputBody, inputURL)
  const expected = [ 'https://www.geeksforgeeks.org/nodejs/' ]
  expect(actual).toEqual(expected)
})

test('getURLsFromHTML relative', () => {
  const inputURL = 'https://www.geeksforgeeks.org/nodejs/'
  const inputBody = '<html><body><a href="/Ref/one"><span>geeksforgeeks></span></a></body></html>'
  const actual = getURLsFromHTML(inputBody, inputURL)
  const expected = [ 'https://www.geeksforgeeks.org/nodejs//Ref/one' ]
  expect(actual).toEqual(expected)
})

test('getURLsFromHTML both', () => {
  const inputURL = 'https://www.geeksforgeeks.org/nodejs/'
  const inputBody = '<html><body><a href="/Ref/one"><span>geekforgeeks></span></a><a href="https://other.com/path/one"><span>geeksforgeeks></span></a></body></html>'
  const actual = getURLsFromHTML(inputBody, inputURL)
  const expected = [ 'https://www.geeksforgeeks.org/nodejs//Ref/one', 'https://other.com/Ref/one' ]
  expect(actual).toEqual(expected)
})

test('getURLsFromHTML handle error', () => {
  const inputURL = 'https://www.geeksforgeeks.org/nodejs/'
  const inputBody = '<html><body><a href="path/one"><span>geeksforgeeks></span></a></body></html>'
  const actual = getURLsFromHTML(inputBody, inputURL)
  const expected = [ ]
  expect(actual).toEqual(expected)
})
