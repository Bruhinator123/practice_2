// board
const board = document.querySelector(".game_board");
const ctx = board.getContext("2d");
const block_size = 10;
const row = 30;
const column = 30;
const game_speed = 9;

//snake
let snake_x = 10; //snake pos x
let snake_y = 10; // snake pos y
let snake_part = [];

let velocity_x = 0; // snake yon
let velocity_y = 0; // snake yon

//apple
let apple_x; // apple pos x
let apple_y; // apple pos y

//score
const score_text = document.querySelector(".score");
const last_score_text = document.querySelector(".last-score");
const best_score_text = document.querySelector(".best-score");
let game_over = false;
let score = 0;
let last_score;
let best_score = 0;

window.onload = function () {
  board.width = row * block_size;
  board.height = column * block_size;
  AppleRandomPos();
  ScorePreview();

  setInterval(DrawItems, 1000 / game_speed);
};

document.addEventListener("keydown", KeyboardControll);

function DrawItems() {
  //board background
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, board.width, board.height);
  Snake();
  //apple
  ctx.fillStyle = "red";
  ctx.fillRect(apple_x, apple_y, block_size, block_size);
  GameOver();
}

function Snake() {
  if (snake_x == apple_x && snake_y == apple_y) {
    snake_part.push([apple_x, apple_y]);
    AppleRandomPos();
    score++;
    score_text.textContent = score;
  }
  for (let i = snake_part.length - 1; i > 0; i--) {
    snake_part[i] = snake_part[i - 1];
  }
  if (snake_part.length) {
    snake_part[0] = [snake_x, snake_y];
  }

  ctx.fillStyle = "blue";
  snake_x += velocity_x * block_size;
  snake_y += velocity_y * block_size;
  ctx.fillRect(snake_x, snake_y, block_size, block_size);
  for (let i = 0; i < snake_part.length; i++) {
    ctx.fillRect(snake_part[i][0], snake_part[i][1], block_size, block_size);
  }
}

function AppleRandomPos() {
  apple_x = Math.floor(Math.random() * column) * block_size;
  apple_y = Math.floor(Math.random() * row) * block_size;
}

function GameOver() {
  if (
    snake_x < 0 ||
    snake_x > column * block_size ||
    snake_y < 0 ||
    snake_y > row * block_size
  ) {
    Score();
    game_over = true;
    Message();
  }

  for (let i = 0; i < snake_part.length; i++) {
    if (snake_x == snake_part[i][0] && snake_y == snake_part[i][1]) {
      Score();
      game_over = true;
      Message();
    }
  }
}

function Message() {
  window.location.reload(true);
}

function Score() {
  console.log(score);
  localStorage.setItem("last_score", score);
  if (score > localStorage.getItem("best_score")) {
    best_score = score;
    localStorage.setItem("best_score", best_score);
  }
}

function ScorePreview() {
  last_score_text.textContent = localStorage.getItem("last_score");
  best_score_text.textContent = localStorage.getItem("best_score");
}

function KeyboardControll(key) {
  //up
  if (key.keyCode == 38 && velocity_y != 1) {
    velocity_x = 0;
    velocity_y = -1;
  }
  //down
  if (key.keyCode == 40 && velocity_y != -1) {
    velocity_x = 0;
    velocity_y = 1;
  }
  // right
  if (key.keyCode == 39 && velocity_x != -1) {
    velocity_x = 1;
    velocity_y = 0;
  }
  //left
  if (key.keyCode == 37 && velocity_x != 1) {
    velocity_x = -1;
    velocity_y = 0;
  }
}
