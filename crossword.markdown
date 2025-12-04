---
layout: shamgate-layout
title: Cryptic Christmas Advent
---

<div id="crossword-container">  
  <main>
    <div id="grid-wrapper">
      <div id="crossword-grid"></div>
      <div id="current-clue-mobile">
        <div id="current-clue-text"></div>
      </div>
    </div>
    
    <div id="clues-container">
      <div class="clues-section">
        <h3>Across</h3>
        <div id="across-clues"></div>
      </div>
      <div class="clues-section">
        <h3>Down</h3>
        <div id="down-clues"></div>
      </div>
    </div>
  </main>

  <div id="mobile-keyboard">
    <div class="keyboard-row">
      <button class="key-btn" data-key="Q">Q</button>
      <button class="key-btn" data-key="W">W</button>
      <button class="key-btn" data-key="E">E</button>
      <button class="key-btn" data-key="R">R</button>
      <button class="key-btn" data-key="T">T</button>
      <button class="key-btn" data-key="Y">Y</button>
      <button class="key-btn" data-key="U">U</button>
      <button class="key-btn" data-key="I">I</button>
      <button class="key-btn" data-key="O">O</button>
      <button class="key-btn" data-key="P">P</button>
    </div>
    <div class="keyboard-row">
      <button class="key-btn" data-key="A">A</button>
      <button class="key-btn" data-key="S">S</button>
      <button class="key-btn" data-key="D">D</button>
      <button class="key-btn" data-key="F">F</button>
      <button class="key-btn" data-key="G">G</button>
      <button class="key-btn" data-key="H">H</button>
      <button class="key-btn" data-key="J">J</button>
      <button class="key-btn" data-key="K">K</button>
      <button class="key-btn" data-key="L">L</button>
    </div>
    <div class="keyboard-row">
      <button class="key-btn" data-key="Z">Z</button>
      <button class="key-btn" data-key="X">X</button>
      <button class="key-btn" data-key="C">C</button>
      <button class="key-btn" data-key="V">V</button>
      <button class="key-btn" data-key="B">B</button>
      <button class="key-btn" data-key="N">N</button>
      <button class="key-btn" data-key="M">M</button>
      <button class="key-btn key-backspace" data-key="Backspace">⌫</button>
    </div>
  </div>

  <div id="controls">
    <button id="clear-grid">Clear Grid</button>
    <!-- <button id="check-answers">Check Progress</button> -->
  </div>
  <div id="crossword-info">
    <p>One clue revealed per day throughout Advent 🎄</p>
    <p id="today-date"></p>
  </div>
</div>

