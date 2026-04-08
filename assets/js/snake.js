  // Render the snake game grid mock
  const grid = document.querySelector('.snake-grid');
  const COLS = 20, ROWS = 20;

  // Snake body positions
  const snake = [
    {x:10,y:10},{x:9,y:10},{x:8,y:10},{x:7,y:10},{x:6,y:10}
  ];
  const food = {x:14, y:7};

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const cell = document.createElement('div');
      cell.className = 'snake-cell';
      const idx = snake.findIndex(s => s.x === c && s.y === r);
      if (c === food.x && r === food.y) {
        cell.classList.add('food');
      } else if (idx === 0) {
        cell.classList.add('s1');
      } else if (idx === 1) {
        cell.classList.add('s2');
      } else if (idx === 2) {
        cell.classList.add('s3');
      } else if (idx === 3) {
        cell.classList.add('s4');
      } else if (idx === 4) {
        cell.classList.add('s5');
      }
      grid.appendChild(cell);
    }
  }