/// <reference path="../support/index.d.ts" />

const emptyCanvasLength = 76698;

const drawALine = () => {
  cy.get('canvas')
    .trigger('mousedown', {
      x: 500,
      y: 500,
      isPrimary: true,
    })
    .trigger('mousemove', { x: 380, y: 240 })
    .trigger('mouseup', { x: 380, y: 240 });
};

const setToolSize = (size) => {
  cy.dataCy('input-tool-size').then(($range) => {
    const range = $range[0];
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
      window.HTMLInputElement.prototype,
      'value'
    ).set;

    nativeInputValueSetter.call(range, size);
    range.dispatchEvent(new Event('change', { value: size, bubbles: true } as unknown));
  });
};

describe('Create new room, join it and play', () => {
  const localPlayerName = 'Jerry';

  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it("Can't create a room without a name", () => {
    cy.dataCy('input-name-create').should('have.value', '');
    cy.dataCy('btn-create-room').click();

    cy.dataCy('input-error');
    cy.url().should('eq', 'http://localhost:3000/');
  });

  it('Becomes room admin and receives a welcome message', () => {
    cy.dataCy('input-name-create').type(localPlayerName).should('have.value', localPlayerName);
    cy.dataCy('btn-create-room').click();

    cy.contains(`Admin: ${localPlayerName}`);
    cy.contains(`${localPlayerName}, welcome to the room `);
  });

  it.only('Creates a room and plays the game', () => {
    cy.dataCy('input-name-create').type(localPlayerName).should('have.value', localPlayerName);
    cy.dataCy('btn-create-room').click();

    cy.dataCy('btn-start-round').should('be.disabled');
    cy.dataCy('btn-ready').contains('Ready');
    cy.dataCy('round-timer').contains('0:00');
    cy.dataCy('round-counter').contains('Round #0');

    cy.dataCy('btn-ready').click();
    cy.dataCy('btn-start-round').click();

    cy.dataCy('round-timer').should('not.contain', '0:00');
    cy.dataCy('round-counter').contains('Round #1 +');

    cy.dataCy('tool-size').contains('Tool size: 5px');

    setToolSize(30);
    cy.dataCy('tool-size').contains('Tool size: 30px');

    drawALine();
    cy.get('canvas').then((instance) => {
      const canvas = instance[0];

      expect(canvas.toDataURL()).to.have.length.of.at.least(110000);
    });

    cy.dataCy('btn-brush')
      .children('div')
      .should('have.css', 'background-color', 'rgb(255, 90, 19)');

    cy.dataCy('btn-eraser').click();
    cy.dataCy('btn-eraser')
      .children('div')
      .should('have.css', 'background-color', 'rgb(255, 90, 19)');

    setToolSize(40);
    drawALine();
    cy.get('canvas').then((instance) => {
      const canvas = instance[0];

      expect(canvas.toDataURL()).to.have.length(emptyCanvasLength);
    });

    cy.dataCy('btn-brush').click();
    setToolSize(30);
    drawALine();
    cy.get('canvas').then((instance) => {
      const canvas = instance[0];

      expect(canvas.toDataURL()).to.have.length.of.at.least(110000);
    });

    cy.dataCy('btn-clear').click();
    cy.get('canvas').then((instance) => {
      const canvas = instance[0];

      expect(canvas.toDataURL()).to.have.length(emptyCanvasLength);
    });

    cy.dataCy('keyword')
      .invoke('text')
      .then((text) => {
        cy.dataCy('input-message').type(text);

        cy.dataCy('form-message').submit();

        cy.dataCy('message-content-correct').should(
          'have.css',
          'background-color',
          'rgb(255, 90, 19)'
        );
      });

    cy.dataCy('btn-start-round').should('be.disabled');
  });
});
