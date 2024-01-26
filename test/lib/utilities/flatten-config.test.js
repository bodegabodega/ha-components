import { describe, expect, test } from 'vitest'
import flattenConfig from '../../../src/lib/utilities/flatten-config';

describe('flattenConfig', () => {
  test('empty config', () => {
    expect(flattenConfig({})).toEqual({
      visibleToUser: true
    })
  })
  test('no users', () => {
    expect(flattenConfig({
      nachos: true
    })).toEqual({
      visibleToUser: true,
      nachos: true
    })
  })
  test('empty users', () => {
    expect(flattenConfig({
      users: {}
    })).toEqual({
      visibleToUser: false,
      users: {}
    })
  })
  test('no users or state', () => {
    expect(flattenConfig({
      nachos: true
    }, null)).toEqual({
      visibleToUser: true,
      nachos: true
    })
  })
  test('users but no state', () => {
    expect(flattenConfig({
      nachos: true,
      users: {
        'one': null
      }
    }, null)).toEqual({
      visibleToUser: true,
      nachos: true,
      users: {
        'one': null
      }
    })
  })
  test('users but not user', () => {
    expect(flattenConfig({
      nachos: true,
      users: {
        'one': null
      }
    }, {
      user: {
        id: 'two'
      }
    })).toEqual({
      visibleToUser: false,
      nachos: true,
      users: {
        'one': null
      }
    })
  })
  test('current user without user config', () => {
    expect(flattenConfig({
      nachos: true,
      users: {
        'one': null
      }
    }, {
      user: {
        id: 'one'
      }
    })).toEqual({
      visibleToUser: true,
      nachos: true,
      users: {
        'one': null
      }
    })
  })
  test('current user with user config', () => {
    expect(flattenConfig({
      nachos: true,
      users: {
        'one': {
          tacos: true,
          nachos: false
        }
      }
    }, {
      user: {
        id: 'one'
      }
    })).toEqual({
      visibleToUser: true,
      tacos: true,
      nachos: false,
      users: {
        'one': {
          tacos: true,
          nachos: false
        }
      }
    })
  })
})