<style>
  h1 {
    display: none;
  }

  #crossword-container {
    max-width: 100rem;
    margin: auto;
    padding: 1rem;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  }
  
  #crossword-info {
    text-align: center;
    margin-bottom: 2rem;
    color: #666;
  }

  main {
    display: flex;
    gap: 2rem;
    align-items: flex-start;
    margin-bottom: 2rem;
  }

  #grid-wrapper {
    flex: 1;
  }
  
  #crossword-grid {
    display: inline-grid;
    gap: 2px;
    background: #000;
    padding: 2px;
  }
  
  .cell {
    aspect-ratio: 1;
    background: white;
    border: 1px solid #000;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .cell.black {
    background: #000;
  }
  
  .cell input {
    width: 100%;
    height: 100%;
    border: none;
    text-align: center;
    font-size: 3rem;
    text-transform: uppercase;
    background: transparent;
    outline: none;
  }
  
  .cell input:focus {
    background: #ffffcc;
  }
  
  .cell.active {
    background: #cce5ff;
  }
  
  .cell-number {
    position: absolute;
    top: 2px;
    left: 3px;
    font-size: 1rem;
  }
  
  #clues-container {
    flex: 1;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }

  #current-clue-mobile {
    display: none;
    margin-top: 1rem;
    padding: 1rem;
    background: #f8f8f8;
    border-radius: 8px;
    border: 2px solid #cce5ff;
    min-height: 3rem;
  }

  #current-clue-text {
    font-size: 1rem;
    line-height: 1.5;
  }

  /* Mobile on-screen keyboard: hidden by default (desktop) */
  #mobile-keyboard {
    display: none;
  }
  
  .clues-section h3 {
    margin-bottom: 1rem;
    border-bottom: 2px solid #333;
    padding-bottom: 0.5rem;
  }
  
  .clue-item {
    margin-bottom: 0.75rem;
    padding: 0.5rem;
    cursor: pointer;
    border-radius: 4px;
  }
  
  .clue-item:hover {
    background: #f0f0f0;
  }
  
  .clue-item.active {
    background: #cce5ff;
  }
  
  .clue-item.locked {
    color: #999;
    font-style: italic;
    cursor: not-allowed;
  }
  
  .clue-item.locked:hover {
    background: transparent;
  }
  
  .clue-number {
    font-weight: bold;
    margin-right: 0.5rem;
  }

  .keyboard-row {
    display: flex;
    justify-content: center;
    gap: 6px;
    margin-bottom: 6px;
    flex-wrap: nowrap; /* prevent rows from wrapping */
  }

  .key-btn {
    flex: 0 0 32px;
    height: 48px;
    margin: 0;
    font-size: 1.05rem;
    font-weight: 700;
    border: 1px solid #999;
    border-radius: 6px;
    background: #fff;
    color: #000;
    cursor: pointer;
    touch-action: manipulation;
    user-select: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0 4px;
    min-width: 32px;
  }
  
  #controls {
    text-align: center;
    margin-top: 2rem;
  }

  button {
    padding: 0.75rem 1.5rem;
    margin: 0 0.5rem;
    font-size: 1rem;
    cursor: pointer;
    background: #333;
    color: white;
    border: none;
    border-radius: 4px;
  }
  
  button:hover {
    background: #555;
  }
  
  @media (max-width: 768px) {
    #crossword-container {
      padding: 0 1.5rem;
      display: flex;
      flex-direction: column;
      height: 100vh;
      max-height: 77vh;
    }

    main {
      flex-direction: column;
      gap: 1rem;
      flex: 1;
      display: flex;
      overflow: hidden;
      margin-bottom: unset;
    }

    footer {
      display: none !important;
    }

    #clear-grid {
      padding: 0.5rem;
      min-height: unset;
    }

    #today-date {
      display: none;
    }

    #grid-wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      flex-shrink: 0;
    }

    #current-clue-mobile {
      display: block;
      width: 100%;
      max-width: 400px;
    }

    #crossword-grid {
      gap: 1px;
      padding: 1px;
    }

    .cell {
      aspect-ratio: 1;
      border-width: 0.5px;
    }
    
    .cell input {
      font-size: 20px;
    }
    
    #clues-container {
      grid-template-columns: 1fr;
      gap: 1rem;
      overflow-y: auto;
      flex: 1;
      padding-bottom: 2rem;
      width: 100%;
    }
    
    .cell-number {
      font-size: 0.5rem;
      top: 0;
      left: 0'
    }

    #crossword-info {
      margin-bottom: 0;
      font-size: 0.9rem;
    }

    #crossword-info > p {
      margin: 0.25rem;
    }

    #controls {
      margin-top: 0.5rem;
      flex-shrink: 0;
    }

    /* Show and pin the mobile keyboard at the bottom of the viewport */
    #mobile-keyboard {
      display: block;
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      background: #f2f2f2;
      padding: 8px 6px 12px;
      box-shadow: 0 -2px 8px rgba(0,0,0,0.15);
      z-index: 9999;
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
    }

    /* Ensure keyboard rows don't wrap on small viewports */
    #mobile-keyboard .keyboard-row {
      flex-wrap: nowrap;
      white-space: nowrap;
    }

    /* Slightly reduce key size on very small screens */
    @media (max-width: 420px) {
      .key-btn { flex: 0 0 34px; height: 44px; font-size: 0.95rem; }
    }
    button {
      padding: 0.6rem 1.2rem;
      font-size: 0.9rem;
    }
  }
</style>

<script>
// Crossword data - Jekyll will inject this
const crosswordData = {{ site.data.crossword-dec-2025 | jsonify }};

