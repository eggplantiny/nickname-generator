const express = require('express');

let app = express();

const CORPUS = [
  {
    text: '귀엽고',
    suffix: '귀여운'
  },
  {
    text: '멋있고',
    suffix: '멋진'
  },
  {
    text: '잘생기고',
    suffix: '잘생긴'
  },
  {
    text: '머리좋고',
    suffix: '머리좋은'
  },
  {
    text: '배고프고',
    suffix: '배고픈'
  },
  {
    text: '행복하고',
    suffix: '행복한'
  },
  {
    text: '피곤하고',
    suffix: '피곤한'
  },
  {
    text: '배부르고',
    suffix: '배부른'
  },
  {
    text: '졸리고',
    suffix: '졸린'
  },
  {
    text: '자신감 넘치고',
    suffix: '자신감 넘치는'
  },
  {
    text: '똑똑하고',
    suffix: '똑똑한'
  },
  {
    text: '귀여운',
    suffix: '귀여운'
  },
  {
    text: '섹시하고',
    suffix: '섹시한'
  },
  {
    text: '예쁘고',
    suffix: '예쁜'
  },
  {
    text: '세상에서 제일',
    suffix: '세상에서 제일 멋진'
  },
  {
    text: '우주에서 가장',
    suffix: '우주에서 가장 멋진'
  },
  {
    text: '지구에서 제일',
    suffix: '지구에서 제일 멋진',
  },
  {
    text: '이 세상에서 제일',
    suffix: '이 세상에서 제일',
  },
  {
    text: '자신감 넘치고',
    suffix: '자신감 넘치는',
  }
]

// choose random number of words from corpus with no conflicts
function chooseRandomWords(n = 10) {
  let words = [];
  let used = [];
  let count = Math.floor(Math.random() * n) + 3;
  for (let i = 0; i < count; i++) {
    let index = Math.floor(Math.random() * CORPUS.length);
    while (used.includes(index)) {
      index = Math.floor(Math.random() * CORPUS.length);
    }
    used.push(index);
    words.push(CORPUS[index]);
  }
  return words;
}

function generateNickname(name = '김세진') {
  const corpus = chooseRandomWords();
  const words = []

  for (let index = 0; index < corpus.length; index += 1) {
    console.log(index, corpus.length - 1)
    if (index === corpus.length - 1) {
      words.push(corpus[index].suffix);
    }
    else {
      words.push(corpus[index].text);
    }
  }

  words.push(name);

  return words.join(' ')
}

app.get('/api/', (req, res) => {
  const nickname = generateNickname()

  res.json({
    "response_type": "in_channel",
    "text": nickname,
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
