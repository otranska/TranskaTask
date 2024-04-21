
describe('Test tc-1', () => {
  it('tc-1', () => {
    cy.visit('/');
    const baseUrl = Cypress.config().baseUrl;
    cy.request(baseUrl).its('status').should('eq', 200);

// Создаем объекты Date для завтра, послезавтра, после-послезавтра, после-после-послезавтра
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const afterTomorrow = new Date(today);
    afterTomorrow.setDate(today.getDate() + 2);
    const afterAfterTomorrow = new Date(today);
    afterAfterTomorrow.setDate(today.getDate() + 3);
    const afterAfterAfterTomorrow = new Date(today);
    afterAfterAfterTomorrow.setDate(today.getDate() + 4);
    const afterAfterAfterAfterTomorrow = new Date(today);
    afterAfterAfterAfterTomorrow.setDate(today.getDate() + 5);

// Форматируем даты
    const todayFormatted = formatDate(today);
    const tomorrowFormatted = formatDate(tomorrow);
    const afterTomorrowFormatted = formatDate(afterTomorrow);
    const afterAfterTomorrowFormatted = formatDate(afterAfterTomorrow);
    const afterAfterAfterTomorrowFormatted = formatDate(afterAfterAfterTomorrow);
    const afterAfterAfterAfterTomorrowFormatted = formatDate(afterAfterAfterAfterTomorrow);

    function formatDate(date) {
      const options = { weekday: 'short', month: 'short', day: '2-digit' };
      return date.toLocaleDateString('en-US', options);
    }

// Переход по навигации
    cy.get('#navbar-nav > div > div').should('be.visible').eq(0).click({force: true});
    cy.get('#navbar-nav > div > div > div > a').eq(0).click({force: true});
    cy.wait(3000);
    const url = `${baseUrl}/clinics/blossom-hill`;
    cy.request(url).its('status').should('eq', 200);

// Проверяем, блок Book Appointment
    cy.get('#appointments-widget').should('be.visible');
    cy.contains('Book Appointment').should('be.visible');
    cy.contains('San Jose - Blossom Hill Rd.').should('exist');
    cy.contains('1375 Blossom Hill Rd. #49, San Jose, CA 95118').should('exist');
    cy.get('a[href="tel:+14086457073"]').contains('(408) 645-7073').should('exist');
    cy.contains('Select Appointment Time').should('exist');
    cy.get('button[disabled]').should('have.class', 'Mui-disabled');

// Шаг 1:
    // Проверяем, что есть кнопка Next
    cy.get('button[type="button"]').contains('Next').should('exist');
    cy.wait(1000);

    // Проверяем, что отображаются сегодня и сегодня+1
    cy.get('#appointments-widget > :nth-child(2) > :nth-child(1) > :nth-child(1) > :nth-child(4) > :nth-child(2)')
        .should('be.visible').within(() => {
      cy.contains(todayFormatted).should('exist');
      cy.contains(tomorrowFormatted).should('exist');
    });

    // Проверяем, что для них есть таймслоты
    cy.get('#appointments-widget > :nth-child(2) > :nth-child(1) > :nth-child(1) > :nth-child(4) >  :nth-child(3) > :nth-child(1)')
        .should('have.length.above', 0);


// Шаг 2:
    //нажать Next
    cy.get('button[type="button"]').contains('Next').click();
    cy.wait(1000);

    // Проверяем, что есть кнопки Next и Previous
    cy.get('button[type="button"]').contains('Next').should('exist');
    cy.get('button[type="button"]').contains('Previous').should('exist');

    // Проверяем, что отображаются сегодня+2 и сегодня+3
    cy.get('#appointments-widget > :nth-child(2) > :nth-child(1) > :nth-child(1) > :nth-child(4) > :nth-child(2)')
        .should('be.visible').within(() => {
      cy.contains(afterTomorrowFormatted).should('exist');
      cy.contains(afterAfterTomorrowFormatted).should('exist');
    });

    // Проверяем, что для них есть таймслоты
    cy.get('#appointments-widget > :nth-child(2) > :nth-child(1) > :nth-child(1) > :nth-child(4) >  :nth-child(3) > :nth-child(1)')
        .should('have.length.above', 0);


// Шаг 3:
    //нажать Next
    cy.get('button[type="button"]').contains('Next').click();
    cy.wait(1000);

    // Проверяем, что есть кнопки Next и Previous
    cy.get('button[type="button"]').contains('Next').should('exist');
    cy.get('button[type="button"]').contains('Previous').should('exist');

    // Проверяем, что отображаются сегодня+4 и сегодня+5
    cy.get('#appointments-widget > :nth-child(2) > :nth-child(1) > :nth-child(1) > :nth-child(4) > :nth-child(2)')
        .should('be.visible').within(() => {
      cy.contains(afterAfterAfterTomorrowFormatted).should('exist');
      cy.contains(afterAfterAfterAfterTomorrowFormatted).should('exist');
    });

    // Проверяем, что для них есть таймслоты
    cy.get('#appointments-widget > :nth-child(2) > :nth-child(1) > :nth-child(1) > :nth-child(4) >  :nth-child(3) > :nth-child(1)')
        .should('have.length.above', 0);


// Шаг 4:
    //нажать Previous
    cy.get('button[type="button"]').contains('Previous').click();
    cy.wait(1000);

    // Проверяем, что есть кнопки Next и Previous
    cy.get('button[type="button"]').contains('Next').should('exist');
    cy.get('button[type="button"]').contains('Previous').should('exist');

    // Проверяем, что отображаются сегодня+2 и сегодня+3
    cy.get('#appointments-widget > :nth-child(2) > :nth-child(1) > :nth-child(1) > :nth-child(4) > :nth-child(2)')
        .should('be.visible').within(() => {
      cy.contains(afterTomorrowFormatted).should('exist');
      cy.contains(afterAfterTomorrowFormatted).should('exist');
    });

    // Проверяем, что для них есть таймслоты
    cy.get('#appointments-widget > :nth-child(2) > :nth-child(1) > :nth-child(1) > :nth-child(4) >  :nth-child(3) > :nth-child(1)')
        .should('have.length.above', 0);


// Шаг 5:
    //нажать Previous
    cy.get('button[type="button"]').contains('Previous').click();
    cy.wait(1000);

    // Проверяем, что есть кнопки Next
    cy.get('button[type="button"]').contains('Next').should('exist');

    // Проверяем, что отображаются сегодня и сегодня+1
    cy.get('#appointments-widget > :nth-child(2) > :nth-child(1) > :nth-child(1) > :nth-child(4) > :nth-child(2)')
        .should('be.visible').within(() => {
      cy.contains(todayFormatted).should('exist');
      cy.contains(tomorrowFormatted).should('exist');
    });

    // Проверяем, что для них есть таймслоты
    cy.get('#appointments-widget > :nth-child(2) > :nth-child(1) > :nth-child(1) > :nth-child(4) >  :nth-child(3) > :nth-child(1)')
        .should('have.length.above', 0);


  })
})