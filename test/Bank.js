const assertThrowsAsync = require('./assertThrows.js')
const Bank = artifacts.require("./Bank.sol")

contract('Bank', () => {
  it('should have empty balance on cration', async () => {
    bank = await Bank.deployed()
    balance = await bank.balance()
    assert.equal(balance, 0, 'balance was not 0')
  })

  it('should notice deposits', async () => {
    bank = await Bank.deployed()
    await bank.deposit(500)
    balance = await bank.balance()
    assert.equal(balance, 500, 'balance was not increased')
  })

  it('should notice withdrawals', async () => {
    bank = await Bank.deployed()
    await bank.withdraw(200)
    balance = await bank.balance()
    assert.equal(balance, 300, 'balance was not decreased')
  })

  it('should fail to withdraw too much', async () => {
    bank = await Bank.deployed()
    await assertThrowsAsync(
      async () => { await bank.withdraw(500) },
      /VM Exception while processing transaction: revert/
    )
    assert.equal(balance, 300, 'balance was unchanged')
  })
})