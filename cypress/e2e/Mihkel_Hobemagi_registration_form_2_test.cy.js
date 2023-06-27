beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_2.html')
})

/*
Assignment 4: add content to the following tests
*/

describe('Section 1: Functional tests', () => {

    it('User can use only same both first and validation passwords', () => {
       
        // Test steps for filling in only mandatory fields 
        // Type confirmation password which is different from first password
        cy.get('#username').type('mHobe')
        cy.get('#email').type('test@test.ee')
        cy.get('input[name="password"]').type('MyPass')
        cy.get('[name="confirm"]').type('Wrong')
        cy.get('[data-testid="phoneNumberTestId"]').type('123456789')
        cy.get('input[name="name"]').type('Mihkel')
        cy.get('#lastName').type('Hõbemägi')

        // Click outside of input fields
        cy.get('h2').contains('Password').click()

        // Assert that submit button is not enabled
        cy.get('.submit_button').should('be.disabled')

        // Assert that success message is not visible
        cy.get('#success_message').should('not.be.visible')

        // Assert that correct error message "Passwords do not match!" is visible
        cy.get('#password_error_message').should('be.visible').should('contain', 'Passwords do not match!')
    })

    it('User can submit form with all fields added', () => {
       
        // Test steps for filling in ALL fields
        cy.get('#username').type('mHobe')
        cy.get('#email').type('test@test.ee')
        cy.get('input[name="password"]').type('MyPass')
        cy.get('[name="confirm"]').type('MyPass')
        cy.get('[data-testid="phoneNumberTestId"]').type('123456789')
        cy.get('input[name="name"]').type('Mihkel')
        cy.get('#lastName').type('Hõbemägi')

        // Fill optional fields
        cy.get('#cssFavLanguage').click()
        cy.get('#vehicle3.checkbox.vehicles').click()
        cy.get('#cars').select('Saab')
        cy.get('#animal').select('Hippo')

        // Click outside of input fields
        cy.get('h2').contains('Password').click()

        // Assert that submit button is enabled
        cy.get('.submit_button').should('be.enabled')

        // Assert that after submitting the form system show successful message
        cy.get('.submit_button').click()
        cy.get('#success_message').should('be.visible')
    })

    it('User can submit form with valid data and only mandatory fields added', () => {
        
        // Test steps for filling in ONLY mandatory fields
        cy.get('#username').type('mHobe')
        cy.get('#email').type('test@test.ee')
        cy.get('input[name="password"]').type('MyPass')
        cy.get('[name="confirm"]').type('MyPass')
        cy.get('[data-testid="phoneNumberTestId"]').type('123456789')
        cy.get('input[name="name"]').type('Mihkel')
        cy.get('#lastName').type('Hõbemägi')

        // Click outside of input fields
        cy.get('h2').contains('Password').click()

        // Assert that submit button is enabled
        cy.get('.submit_button').should('be.enabled')

        // Assert that after submitting the form system show successful message
        cy.get('.submit_button').click()
        cy.get('#success_message').should('be.visible')
    })

    it('User cannot submit form with mandatory field missing', () => {
       
        // Test steps for filling in ONLY mandatory fields EXCEPT username
        cy.get('#email').type('test@test.ee')
        cy.get('input[name="password"]').type('MyPass')
        cy.get('[name="confirm"]').type('MyPass')
        cy.get('[data-testid="phoneNumberTestId"]').type('123456789')
        cy.get('input[name="name"]').type('Mihkel')
        cy.get('#lastName').type('Hõbemägi')

        // Click outside of input fields
        cy.get('h2').contains('Password').click()

        // Assert that submit button is not enabled
        cy.get('.submit_button').should('be.disabled')

        // Assert that success message is not visible
        cy.get('#success_message').should('not.be.visible')
    })
})

/*
Assignment 5: create more visual tests
*/

