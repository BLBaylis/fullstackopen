describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3000/api/testing/reset')
    const user = {
      name: 'test name',
      username: 'test username',
      password: 'test password'
    }
    cy.request('POST', 'http://localhost:3000/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.get('.login-form')
  })

  describe('Login', function() {
    it('fails with wrong credentials', function() {

      cy.get('#username').type('test username')
      cy.get('#password').type('wrong test password')
      cy.contains('Submit').click()

      cy.contains('Invalid username or password')

      cy.get('html').should('not.contain', 'Logged in as test username')
    })

    it('succeeds with correct credentials', function() {

      cy.get('#username').type('test username')
      cy.get('#password').type('test password')
      cy.contains('Submit').click()

      cy.contains('Logged in as test username')
    })

  })

  describe('When logged in', function() {
      beforeEach(function() {
        cy.login({username: 'test username', password: 'test password'})
      })

      it('blog form can be opened', function() {
        cy.contains('New Blog').click()
        cy.get('form')
      })

      describe('when blogs already exist', function() {
        beforeEach(function() {

          cy.createBlog({
            title: 'test blog title 1',
            author: 'test blog author 1',
            url: 'www.testblogurl.com 1',
            likes: 1
          })
          cy.createBlog({
            title: 'test blog title 2',
            author: 'test blog author 2',
            url: 'www.testblogurl.com 2',
            likes: 3
          })
          cy.createBlog({
            title: 'test blog title 3',
            author: 'test blog author 3',
            url: 'www.testblogurl.com 3',
            likes: 7
          })

          cy.contains('test blog title 1').parent().as('existingBlog')
        })

        it('user can like a blog', function() {
          cy.get('@existingBlog').contains('Show details').click()
          cy.get('@existingBlog').get('button[data-cy=like-button]').click()
          cy.get('@existingBlog').contains('Likes: 2')
        })

        it('blogs are sorted by most likes', function() {
          cy.get('[data-cy=blog]')
            .each(function($blogElement){
              //show details of each blog
              cy.wrap($blogElement).contains('Show details').click()
            })

          cy.get('[data-cy=likes-counter]')
            .then(function($counterElements) {
              const strings = $counterElements.map((index, el) => Cypress.$(el).text()).toArray()
              const likesArr = strings
                .map(str => str.replace('Likes:', '').trim())
                .map(Number)
              const sortedLikesArr = likesArr.slice().sort((a, b) => a <= b ? 1 : -1)
              expect(likesArr).to.deep.equal(sortedLikesArr)
            })
        })

      })

      it('A blog can be created', function() {
        cy.contains('New Blog').click()
        cy.get('#title').type('test blog title 2')
        cy.get('#author').type('test blog author 2')
        cy.get('#url').type('www.testblogurl.com 2')
        cy.contains('Submit').click()

        cy.contains('test blog title')
      })

      describe('When user has created a blog', function() {

        beforeEach(function() {
  
          cy.createBlog({
            title: 'test blog title 2',
            author: 'test blog author 2',
            url: 'www.testblogurl.com 2'
          })
  
          cy.visit('http://localhost:3000')
          cy.contains('test blog title 2')
            .parent()
            .as('newBlog')
          
        })

        it('it can be deleted', function() {
          cy.get('@newBlog').contains('Show details').click()
          cy.get('@newBlog').contains('Remove').click()

          cy.get('html').should('not.contain', 'test blog title 2')
        })
        
      })

      
    }) 
})