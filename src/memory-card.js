/* eslint-disable class-methods-use-this */
/* eslint-disable lit-a11y/click-events-have-key-events */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
import { LitElement, html, css, unsafeCSS } from 'lit';
import { installRouter } from 'pwa-helpers';
import { v4 as uuidv4, validate as isValidToken } from 'uuid';

import '../src/views/view-card.js';
import '../src/views/view-login.js';

export class MemoryCard extends LitElement {
  static get properties() {
    return {
      user: { type: String },
      page: { type: String },
      hideLogin: { type: Boolean },
      loggedIn: { type: Boolean },
      initialized: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.user = '';
    this.page = 'login';
    this.hideLogin = false;
    this.loggedIn = false;
    this.initialized = false;
    installRouter(location => this.handleNavigation(location.pathname));
  }

  generateToken() {
    return uuidv4();
  }

  static styles = css`
    :host {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      font-family: sans-serif;
      background-color: #ededed;
    }

    .app-container {
      background-color: #fff;
      border-radius: 4px;
      box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
      padding: 24px;
      text-align: left;
      width: 100%;
      max-width: 400px;
      margin-top: -10rem;
    }

    .container {
      display: grid;
      grid-template-rows: auto 1fr;
      grid-gap: 16px;
      max-width: 400px;
      width: 100%;
      margin: 0 auto;
      padding: 16px;
    }

    .login-container {
      display: block;
    }

    .login-container[hidden] {
      display: none;
    }
  `;

  render() {
    return html`
      <div class="app-container">
        <div
          class="login-container"
          ?hidden=${this.hideLogin && this.page !== 'login'}
        >
          <view-login
            @username-login="${this.dataFromLogin}"
            name="login"
            ?active=${this.page === 'login'}
            @navigate=${this.navigate}
          ></view-login>
        </div>
        ${this.page === 'card'
          ? html`
              <view-card
                .username="${this.user}"
                name="card"
                ?active=${this.page === 'card'}
              ></view-card>
            `
          : ''}
      </div>
    `;
  }

  dataFromLogin(e) {
    this.user = e.detail;
    console.log(this.user.username);
  }

  handleNavigation(path) {
    const decodedPath = decodeURIComponent(path);

    if (this.loggedIn && this.initialized) {
      this.page = 'card';
      this.hideLogin = true;
      return;
    }

    // Verificar si hay un token válido
    const token = localStorage.getItem('token');
    const isValid = token && isValidToken(token);

    if (decodedPath === '/view-card' && !isValid) {
      window.location.href = '/';
      return;
    }

    this.page = decodedPath === '/view-card' ? 'card' : 'login';
    this.hideLogin = this.page === 'card';

    this.initialized = true;
  }

  navigate() {
    this.page = 'card';
    this.hideLogin = true;
    window.history.pushState({}, '', '/view-card');
  }
}

customElements.define('memory-card', MemoryCard);
