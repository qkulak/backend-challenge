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
    describe('create-note', () => {
      let userAuth

      before(async () => {
        userAuth = await mockData.mockAuthAndUser()
      })

      it('should successfully create a note', async () => {
        const noteData = {
          title: 'Test Note',
          message: 'This is a test note'
        }

        const response = await agent
          .client()
          .post(`/note`)
          .set('authorization', userAuth.token)
          .send(noteData)
          .expect(201)
          .promise()

        should.exist(response)
        response.should.have.property('success', true)
        response.should.have.property('data')

        const note = response.data
        note.should.have.property('id')
        note.should.have.property('title', noteData.title)
        note.should.have.property('message', noteData.message)
        note.should.have.property('userId', userAuth.user)
      })
    })
  })
})
