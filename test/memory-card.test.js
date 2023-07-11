import { html, fixture, expect } from "@open-wc/testing";

import '../src/memory-card.js';

describe('MemoryCard', () => {
  let element;

  beforeEach(async () => {
    element = await fixture(html`<memory-card></memory-card>`);
  });

  it('renders a view-login component', () => {
    const viewLogin = element.shadowRoot.querySelector('view-login');
    expect(viewLogin).to.exist;
  });

  it('simulates a click on the view-login button', async () => {
    const loginComponent = element.shadowRoot.querySelector('view-login');
    const usernameInput = loginComponent.shadowRoot.querySelector('input');
    usernameInput.value = 'fernando';
    loginComponent.shadowRoot.querySelector('button').click();

  });

  it('passes the a11y audit', async () => {
    const viewCard = element.shadowRoot.querySelector('view-card');
    expect(viewCard).to.exist;
    await expect(element).to.be.accessible();
  });


  it('waits for 2.5 seconds and clicks on a card', async () => {
    const viewCard = element.shadowRoot.querySelector('view-card');
    viewCard.shadowRoot.querySelector('select.level-select option[value="difficult"]').click();
    viewCard.shadowRoot.querySelector('button').click();
    let cardElement = viewCard.shadowRoot.querySelector('div.card-container');

    setTimeout(() => {
      cardElement.click();
      done();
    }, 2500);
  });
});
