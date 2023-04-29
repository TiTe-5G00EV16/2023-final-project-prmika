
describe('The add product page', () => {
  it('should only be for logged in users', () => {
    cy.login('admin@user.com', 'admin123')
    cy.url().should('be.equal',`${Cypress.config("baseUrl")}/`)
    cy.contains('ADD PRODUCT').click()
    cy.get('#title').type('auto')
    cy.get('#description').type('kallis auto, vähän ajettu')
    cy.get('#image').type('https://thumbs.dreamstime.com/b/skyline-capital-city-luanda-luanda-bay-seaside-promenade-highway-afternoon-angola-africa-skyline-capital-119415093.jpg')
    cy.get('#price').type('60000')
    cy.get('form > .button').click()
    cy.visit('/')
  })
})