const express = require('express');

let app = express();

const level1 = ['귀엽고', '멋있고', '예쁘고', '좋은', '머리좋고', '똑똑하고', '잘생기고', '매력적고', '멋지고', '자신감 넘치고', '세상에서 제일', '우주에서 가장', '이 세상에서 최고로'];
const level2 = ['똑똑한', '잘생긴', '매력적인', '귀여운', '멋진', '예쁜', '좋은', '머리좋은', '똑똑한', '잘생긴', '매력적인'];

function generateNickname(name = '김세진') {
  const l1 = level1[Math.floor(Math.random() * level1.length)];
  const l2 = level2[Math.floor(Math.random() * level2.length)];

  return `${l1} ${l2} ${name}`;
}

app.get('/api/', (req, res) => {
  const nickname = generateNickname()
  res.json({
    "response_type": "in_channel",
    "text": nickname
  });
});

app.post('/api/', (req, res) => {
  const nickname = generateNickname()
  res.json({
    "response_type": "in_channel",
    "text": nickname
  });
});

app.listen(10054);
