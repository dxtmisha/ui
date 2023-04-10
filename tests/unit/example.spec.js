'use strict'
const __importDefault = (this && this.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { default: mod }
}
Object.defineProperty(exports, '__esModule', { value: true })
const test_utils_1 = require('@vue/test-utils')
const HelloWorld_vue_1 = __importDefault(require('@/components/HelloWorld.vue'))
describe('HelloWorld.vue', () => {
  it('renders _props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = (0, test_utils_1.shallowMount)(HelloWorld_vue_1.default, {
      props: { msg }
    })
    expect(wrapper.text()).toMatch(msg)
  })
})
// # sourceMappingURL=example.spec.js.map
