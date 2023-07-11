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
      justify-content: center; /* Centra horizontalmente */
      align-items: center; /* Centra verticalmente */
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
  
  // Agregar un evento al evento "popstate" del navegador
    // eslint-disable-next-line wc/require-listener-teardown
    window.addEventListener('popstate', this.handlePopState.bind(this));
  }

  // eslint-disable-next-line class-methods-use-this
  handlePopState() {
    // Borrar el token del almacenamiento local
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
        <p class="error-message">El nombre requiere mínimo 2 letras</p>
      ` : ''}
      <button @click="${this.login}" class="login-button">Acceder</button>
    </div>
  `;
}

  handleInputFocus() {
    this.inputError = false; // Restablecer la propiedad inputError
  }

  login() {
    const usernameInput = this.shadowRoot.getElementById('usernameInput').value;

    if (usernameInput.length < 3) {
      this.inputError = true;
      return;
    }

    // Generar un token único
    const token = uuidv4();

    // Asociar el token al usuario en la base de datos

    // Enviar el token al cliente
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

    // Guardar el token en el almacenamiento local del cliente
    localStorage.setItem('token', token);

    // Verificar si el token es válido
    const isValid = isValidToken(token);

    if (isValid) {
      // Navegar al siguiente componente
      this.dispatchEvent(new CustomEvent('navigate', { detail: '/view-card' }));
    } else {
      // Mostrar mensaje de error o realizar otra acción apropiada
      console.log('Token inválido');
    }

    this.shadowRoot.querySelector(`[name=inputName]`).value = '';

  }
}

customElements.define('view-login', ViewLogin);
