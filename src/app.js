const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended:true }));

const DEFAULT_IMAGE = 'https://my-lingo.com/image/I1290.png'
const DEFAULT_COLOR = '#2eb886';

const CORPUS = [
  {
    text: '귀엽고',
    suffix: '귀여운',
    emotion: 'happiness',
    emoji: '😍',
  },
  {
    text: '멋있고',
    suffix: '멋진',
    emotion: 'cool',
    emoji: '😎',
  },
  {
    text: '잘생기고',
    suffix: '잘생긴',
    emotion: 'cool',
    emoji: '😎',
  },
  {
    text: '머리좋고',
    suffix: '머리좋은',
    emotion: 'cool',
    emoji: '🤓',
  },
  {
    text: '배고프고',
    suffix: '배고픈',
    emotion: 'sadness',
    emoji: '😩',
  },
  {
    text: '행복하고',
    suffix: '행복한',
    emotion: 'happiness',
    emoji: '😊',
  },
  {
    text: '피곤하고',
    suffix: '피곤한',
    emotion: 'sadness',
    emoji: '😴',
  },
  {
    text: '배부르고',
    suffix: '배부른',
    emotion: 'happiness',
    emoji: '😋',
  },
  {
    text: '졸리고',
    suffix: '졸린',
    emotion: 'sadness',
    emoji: '😴',
  },
  {
    text: '자신감 넘치고',
    suffix: '자신감 넘치는',
    emotion: 'cool',
    emoji: '😎',
  },
  {
    text: '똑똑하고',
    suffix: '똑똑한',
    emotion: 'cool',
    emoji: '🤓',
  },
  {
    text: '섹시하고',
    suffix: '섹시한',
    emotion: 'cool',
    emoji: '😘',
  },
  {
    text: '예쁘고',
    suffix: '예쁜',
    emotion: 'happiness',
    emoji: '😍',
  },
  {
    text: '세상에서 제일',
    suffix: '세상에서 제일 멋진',
    emotion: 'cool',
    emoji: '😎',
  },
  {
    text: '우주에서 가장',
    suffix: '우주에서 가장 멋진',
    emotion: 'cool',
    emoji: '😎',
  },
  {
    text: '지구에서 제일',
    suffix: '지구에서 제일 멋진',
    emotion: 'cool',
    emoji: '😎',
  },
  {
    text: '이 세상에서 제일',
    suffix: '이 세상에서 제일 멋진',
    emotion: 'cool',
    emoji: '😎',
  },
  {
    text: '자신감 넘치고',
    suffix: '자신감 넘치는',
    emotion: 'cool',
    emoji: '😎',
  }
]

const UserInfo = {
  '김세진': {
    image: 'https://ca.slack-edge.com/T03B3BN98DC-U03CAPJ175F-a1ecf5beed3e-512',
    link: 'https://www.naver.com',
    color: '#2eb886',
  }
}

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
  let last = null;
  for (let index = 0; index < corpus.length; index += 1) {

    if (index === corpus.length - 1) {
      words.push(corpus[index].suffix);
      last = corpus[index];
    }
    else {
      words.push(corpus[index].text);
    }
  }

  words.push(name);
  words.push(last.emoji);

  return words.join(' ')
}

function hasCard(name) {
  return name in UserInfo;
}

function generateCard(name, nickname, userName) {
  return {
    "response_type": "in_channel",
    "attachments": [
      {
        "fallback": "Plain-text summary of the attachment.",
        "color": UserInfo[name]?.color ?? DEFAULT_COLOR,
        "pretext": `${name} 님의 닉네임은?`,
        "author_name": userName,
        "author_link": UserInfo[name]?.image ?? DEFAULT_IMAGE,
        "author_icon": UserInfo[name]?.image ?? DEFAULT_IMAGE,
        "title": `${name} 님의 닉네임은?`,
        "title_link": UserInfo[name]?.link ?? DEFAULT_IMAGE,
        "text": nickname,
        "fields": [
          // {
          //   "title": "Priority",
          //   "value": "High",
          //   "short": false
          // }
        ],
        "image_url": UserInfo[name]?.image ?? DEFAULT_IMAGE,
        "thumb_url": UserInfo[name]?.image ?? DEFAULT_IMAGE,
        "footer": `${name} 님의 사진`,
        "footer_icon": UserInfo[name]?.image ?? DEFAULT_IMAGE,
        "ts": Date.now()
      }
    ]
  }
}

app.get('/api/', (req, res) => {
  const nickname = generateNickname()

  res.json({
    "response_type": "in_channel",
    "text": nickname,
    "url_private": 'https://ca.slack-edge.com/T03B3BN98DC-U03CAPJ175F-a1ecf5beed3e-512'
  });
});


app.post('/api/', (req, res) => {
  const { body } = req;
  const name = body.text && body.text.length > 0 ? body.text : '김세진'
  const userName = body.user_name
  const nickname = generateNickname(name)

  res.setHeader('content-type', 'application/json');
  res.json(generateCard(name, nickname, userName));
});

app.listen(10054);
