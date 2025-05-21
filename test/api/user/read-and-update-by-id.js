let agent
let mockData

before(() => {
  agent = require('test/lib/agent')
  mockData = require('test/lib/mock-data')
})

describe('api', () => {
  describe('user', () => {
    describe('update-by-id', () => {
      let user1Auth
      let user2Auth

      before(async () => {
        user1Auth = await mockData.mockAuthAndUser()
        user2Auth = await mockData.mockAuthAndUser()
      })

      it('should fail to update another user', async () => {
        const updateData = {
          firstName: 'Updated',
          lastName: 'Name'
        }

        await agent
          .client()
          .put(`/user/${user2Auth.user}`)
          .set('authorization', user1Auth.token)
          .send(updateData)
          .expect(403)
          .promise()
      })
    })
  })
})
