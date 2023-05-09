import { Component, h, State, Element } from '@stencil/core';
import axios from 'axios';
import Chart from 'chart.js/auto';

@Component({
  tag: 'wc-graph',
  styleUrl: 'wc-graph.css',
  shadow: true,
})
export class WcGraph {
  @State() stockData: any = [];
  @Element() private element: HTMLElement;

  async componentWillLoad() {
    const apiKey = 'IF751ZLI7R25YVTE';
    const response = await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=IBM&outputsize=compact&apikey=${apiKey}`);
    const data = response.data['Time Series (Daily)'];
    const labels = Object.keys(data).reverse();
    const prices = labels.map(date => parseFloat(data[date]['4. close']));
    this.stockData = { labels, prices };
  }

  componentDidLoad() {
    const canvas = this.element.shadowRoot.querySelector('#chart') as any;
    const ctx = canvas.getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.stockData.labels,
        datasets: [
          {
            label: 'IBM Stock Price',
            data: this.stockData.prices,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
          },
        ],
      },
    });
  }

  render() {
    return (
      <div>
        <h2>Stock Market Changes</h2>
        <canvas id="chart"></canvas>
      </div>
    );
  }
}
