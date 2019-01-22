const ctx = document.getElementById('ex_chart');

const data = {
  labels: ["業績マネージメント", "プロセスマネージメント", "クライアントマネージメント", "メンバーマネージメント", "組織の場・風土・コミュニケーション", "営業効率化支援ツール", "顧客フォロー・販売支援ツール", "業務フロー支援ツール", "営業サポート体制"],
  datasets: [
    {
      label: 'あなたのスコア',
      data: [3.7, 5, 3.6, 3.4, 2.6, 3.6, 3.2, 3.2, 3.8, 0],
      backgroundColor: 'rgba(211, 233, 197, 1)'
    }
  ]
};

const options = {
  scales: {
    yAxes: [{
      ticks: {
        min: 300
      }
    }]
  }
};

const ex_chart = new Chart(ctx, {
  type: 'horizontalBar',
  data: data,
  options: options
});
