import { mount } from '@vue/test-utils'
import Authorized from '../Authorized'

const mockPerm = [
  'user:add',
  true,
  false,
  undefined,
  null
]

describe('<Authorized />', () => {
  beforeEach(() => {
    Authorized.setPermissions(mockPerm)
  })


  describe('Test <Authorized />', () => {
    test('1.test authority prop', () => {
      const wrapper = mount(Authorized, {
        props: {
          authority: 'user:add'
        },
        slots: {
          default: 'hello',
        },
      })

      expect(wrapper.text()).toBe('hello')
    })

    test('2.test authority prop', () => {
      const wrapper = mount(Authorized, {
        props: {
          authority: ['user:add', 'abc']
        },
        slots: {
          default: 'hello',
        },
      })

      expect(wrapper.text()).toBe('hello')
    })

    test('3.test authority prop', () => {
      const wrapper = mount(Authorized, {
        props: {
          authority: ['abc']
        },
        slots: {
          default: 'hello',
        },
      })

      expect(wrapper.text()).toBe('')
    })
  })

  describe('test checked', () => {
    test('1. checked', () => {
      expect(Authorized.checked('user:add')).toBe(true)
      expect(Authorized.checked('user:add1')).toBe(false)
      expect(Authorized.checked('')).toBe(true)
      expect(Authorized.checked(null)).toBe(true)
      expect(Authorized.checked()).toBe(true)
      expect(Authorized.checked(false)).toBe(true)
      expect(Authorized.checked(false, null)).toBe(null)
    })
  })
})
