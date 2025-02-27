import { CoinType } from '@glif/filecoin-address'
import { createPath, extractCoinTypeFromPath } from '../utils'

describe('utils', () => {
  describe('createPath', () => {
    test('it creates a path based on an index and networkID', () => {
      expect(createPath(1, 1)).toBe("m/44'/1'/0'/0/1")
      expect(createPath(461, 2)).toBe("m/44'/461'/0'/0/2")
    })

    test('it hardens the first three path values', () => {
      const path = createPath(1, 1).split('/')
      expect(path[0][path[0].length - 1]).not.toBe("'")
      expect(path[1][path[1].length - 1]).toBe("'")
      expect(path[2][path[2].length - 1]).toBe("'")
      expect(path[3][path[3].length - 1]).toBe("'")
      expect(path[4][path[4].length - 1]).not.toBe("'")
      expect(path[5][path[5].length - 1]).not.toBe("'")
    })

    test('it throws an error when a bad network code is passed', () => {
      // @ts-expect-error
      expect(() => createPath(0, 1)).toThrow()
      expect(() => createPath(461, 2)).not.toThrow()
    })
  })

  describe('extractCoinTypeFromPath', () => {
    test('it extracts testnet and mainnet paths', () => {
      expect(extractCoinTypeFromPath(createPath(1, 0))).toBe(CoinType.TEST)
      expect(extractCoinTypeFromPath(createPath(461, 0))).toBe(CoinType.MAIN)
    })
  })
})
