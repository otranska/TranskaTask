
describe('Test tc-3', () => {
    it('tc-3', () => {
        cy.visit('/');
        const baseUrl = Cypress.config().baseUrl;
        cy.request(baseUrl).its('status').should('eq', 200);


// Переход по навигации
        cy.get('#navbar-nav > div > div').should('be.visible').eq(0).click({force: true});
        cy.get('#navbar-nav > div > div > div > a').eq(1).click({force: true});
        cy.wait(1000);
        const url = `${baseUrl}/clinics/blossom-hill`;
        cy.request(url).its('status').should('eq', 200);


// Шаг 1:
        // Проверяем, что для них есть таймслоты
        cy.get('#appointments-widget > :nth-child(2) > :nth-child(1) > :nth-child(1) > :nth-child(4) >  :nth-child(3) > :nth-child(1)')
            .should('have.length.above', 0);

        // Проверяем, что кнопка SELECT не активна
        cy.get('button[disabled]').should('have.class', 'Mui-disabled');

        // Выбираем слот. Проверяем что он активный. Проверяем активность кнопки SELECT.
        cy.get('#appointments-widget > :nth-child(2) > :nth-child(1) > :nth-child(1) > :nth-child(4) >  :nth-child(3) > :nth-child(1) > :nth-child(1)')
            .click()
            .should('have.css', 'border-color', 'rgb(25, 99, 198)');
        cy.get('button').eq(4).should('not.have.attr', 'disabled');

        //Нажатие кнопки SELECT и проверка Reason for Consultation
        cy.get('button').eq(4).click();
        cy.contains('Reason for Consultation').should('be.visible');


        // Проверям все кнопки
        const buttonNames = [
            'Annual Physical',
            'Anti-Aging Program',
            'Primary Care',
            'Cough',
            'Stomach Ache (Abdominal pain)',
            'Sore Throat',
            'Urinary Tract Infection (UTI)',
            'Rash/Allergic Reaction',
            'Chest Pain',
            'Ear Pain',
            'Back Pain',
            'Wound Care',
            'Injury',
            'Bleeding',
            'Other'
        ];

        cy.get('#appointments-widget > :nth-child(2) > :nth-child(1) > :nth-child(1) > :nth-child(2) > :nth-child(1) > :nth-child(1) > :nth-child(1)')
            .within(() => {
                buttonNames.forEach((name, index) => {
                    cy.contains('button', name).should('not.have.attr', 'disabled');
                });
            });

        //Проверка валидации и клик
        cy.get('#appointments-widget > :nth-child(2) > :nth-child(1) > :nth-child(2) > :nth-child(1)')
            .click();
        cy.contains('Please enter reason for visit').should('be.visible');;

        cy.get('#appointments-widget > :nth-child(2) > :nth-child(1) > :nth-child(1) > :nth-child(2) > :nth-child(1) > :nth-child(1) > :nth-child(1) > :nth-child(1)')
            .click();
        cy.url().should('include', '/clinics/meridian');
        cy.get('#appointments-widget > :nth-child(2) > :nth-child(1) > :nth-child(2) > :nth-child(1)')
            .click();


        //Cypress не имеет возможности контролировать поведение новой вкладки напрямую
        //Новая вкладка не является частью того же DOM, на котором запускается тест
        //Можем проверить, что новая вкладка открыта
        cy.window().should('have.property', 'open');
    })
})