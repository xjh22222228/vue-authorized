import { mount } from '@vue/test-utils'
import Authorized, { setPermissions } from '../Authorized'

const mockPerm = [
  'user:add',
  true,
  false,
  undefined,
  null
]

describe('<Authorized />', () => {
  beforeEach(() => {
    setPermissions(mockPerm)
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
})