// LocalStorage key
const LOCAL_STORAGE_KEY = 'crossword-dec-2025-guesses';

// Current state
let userGuesses = {};
let currentClue = null;
let focusedCell = null; // {row, col}
let recentUserClick = false;
// on touch devices we force on-screen keyboard behavior - detect touch / coarse pointer devices once
const IS_TOUCH_DEVICE = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(pointer: coarse)').matches;

function init() {
  loadGuesses();
  renderGrid();
  renderClues();
  updateDate();
}

function loadGuesses() {
  const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (saved) {
    try {
      userGuesses = JSON.parse(saved);
    } catch (e) {
      userGuesses = {};
    }
  }
}

// Save guesses to localStorage
function saveGuesses() {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(userGuesses));
}

// Get today's date as YYYY-MM-DD
function getTodayString() {
  const today = new Date();
  return today.toISOString().split('T')[0];
}

function isClueVisible(clue) {
  if (!clue.releaseDate) return false;
  return clue.releaseDate <= getTodayString();
}

function hasClueText(clue) {
  return clue.clue && clue.clue.trim() !== '';
}

function renderGrid() {
  const grid = crosswordData.grid;
  const gridEl = document.getElementById('crossword-grid');
  gridEl.style.gridTemplateColumns = `repeat(${grid.cols}, 1fr)`;
  gridEl.style.gridTemplateRows = `repeat(${grid.rows}, 1fr)`;
  
  // Build cell number map
  const cellNumbers = {};
  crosswordData.clues.forEach(clue => {
    const key = `${clue.row}-${clue.col}`;
    if (!cellNumbers[key] || clue.number < cellNumbers[key]) {
      cellNumbers[key] = clue.number;
    }
  });
  
  // Create cells
  gridEl.innerHTML = '';
  for (let row = 0; row < grid.rows; row++) {
    for (let col = 0; col < grid.cols; col++) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      cell.dataset.row = row;
      cell.dataset.col = col;
      
      if (!grid.structure[row][col]) {
        cell.classList.add('black');
      } else {
        const input = document.createElement('input');
        input.type = 'text';
        input.maxLength = 1;
        input.dataset.row = row;
        input.dataset.col = col;
        
        // Load saved guess
        const key = `${row}-${col}`;
        if (userGuesses[key]) {
          input.value = userGuesses[key];
        }

        // On touch devices make inputs readonly so native keyboard does not appear
        input.readOnly = IS_TOUCH_DEVICE;

        input.addEventListener('pointerdown', () => { recentUserClick = true; setTimeout(() => { recentUserClick = false; }, 300); });
        input.addEventListener('touchstart', () => { recentUserClick = true; setTimeout(() => { recentUserClick = false; }, 300); }, { passive: true });
        input.addEventListener('input', handleInput);
        input.addEventListener('focus', handleFocus);
        input.addEventListener('click', handleClick);
        input.addEventListener('keydown', handleKeydown);
        
        cell.appendChild(input);
        
        const cellKey = `${row}-${col}`;
        if (cellNumbers[cellKey]) {
          const numLabel = document.createElement('span');
          numLabel.className = 'cell-number';
          numLabel.textContent = cellNumbers[cellKey];
          cell.appendChild(numLabel);
        }
      }
      
      gridEl.appendChild(cell);
    }
  }
}

function renderClues() {
  const acrossEl = document.getElementById('across-clues');
  const downEl = document.getElementById('down-clues');
  
  acrossEl.innerHTML = '';
  downEl.innerHTML = '';
  
  const today = getTodayString();
  
  crosswordData.clues.forEach(clue => {
    const clueEl = document.createElement('div');
    clueEl.className = 'clue-item';
    clueEl.dataset.number = clue.number;
    clueEl.dataset.direction = clue.direction;
    
    const visible = isClueVisible(clue);
    const hasText = hasClueText(clue);
    
    if (!visible || !hasText) {
      clueEl.classList.add('locked');
      clueEl.innerHTML = `<span class="clue-number">${clue.number}.</span>🔒 Locked`;
    } else {
      clueEl.innerHTML = `<span class="clue-number">${clue.number}.</span>${clue.clue} (${clue.length})`;
      clueEl.addEventListener('click', () => selectClue(clue));
    }
    
    if (clue.direction === 'across') {
      acrossEl.appendChild(clueEl);
    } else {
      downEl.appendChild(clueEl);
    }
  });
}

