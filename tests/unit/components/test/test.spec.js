
const myDate = new Date().getFullYear()

describe('获取今年的年份', () => {
  it('今年的年份是否获取正确', () => {
    expect(myDate).toBe(2020)
  })
})
