/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable object-shorthand */
import { html, css } from 'lit';
import { v4 as uuidv4, validate as isValidToken } from 'uuid';
import { PageViewElement } from './page-view-element.js';

import './view-card.js';
import { icons } from '../utils/icons.js';

export class ViewLogin extends PageViewElement {
  static get properties() {
    return {
      selectedPage: { type: String },
      page: { type: String },
      inputError: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.selectedPage = '';
    this.loggedIn = false;
    this.inputError = false;
  }

  static styles = css`

    .mouse {
      display: flex;
      justify-content: center;
      align-items: center;
    }


    .login-title {
      font-size: 16px;
      margin-bottom: 24px;
      color: #004481;
    }

    .login-input {
      width: 100%;
      padding: 12px;
      margin-bottom: 16px;
      border: 1px solid #b0b8c6;
      border-radius: 4px;
      font-size: 16px;
      box-sizing: border-box;
      outline: none;
      transition: box-shadow 0.3s ease;
    }

    .login-input:focus {
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
    }

    .login-button {
      width: 100%;
      padding: 12px;
      background-color: #0c186c;
      color: #fff;
      border: none;
      border-radius: 4px;
      font-size: 16px;
      font-weight: bold;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }

    .login-button:hover {
      background-color: #061049;
    }
    .error {
    border: 1px solid red;
    }

    .error-message {
      color: red;
      font-size: 12px;
      margin-top: 8px;
    }
  `;

  connectedCallback() {
  super.connectedCallback();
    // eslint-disable-next-line wc/require-listener-teardown
    window.addEventListener('popstate', this.handlePopState.bind(this));
  }

  // eslint-disable-next-line class-methods-use-this
  handlePopState() {
    localStorage.removeItem('token');
  }

render() {
  return html`
    <div class="login-container">
    <div class="mouse">${icons.mouse}</div>
      <h1 class="login-title">Name</h1>
      <input
        id="usernameInput"
        type="text"
        value=""
        name="inputName"
        class="login-input ${this.inputError ? 'error' : ''}"
        placeholder="Name"
        @focus="${this.handleInputFocus}"
      />
      ${this.inputError ? html`
        <p class="error-message">The name requires minimum two letters</p>
      ` : ''}
      <button @click="${this.login}" class="login-button">Join</button>
    </div>
  `;
}

  handleInputFocus() {
    this.inputError = false;
  }

  login() {
    const usernameInput = this.shadowRoot.getElementById('usernameInput').value;

    if (usernameInput.length < 3) {
      this.inputError = true;
      return;
    }

    const token = uuidv4();

    this.dispatchEvent(
      new CustomEvent('username-login', {
        composed: true,
        bubbles: true,
        detail: {
          username: usernameInput,
          token: token,
        },
      })
    );

    localStorage.setItem('token', token);

    const isValid = isValidToken(token);

    if (isValid) {
      this.dispatchEvent(new CustomEvent('navigate', { detail: '/view-card' }));
    } else {
      console.log('Token inválido');
    }

    this.shadowRoot.querySelector(`[name=inputName]`).value = '';

  }
}

customElements.define('view-login', ViewLogin);