function handleInput(e) {
  const input = e.target;
  const row = parseInt(input.dataset.row);
  const col = parseInt(input.dataset.col);
  const value = input.value.toUpperCase();
  
  if (value.match(/[A-Z]/)) {
    userGuesses[`${row}-${col}`] = value;
    saveGuesses();
    
    const isLastCellOfClue = currentClue && 
      ((currentClue.direction === 'across' && col === currentClue.col + currentClue.length - 1) ||
       (currentClue.direction === 'down' && row === currentClue.row + currentClue.length - 1));
    
    if (currentClue) {
      moveToNextCell(row, col);
    }
  } else {
    // If input is cleared/deleted, remove from storage
    input.value = '';
    delete userGuesses[`${row}-${col}`];
    saveGuesses();
  }
}

function handleFocus(e) {
  const input = e.target;
  const row = parseInt(input.dataset.row);
  const col = parseInt(input.dataset.col);
  
  // Find all clues this cell belongs to
  const clues = findCluesForCell(row, col);
  
  if (clues.length === 0) return;
  
  // On initial focus, just select the first available clue
  if (clues.length > 0) {
    // If this cell is part of the currentClue, don't change selection (prevents switching
    // to the crossing clue when navigating within the same clue). Otherwise select the first clue.
    const isPartOfCurrent = currentClue && clues.find(c => c.number === currentClue.number && c.direction === currentClue.direction);
    if (!isPartOfCurrent) {
      selectClue(clues[0], false);
    }
  }
  
  // Mark that we just focused (to prevent click from immediately toggling)
  input.dataset.justFocused = 'true';
  setTimeout(() => {
    delete input.dataset.justFocused;
  }, 100);

  // Track focused cell explicitly for mobile keyboard
  focusedCell = { row, col };

  // If this focus wasn't from a recent user click and the cell already has a value
  // and it's part of the currentClue, auto-skip to the next empty cell. This prevents
  // switching to the crossing clue when moving through a filled intersection.
  if (!recentUserClick && input.value && currentClue) {
    const clues = findCluesForCell(row, col);
    const isPartOfCurrent = clues.find(c => c.number === currentClue.number && c.direction === currentClue.direction);
    if (isPartOfCurrent) {
      setTimeout(() => {
        if (document.activeElement === input) {
          moveToNextCell(row, col);
        }
      }, 0);
    }
  }
}

function handleClick(e) {
  const input = e.target;
  
  // Don't toggle if this click was part of the initial focus
  if (input.dataset.justFocused) {
    return;
  }
  
  const row = parseInt(input.dataset.row);
  const col = parseInt(input.dataset.col);

  // Update focusedCell on click as well
  focusedCell = { row, col };

  // Mark a short-lived flag so focus handlers know this was a user click
  recentUserClick = true;
  setTimeout(() => { recentUserClick = false; }, 200);
  
  // Find all clues this cell belongs to
  const clues = findCluesForCell(row, col);
  
  if (clues.length === 0) return;
  
  // If there's only one clue, select it
  if (clues.length === 1) {
    selectClue(clues[0], false);
    return;
  }
  
  // If there are multiple clues (intersection), toggle between them
  if (clues.length > 1) {
    // Check if we're already on one of these clues
    const currentIndex = clues.findIndex(c => 
      currentClue && c.number === currentClue.number && c.direction === currentClue.direction
    );
    
    // Toggle to the next clue
    if (currentIndex !== -1) {
      const nextIndex = (currentIndex + 1) % clues.length;
      selectClue(clues[nextIndex], false);
    } else {
      // No current clue or not one of these clues, select the first one
      selectClue(clues[0], false);
    }
  }
}