describe('Section 2: Visual tests', () => {
    it('Check that logo is correct and has correct size', () => {
        cy.log('Will check logo source and size')

        // Check Cerebrum Hub logo
        cy.get('#logo').should('have.attr', 'src').should('include', 'cerebrum_hub_logo')
        // Get element and check its parameter height, to be equal 178
        cy.get('#logo').invoke('height').should('be.lessThan', 178)
            .and('be.greaterThan', 100)

        // Check Cypress logo
        cy.get('img[data-cy="cypress_logo"]').should('have.attr', 'src')
        // Get element and check its parameter height, to be equal 178, same as Cerebrum Hub logo
        cy.get('img[data-cy="cypress_logo"]').invoke('height').should('be.lessThan', 178)
            .and('be.greaterThan', 100)
    })

    it('Check navigation part 1: Registration Form', () => {
        cy.get('nav').children().should('have.length', 2)

        // Get navigation element, find siblings that contains h1 and check if it has Registration form in string
        cy.get('nav').siblings('h1').should('have.text', 'Registration form number 2')

        // Get navigation element, find its first child, check the link content and click it
        cy.get('nav').children().eq(0).should('be.visible')
            .and('have.attr', 'href', 'registration_form_1.html')
            .click()

        // Check that currently opened URL is correct
        cy.url().should('contain', '/registration_form_1.html')

        // Go back to previous page
        cy.go('back')
        cy.log('Back again in registration form 2')
    })

    it('Check navigation part 2: Cerebrum Hub', () => {

        // Get navigation element, find Cerebrum Hub link, check the link content and click it. 
        // Check that URL to Cerebrum Hub page is correct and clickable
        cy.get('nav').children().eq(1).should('be.visible')
            .and('have.attr', 'href', 'https://cerebrumhub.com/')
            .click()
        cy.wait(10000)    

        // Check that currently opened URL is correct
        cy.url().should('contain', 'https://cerebrumhub.com')

        // Go back to previous page
        cy.go('back')
        cy.log('Back again in registration form 2')
    })

    it('Check that Radio button list is correct', () => {

        // Array of found elements with given selector has 4 elements in total
        cy.get('input[type="radio"]').should('have.length', 4)
        cy.get('input[type="radio"]').next().eq(0).should('have.text', 'HTML').and('not.be.checked')
        cy.get('input[type="radio"]').next().eq(1).should('have.text', 'CSS').and('not.be.checked')
        cy.get('input[type="radio"]').next().eq(2).should('have.text', 'JavaScript').and('not.be.checked')
        cy.get('input[type="radio"]').next().eq(3).should('have.text', 'PHP').and('not.be.checked')

        // Selecting one will remove selection from other radio button
        cy.get('input[type="radio"]').eq(0).check().should('be.checked')
        cy.get('input[type="radio"]').eq(1).check().should('be.checked')
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
    })

    it('Check that Checkbox list is correct', () => {

        // Array of found elements with given selector has 3 elements in total
        cy.get('input[type="checkbox"]').should('have.length', 3)
        cy.get('input[type="checkbox"]').next().eq(0).should('have.text', 'I have a bike').and('not.be.checked')
        cy.get('input[type="checkbox"]').next().eq(1).should('have.text', 'I have a car').and('not.be.checked')
        cy.get('input[type="checkbox"]').next().eq(2).should('have.text', 'I have a boat').and('not.be.checked')

        // Selecting one will keep the selection of other checkbox button
        cy.get('input[type="checkbox"]').eq(0).check().should('be.checked')
        cy.get('input[type="checkbox"]').eq(1).check().should('be.checked')
        cy.get('input[type="checkbox"]').eq(0).should('be.checked')
    })

    it('Car dropdown is correct', () => {
        // Here is an example how to explicitely create screenshot from the code
        // Select second element and create screenshot for this area, and full page
        cy.get('#cars').select(1).screenshot('Cars drop-down')
        cy.screenshot('Full page screenshot')

        // Here are given different solutions how to get the length of array of elements in Cars dropdown
        // Next 2 lines of code do exactly the same!
        cy.get('#cars').children().should('have.length', 4)
        cy.get('#cars').find('option').should('have.length', 4)

        //Check  that first element in the dropdown has text Volvo
        cy.get('#cars').find('option').eq(0).should('have.text', 'Volvo')

        // Advanced level how to check the content of the Cars dropdown
        cy.get('#cars').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(['volvo', 'saab', 'opel', 'audi'])
        })
    })

    it('Favorite animal dropdown is correct', () => {

        // Check that the length of array of elements in Animal dropdown is correct (6)
        cy.get('#animal').children().should('have.length', 6)

        //Check that all the elements in the dropdown have their correct text value
        cy.get('#animal').find('option').eq(0).should('have.text', 'Dog')
        cy.get('#animal').find('option').eq(1).should('have.text', 'Cat')
        cy.get('#animal').find('option').eq(2).should('have.text', 'Snake')
        cy.get('#animal').find('option').eq(3).should('have.text', 'Hippo')
        cy.get('#animal').find('option').eq(4).should('have.text', 'Cow')
        cy.get('#animal').find('option').eq(5).should('have.text', 'Horse')
    })
})