/* eslint-disable class-methods-use-this */
/* eslint-disable lit-a11y/click-events-have-key-events */
import { html, css } from "lit";
import { PageViewElement } from "./page-view-element.js";
import { icons } from "../utils/icons.js";

export class ViewCard extends PageViewElement {
  static styles = css`
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px;
      background-color: #004481;
      color: #fff;
    }

    .card-container {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 12px;
      justify-items: center;
      align-items: center;
      padding: 16px;
    }

    .card {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 80px;
      font-size: 20px;
      background-color: #eee;
      cursor: pointer;
    }

    .username {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .username-icon {
      width: 20px;
      height: 20px;
    }

    .level-select-wrapper {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .level-label {
      font-size: 14px;
      font-weight: bold;
    }

    .level-select {
      padding: 6px;
      font-size: 14px;
    }

    /* Estilos responsivos para dispositivos móviles */
    @media (max-width: 600px) {
      .level-select-wrapper {
        flex-direction: column;
        align-items: flex-start;
      }

      .level-select {
        margin-top: 8px;
      }
    }

    .new-game {
      display: block;
      text-align: center;
      font-weight: bold;
    }

    .new-game-button {
      padding: 8px 16px;
      font-size: 16px;
      background-color: #0c186c;
      color: #fff;
      border: none;
      display: block;
      margin: 0 auto;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }

    .new-game-button:hover {
      background-color: #061049;
    }

    .question-mark {
      font-size: 32px;
    }

    .correct-answer {
      background-color: green;
    }

    .wrong-answer {
      background-color: red;
    }

    .disabled {
      pointer-events: none;
    }

    .score {
      font-size: 24px;
      font-weight: 300;
    }

    .level-select {
      font-size: 16px;
      padding: 8px;
    }

    .timer,
    .game-phrase {
      text-align: center;
      font-weight: bold;
      font-size: 16px;
      align-items: center;
      width: 100%;
    }

    .score-wrapper {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      margin-right: 16px;
    }

    .hide {
      display: none;
    }

    .play-button-container {
      display: flex;
      justify-content: center;
      margin-top: 16px;
    }

    @media (max-width: 600px) {
      .card-container {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 410px) {
      .card-container {
        grid-template-columns: repeat(2, 1fr);
        gap: 8px;
      }
    }
  `;

  static get properties() {
    return {
      username: { type: Object },
      selectedLevel: { type: String },
      cards: { type: Array },
      score: { type: Number },
      showNumbers: { type: Boolean },
      gameStarted: { type: Boolean },
      clickedCardIndex: { type: Number },
      cardColors: { type: Array },
      targetNumber: { type: Number },
      timer: { type: Number },
      showPlayButtonMessage: { type: Boolean },
      showPlayButton: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.gameStarted = false;
    this.selectedLevel = "";
    this.cards = [];
    this.score = 0;
    this.showNumbers = false;
    this.clickedCardIndex = -1;
    this.cardColors = [];
    this.targetNumber = 0;
    this.selectedLevel = "easy";
    this.showPlayButtonMessage = true;
    this.timer = 0;
    this.showPlayButton = false;
  }

  render() {
    return html`
      <div class="header">
        <div class="username">
          <span class="username-icon" alt="User Icon">${icons.user}</span>
          <span>${this.username.username}</span>
        </div>
        <div class="level-select-wrapper">
          <span class="level-label">Level</span>
          <select class="level-select" @change=${this.onLevelSelectChange}>
            <option value="easy" ?selected=${this.selectedLevel === "easy"}>
              Easy
            </option>
            <option value="medium" ?selected=${this.selectedLevel === "medium"}>
              Medium
            </option>
            <option
              value="difficult"
              ?selected=${this.selectedLevel === "difficult"}
            >
              Difficult
            </option>
          </select>
        </div>
      </div>
      ${this.showPlayButtonMessage
        ? html`
            <div class="game-phrase">
              <p class="new-game">Click play button to start a new game</p>
            </div>
            <div class="play-button-container">
              <button class="new-game-button" @click=${this.startNewGame}>
                Play
              </button>
            </div>
          `
        : html`
            <div class="score-wrapper">
              <div class="score">Points: ${this.score}</div>
            </div>
            <div class="game-phrase">
              <p>
                ${this.showNumbers
                  ? "Memorize the cards"
                  : `¿Where is the number ${this.targetNumber}?`}
              </p>
            </div>
            <div class="timer ${this.gameStarted ? "" : "hide"}">
              Tiempo restante: ${this.timer} segundos
            </div>
          `}

      <div class="card-container">
        ${this.cards.map(
          (card, index) => html`
            <div
              class="card ${this.gameStarted
                ? "disabled"
                : ""} ${this.isClicked(index)
                ? "clicked"
                : ""} ${this.getCardColor(index)}"
              @click=${() => this.onCardClick(index)}
            >
              ${this.showNumbers || this.isClicked(index)
                ? card
                : html`<span class="question-mark">&#63;</span>`}
            </div>
          `
        )}
      </div>

      ${this.showPlayButton
        ? html`
            <div class="play-button-container" ?hidden=${!this.gameStarted}>
              <button class="new-game-button" @click=${this.startNewGame}>
                Play
              </button>
            </div>
          `
        : ""}
    `;
  }

