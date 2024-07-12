const STATUS_LIMIT = 5;
let BOOKS = [];

document.addEventListener('alpine:init', () => {
  Alpine.data('app', () => ({
	bookCount: 0,
	booksPurchased: 0,
	dollars: 0,
    statuses: [],

    async init() {
        setInterval(() => { this.heartBeat() }, 1000);
        createInitialConsole(this);
        BOOKS = await loadBooks();
        BOOKS = shuffle(BOOKS);
    },

    heartBeat() {
        this.dollars += 1;
    },

    addStatus(status) {
        this.statuses.push(status);

        if (this.statuses.length > STATUS_LIMIT) {
            this.statuses = this.statuses.slice(-STATUS_LIMIT); // If more statuses than limit, reduce to limit
        }
    },
    
    buyBook() {
        if (this.dollars >= 5) {
            let book = getRandomBook();
            this.addStatus(`You bought ${book.title} by ${book.author}`);
            this.dollars -= 5;
            this.bookCount += 1;
            this.booksPurchased += 1;
        }
    },

    get win() {
        return this.booksPurchased >= 1000;
    }
  }))
});

async function loadBooks() {
    const url = 'https://librarygame.koser.us/data/books.csv';
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Load books: ${response.status}`);
        }
    
        const text = await response.text();
        const csv = await d3.csvParse(text);
        return csv;
    } catch (error) {
        console.error(error.message);
        return [];
    }
  }
  
function createInitialConsole(self) {
    self.addStatus('A beginning is the time for taking the most');
    self.addStatus('delicate care that the balances are correct.');
    self.addStatus('Frank Herbert, Dune');
    self.addStatus('********************************************');
    self.addStatus('You decide to start a library.');
}

function getRandomBook() {
    return BOOKS.pop();
}

function shuffle(array) {
    var m = array.length, t, i;
  
    // While there remain elements to shuffle…
    while (m) {
  
      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);
  
      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
  
    return array;
}