import WebHook from '../src/webhook'
import {expect, test} from '@jest/globals'

test('can send', async () => {
  const inst = new WebHook('xxx')

  expect(typeof inst.send).toBe('function')
})
