import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

const STATUS_LIMIT = 5;
let TITLES = [

]

document.addEventListener('alpine:init', () => {
  Alpine.data('app', () => ({
	books: 0,
	booksPurchased: 0,
	dollars: 0,
    statuses: [],

    async init() {
        setInterval(() => { this.heartBeat() }, 1000);

        this.addStatus('A beginning is the time for taking the most');
        this.addStatus('delicate care that the balances are correct.');
        this.addStatus('Frank Herbert, Dune');
        this.addStatus('********************************************');
        this.addStatus('You decide to start a library.');

        const res = d3.csvParse("Name,Age\nJane,29\nJoe,33");
        console.log(res);      
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
            this.addStatus('You bought a book.');
            this.dollars -= 5;
            this.books += 1;
            this.booksPurchased += 1;
        }
    }
  }))
});
