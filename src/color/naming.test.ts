import { namingMatchName, namingNearestName } from './naming'

test('Sample test', () => {
  const name = namingMatchName('#ffffff')
  expect(name).toBe('white')
})
