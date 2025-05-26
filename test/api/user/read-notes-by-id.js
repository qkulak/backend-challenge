let should
let agent
let mockData

before(() => {
  should = require('should')
  agent = require('test/lib/agent')
  mockData = require('test/lib/mock-data')
})

describe('api', () => {
  describe('notes', () => {
    describe('read-notes-by-id', () => {
      let user1Auth
      let user2Auth

      before(async () => {
        user1Auth = await mockData.mockAuthAndUser()
        user2Auth = await mockData.mockAuthAndUser()

        await mockData.createNotes(user1Auth.user, [
          { title: 'Test Note 1', message: 'Content 1' },
          { title: 'Test Note 2', message: 'Content 2' }
        ])
      })

      it("should fail when accessing another user's notes", async () => {
        await agent
          .client()
          .get(`/user/${user1Auth.user}/notes`)
          .set('authorization', user2Auth.token)
          .expect(403)
          .promise()
      })

      it('should read all notes for a user', async () => {
        const response = await agent
          .client()
          .get(`/user/${user1Auth.user}/notes`)
          .set('authorization', user1Auth.token)
          .expect(200)
          .promise()

        should.exist(response)
        response.should.be.an.Array()
        response.should.have.length(2)

        response.forEach((note) => {
          note.should.have.property('title')
          note.should.have.property('message')
          note.should.have.property('userId', user1Auth.user)
        })
      })
    })
  })
})
