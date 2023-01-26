describe('Blog app', function(){
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    // create new user
    const user = {
      name: 'test user',
      username: 'testuser1',
      password: 'lala'
    }
    cy.request('POST','http://localhost:3003/api/users', user )

    cy.visit('http://localhost:3000')
  })

  it('login form is shown on default', function(){ 
    cy.contains('login')
  })

  describe('login', function(){
    it('loging failed', function(){
      cy.get("#username").type('noone')
      cy.get("#password").type('123')
      cy.contains('login').click()
      cy.get('.notification').contains('wrong credentials')
      cy.get('.notification').should('have.css', 'color', 'rgb(255, 0, 0)')
    })

    it('login succeeds', function(){
      cy.get("#username").type('testuser1')
      cy.get("#password").type('lala')
      cy.contains('login').click()
      cy.get('.notification').contains('testuser1 logged in')
    })
  })

  describe('when logged in', function(){
    beforeEach(function(){
      cy.get("#username").type('testuser1')
      cy.get("#password").type('lala')
      cy.contains('login').click()
    })

    it('creat a blog', function(){
      cy.contains('Create').click()
      // cy.request('GET','http://localhost:3003/api/blogs')
      cy.get('#title').type('new title')
      cy.get('#author').type('new author name')
      cy.get('#url').type('www2.com')
      cy.contains('create').click()
      cy.get('.notification').contains('new title by new author name is added')
    })

    it('user clicks like', function(){
      cy.contains('show').click()
    })
  })
})

