import Vue from 'vue';

document.addEventListener('DOMContentLoaded', () => {
  new Vue({
    el: "#app",
    data: {
      rates: null,
      base: null,
      baseInput: 0,
      selectedCurrency: null
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
        const request = fetch('https://api.exchangeratesapi.io/latest')
        .then(response => response.json())
        .then(data => { this.rates = data.rates; this.base = data.base });
      }
    }
  })
})
