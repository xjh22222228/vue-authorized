import { mount } from '@vue/test-utils'
import Authorized from '../Authorized'

const mockPerm = [
  'user:add',
  true,
  false,
  undefined,
  null,
  123
]

describe('<Authorized />', () => {
  beforeEach(() => {
    Authorized.setPermissions(mockPerm)
  })


  describe('Test <Authorized />', () => {
    test('1(Have permission).test authority prop', () => {
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

    test('2(Have permission).test authority prop', () => {
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

    test('3(No permission).test authority prop', () => {
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

    test('4(No permission).test authority prop', () => {
      const wrapper = mount(Authorized, {
        props: {
          authority: ['abc']
        },
        slots: {
          default: 'hello',
          'no-match': '<span>hello</span>',
        },
      })

      expect(wrapper.html()).toBe('<span>hello</span>')
    })

    test('5(No permission).test no-match event', () => {
      const wrapper = mount(Authorized, {
        props: {
          authority: '3333333'
        }
      })
      expect(wrapper.emitted()).toHaveProperty('no-match')
    })

    test('6(No permission).test no-match event', () => {
      Authorized.setPermissions(null)
      const wrapper = mount(Authorized)
      expect(wrapper.emitted()).toHaveProperty('no-match')
    })

    test('7(No permission).test no-match event', async () => {
      Authorized.setPermissions(null)
      const wrapper = mount(Authorized, {
        props: {
          authority: 123
        }
      })
      expect(wrapper.emitted()).toHaveProperty('no-match')
    })
  })

  describe('Test checked', () => {
    test('1. Authorized.checked', () => {
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