  isCorrectCard(index) {
    return this.cards[index] === this.targetNumber;
  }

  isClicked(index) {
    return this.clickedCardIndex === index;
  }

  getCardColor(index) {
    return this.cardColors[index];
  }

  startNewGameWithSelectedLevel() {
    if (this.gameStarted) {
      return;
    }

    if (this.selectedLevel === "easy") {
      this.timer = 10;
    } else if (this.selectedLevel === "medium") {
      this.timer = 5;
    } else if (this.selectedLevel === "difficult") {
      this.timer = 2;
    }

    this.startNewGame();
  }

  startNewGame() {
    if (this.gameStarted) {
      return;
    }

    this.clickedCardIndex = -1;

    let timeLimit;
    if (this.selectedLevel === "easy") {
      timeLimit = 10;
    } else if (this.selectedLevel === "medium") {
      timeLimit = 5;
    } else if (this.selectedLevel === "difficult") {
      timeLimit = 2;
    }

    const numbers = this.shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    this.cards = numbers;
    this.showPlayButton = true;
    this.targetNumber = this.getRandomNumber(1, 9);
    this.showNumbers = true;
    this.gameStarted = true;
    this.cardColors = this.cards.map(() => "");
    this.timer = timeLimit;
    this.showPlayButtonMessage = false;

    const countdown = setInterval(() => {
      this.timer--;
      if (this.timer === 0) {
        clearInterval(countdown);
        this.showNumbers = false;
        this.resetCardColors();
        this.gameStarted = false;
      }
    }, 1000);
  }

  onCardClick(index) {
    if (!this.showNumbers && !this.gameStarted && !this.isClicked(index)) {
      this.clickedCardIndex = index;
      const cardValue = this.cards[index];
      const cardElement = this.shadowRoot.querySelector(
        `.card:nth-child(${index + 1})`
      );

      if (cardValue === this.targetNumber) {
        cardElement.classList.add("correct-answer");
        this.cardColors[index] = "correct-answer";
        navigator.vibrate(1000);

        let points;
        if (this.selectedLevel === "easy") {
          points = 10;
        } else if (this.selectedLevel === "medium") {
          points = 20;
        } else if (this.selectedLevel === "difficult") {
          points = 30;
        }

        this.score += points;

        setTimeout(() => {
          this.startNewGame();
        }, 1000);
      } else {
        cardElement.classList.add("wrong-answer");
        this.cardColors[index] = "wrong-answer";

        setTimeout(() => {
          this.resetCardColors();
          this.startNewGame();
          navigator.vibrate(0);
        }, 1000);
      }

      this.disableAllCards();
    }
  }

  disableAllCards() {
    const cardElements = this.shadowRoot.querySelectorAll(".card");
    cardElements.forEach((cardElement) => {
      cardElement.classList.add("disabled");
    });
  }

  resetCardColors() {
    this.cardColors = this.cards.map(() => "");
  }

  shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }

  getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  onLevelSelectChange(event) {
    this.selectedLevel = event.target.value;
  }
}

customElements.define("view-card", ViewCard);
