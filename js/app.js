document.addEventListener('alpine:init', () => {
  Alpine.data('app', () => ({
	books: 0,
	dollars: 0,
    async init() {
        setInterval(() => { this.heartBeat() }, 1000);
    },

    heartBeat() {
        this.dollars += 1;
    },

    buyBook() {
        if (this.dollars >= 5) {
            this.dollars -= 5;
            this.books += 1;
        }
    }
  }))
});
