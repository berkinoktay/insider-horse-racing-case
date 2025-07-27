import { TOTAL_ROUNDS, HORSES_PER_RACE } from '../../src/constants/race'
import { HORSE_NAMES } from '../../src/constants/data'
/// <reference types="cypress" />
context('Game Flow', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  describe('Initial State', () => {
    it('should display the initial state of the application correctly', () => {
      // Header buttons
      cy.get('[data-cy="generate-program-button"]').should('not.be.disabled')
      cy.get('[data-cy="start-button"]').should('be.disabled')
      cy.get('[data-cy="pause-resume-button"]').should('not.exist')
      cy.get('[data-cy="reset-button"]').should('be.disabled')

      // Check program tab by default
      cy.get('[data-cy="program-card"]').should('not.exist')
      cy.get('[data-cy="no-races-message"]').scrollIntoView()
      cy.get('[data-cy="no-races-message"]').should('be.visible')

      // Click on results tab
      cy.get('[data-cy="tab-results"]').click()

      // Check results tab
      cy.get('[data-cy="results-table"]').should('not.exist')
      cy.get('[data-cy="no-results-message"]').scrollIntoView()
      cy.get('[data-cy="no-results-message"]').should('be.visible')

      // Click back to program tab
      cy.get('[data-cy="tab-program"]').click()
      cy.get('[data-cy="no-races-message"]').should('be.visible')
    })

    it('should display the initial horse list correctly', () => {
      cy.get('[data-cy="horse-card"]').should('have.length', HORSE_NAMES.length)
    })
  })

  describe('Program Generation', () => {
    it('should generate a race program when the "Generate Program" button is clicked', () => {
      // Click the generate program button
      cy.get('[data-cy="generate-program-button"]').click()

      // Assert that the button is in a loading state
      cy.get('[data-cy="generate-program-button"]').should('be.disabled')

      // Assert that the race track in participants are visible
      cy.get('[data-cy="race-track-participant"]').should('have.length', HORSES_PER_RACE)

      // Assert that the program is generated
      cy.get('[data-cy="program-card"]').should('have.length', TOTAL_ROUNDS)

      // Assert button states after generation
      cy.get('[data-cy="start-button"]').should('not.be.disabled')
      cy.get('[data-cy="reset-button"]').should('not.be.disabled')

      // Assert that the race track in badge is in ready state
      cy.get('[data-cy="race-track-status"]').should('have.text', 'Ready')
    })
  })

  describe('Race Flow', () => {
    beforeEach(() => {
      // Generate a program before each test in this block
      cy.get('[data-cy="generate-program-button"]').click()
    })

    it('should start the race when the "Start" button is clicked', () => {
      // Start the race
      cy.get('[data-cy="start-button"]').click()

      // Assert button states during the race
      cy.get('[data-cy="start-button"]').should('not.exist')
      cy.get('[data-cy="pause-resume-button"]').should('be.visible').and('not.be.disabled')
      cy.get('[data-cy="generate-program-button"]').should('be.disabled')
      cy.get('[data-cy="reset-button"]').should('not.be.disabled') // Reset can be active

      // Assert that the race track in badge is in racing state
      cy.get('[data-cy="race-track-status"]').should('have.text', 'Racing')
    })

    it('should pause and resume the race', () => {
      // Start the race
      cy.get('[data-cy="start-button"]').click()

      // Pause the race
      cy.get('[data-cy="pause-resume-button"]').click()

      // Assert button states when paused
      cy.get('[data-cy="start-button"]').should('not.exist')
      cy.get('[data-cy="generate-program-button"]').should('be.disabled')
      cy.get('[data-cy="pause-resume-button"]').should('have.text', 'Resume').should('be.visible')
      cy.get('[data-cy="race-track-status"]').should('have.text', 'Paused')

      // Resume the race
      cy.get('[data-cy="pause-resume-button"]').click()

      // Assert button states when resumed
      cy.get('[data-cy="start-button"]').should('not.exist')
      cy.get('[data-cy="pause-resume-button"]').should('have.text', 'Pause').should('be.visible')
      cy.get('[data-cy="race-track-status"]').should('have.text', 'Racing')
    })

    it('should reset the race', () => {
      // Start the race
      cy.get('[data-cy="start-button"]').click()

      // Reset the race
      cy.get('[data-cy="reset-button"]').click()

      // Assert that the application is back to the initial state
      cy.get('[data-cy="generate-program-button"]').should('not.be.disabled')
      cy.get('[data-cy="start-button"]').should('be.visible').and('not.be.disabled')
      cy.get('[data-cy="pause-resume-button"]').should('not.exist')
      cy.get('[data-cy="race-track-status"]').should('have.text', 'Ready')

      // Check program tab
      cy.get('[data-cy="tab-program"]').click()
      cy.get('[data-cy="program-card"]').should('have.length.at.least', 1)

      // Check results tab
      cy.get('[data-cy="tab-results"]').click()
      cy.get('[data-cy="results-table"]').should('not.exist')
      cy.get('[data-cy="no-results-message"]').scrollIntoView()
      cy.get('[data-cy="no-results-message"]').should('be.visible')
    })
  })
})
