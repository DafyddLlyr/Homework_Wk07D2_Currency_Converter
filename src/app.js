import Vue from 'vue';

document.addEventListener('DOMContentLoaded', () => {
  new Vue({
    el: "#app",
    data: {
      rates: null,
      base: "GBP",
      baseInput: 0,
      selectedCurrency: "EUR"
    },
    computed: {
      converted: function() {
        const result = this.baseInput * this.rates[this.selectedCurrency];
        return result.toFixed(2);
      }
    },
    mounted() {
      this.fetchCurrencyData()
    },
    methods: {
      fetchCurrencyData: function() {
        const request = fetch(`https://api.exchangeratesapi.io/latest?base=${this.base}`)
        .then(response => response.json())
        .then(data => { this.rates = data.rates; this.base = data.base })
        // if (this.base == "EUR") {
        //   console.log('euro selected');
        //   Object.assign(this.rates, { "EUR": 1})
        // }
      },
      swapCurrencies: function() {
        if (this.selectedCurrency && this.base) {
          [this.selectedCurrency, this.base] = [this.base, this.selectedCurrency];
        this.fetchCurrencyData();
        }
      },
      updateCurrencies: function() {
        this.fetchCurrencyData();
      }
    }
  })
})