function handleKeydown(e) {
  const input = e.target;
  const row = parseInt(input.dataset.row);
  const col = parseInt(input.dataset.col);
  
  if (e.key === 'Backspace' && input.value === '') {
    moveToPrevCell(row, col);
  } else if (e.key === 'Tab') {
    if (currentClue) {
      const isLastCellOfClue = 
        (currentClue.direction === 'across' && col === currentClue.col + currentClue.length - 1) ||
        (currentClue.direction === 'down' && row === currentClue.row + currentClue.length - 1);
      if (isLastCellOfClue) {
        e.preventDefault();
        moveToNextCell(row, col);
        return;
      }
    }
  } else if (e.key === 'ArrowRight') {
    moveInDirection(row, col, 0, 1);
    e.preventDefault();
  } else if (e.key === 'ArrowLeft') {
    moveInDirection(row, col, 0, -1);
    e.preventDefault();
  } else if (e.key === 'ArrowDown') {
    moveInDirection(row, col, 1, 0);
    e.preventDefault();
  } else if (e.key === 'ArrowUp') {
    moveInDirection(row, col, -1, 0);
    e.preventDefault();
  }
}

function findCluesForCell(row, col) {
  return crosswordData.clues.filter(clue => {
    if (!isClueVisible(clue) || !hasClueText(clue)) return false;
    
    if (clue.direction === 'across') {
      return row === clue.row && col >= clue.col && col < clue.col + clue.length;
    } else {
      return col === clue.col && row >= clue.row && row < clue.row + clue.length;
    }
  });
}

// Return ordered visible clues: across (asc), then down (asc)
function getOrderedVisibleClues() {
  const visible = crosswordData.clues.filter(clue => isClueVisible(clue) && hasClueText(clue));
  const across = visible.filter(c => c.direction === 'across').sort((a,b) => a.number - b.number);
  const down = visible.filter(c => c.direction === 'down').sort((a,b) => a.number - b.number);
  return across.concat(down);
}

function getNextClue(clue) {
  const ordered = getOrderedVisibleClues();
  if (!ordered.length) return null;
  if (!clue) return ordered[0];
  const idx = ordered.findIndex(c => c.number === clue.number && c.direction === clue.direction);
  if (idx === -1) return ordered[0];
  return ordered[(idx + 1) % ordered.length];
}

function selectClue(clue, shouldFocus = true) {
  currentClue = clue;
  
  // Highlight clue in list
  document.querySelectorAll('.clue-item').forEach(el => el.classList.remove('active'));
  document.querySelector(`.clue-item[data-number="${clue.number}"][data-direction="${clue.direction}"]`)?.classList.add('active');
  
  // Highlight cells
  document.querySelectorAll('.cell').forEach(el => el.classList.remove('active'));
  for (let i = 0; i < clue.length; i++) {
    let r = clue.row;
    let c = clue.col;
    if (clue.direction === 'across') {
      c += i;
    } else {
      r += i;
    }
    document.querySelector(`.cell[data-row="${r}"][data-col="${c}"]`)?.classList.add('active');
  }
  
  // Update mobile current clue display
  const currentClueText = document.getElementById('current-clue-text');
  if (currentClueText) {
    currentClueText.innerHTML = `<strong>${clue.number}.</strong> ${clue.clue} (${clue.length})`;
  }
  
  // Focus first empty cell in clue (only if requested)
  if (shouldFocus) {
    focusFirstEmptyInClue(clue);
  }
}

// Focus first empty cell in current clue
function focusFirstEmptyInClue(clue) {
  for (let i = 0; i < clue.length; i++) {
    let r = clue.row;
    let c = clue.col;
    if (clue.direction === 'across') {
      c += i;
    } else {
      r += i;
    }
    const input = document.querySelector(`input[data-row="${r}"][data-col="${c}"]`);
    if (input && !input.value) {
      input.focus();
      focusedCell = { row: r, col: c };
      return;
    }
  }
  // If all filled, focus first cell
  const r = clue.row;
  const c = clue.col;
  const firstInput = document.querySelector(`input[data-row="${r}"][data-col="${c}"]`);
  if (firstInput) {
    firstInput.focus();
    focusedCell = { row: r, col: c };
  }
}

function isPuzzleComplete() {
  const allInputs = document.querySelectorAll('input[type="text"]');
  return Array.from(allInputs).every(input => input.value.trim() !== '');
}

// Move to next cell in current clue
function moveToNextCell(row, col) {
  if (!currentClue) return;
  // Helper: find next empty cell index within the current clue (starting after current position)
  function findNextEmptyInClue(clue, afterRow, afterCol) {
    for (let i = 0; i < clue.length; i++) {
      let r = clue.row;
      let c = clue.col;
      if (clue.direction === 'across') c += i; else r += i;
      // only consider cells after the current one
      if (clue.direction === 'across') {
        if (r === afterRow && c <= afterCol) continue;
      } else {
        if (c === afterCol && r <= afterRow) continue;
      }
      const input = document.querySelector(`input[data-row="${r}"][data-col="${c}"]`);
      if (input && !input.value) {
        return { r, c };
      }
    }
    return null;
  }

  const nextEmpty = findNextEmptyInClue(currentClue, row, col);
  if (nextEmpty) {
    const input = document.querySelector(`input[data-row="${nextEmpty.r}"][data-col="${nextEmpty.c}"]`);
    if (input) {
      input.focus();
      focusedCell = { row: nextEmpty.r, col: nextEmpty.c };
    }
    return;
  }

  // No empty cells in current clue after this cell - advance to next clue (unless puzzle is complete)
  if (!isPuzzleComplete()) {
    const nextClue = getNextClue(currentClue);
    if (nextClue) {
      selectClue(nextClue, true);
    }
  }
  // If puzzle is complete, stay on current cell (don't advance)
}

// Move to previous cell
function moveToPrevCell(row, col) {
  if (!currentClue) return;
  
  if (currentClue.direction === 'across') {
    const prevCol = col - 1;
    if (prevCol >= currentClue.col) {
      const input = document.querySelector(`input[data-row="${row}"][data-col="${prevCol}"]`);
      if (input) {
        input.focus();
        input.value = '';
        delete userGuesses[`${row}-${prevCol}`];
        saveGuesses();
        focusedCell = { row, col: prevCol };
      }
    }
  } else {
    const prevRow = row - 1;
    if (prevRow >= currentClue.row) {
      const input = document.querySelector(`input[data-row="${prevRow}"][data-col="${col}"]`);
      if (input) {
        input.focus();
        input.value = '';
        delete userGuesses[`${prevRow}-${col}`];
        saveGuesses();
        focusedCell = { row: prevRow, col };
      }
    }
  }
}

// Move in arrow direction
function moveInDirection(row, col, dRow, dCol) {
  const newRow = row + dRow;
  const newCol = col + dCol;
  const input = document.querySelector(`input[data-row="${newRow}"][data-col="${newCol}"]`);
  if (input) {
    input.focus();
    focusedCell = { row: newRow, col: newCol };
  }
}

// Update date display
function updateDate() {
  const today = new Date();
  document.getElementById('today-date').textContent = 
    `Today: ${today.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`;
}

// Clear grid
document.getElementById('clear-grid').addEventListener('click', () => {
  if (confirm('Are you sure you want to clear the entire grid?')) {
    userGuesses = {};
    saveGuesses();
    document.querySelectorAll('input').forEach(input => input.value = '');
  }
});

// Mobile keyboard handlers
document.querySelectorAll('.key-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const key = btn.dataset.key;
    // Use explicit focusedCell tracker when available (more reliable on mobile)
    if (focusedCell) {
      const row = focusedCell.row;
      const col = focusedCell.col;
      const input = document.querySelector(`input[data-row="${row}"][data-col="${col}"]`);
      if (!input) return;

      if (key === 'Backspace') {
        if (input.value === '') {
          moveToPrevCell(row, col);
        } else {
          input.value = '';
          delete userGuesses[`${row}-${col}`];
          saveGuesses();
        }
      } else {
        input.value = key;
        userGuesses[`${row}-${col}`] = key;
        saveGuesses();

        // Move focus to next cell / next clue; moveToNextCell will focus and update focusedCell
        if (currentClue) {
          moveToNextCell(row, col);
        }
      }
    }
  });
});

init();
</script>
