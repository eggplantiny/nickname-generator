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
    link: 'https://github.com/setosejin',
    color: '#2eb886',
  },
  '김성화': {
    image: 'https://ca.slack-edge.com/T03B3BN98DC-U03AVD5J0NT-6905960ccb37-512',
    link: 'https://github.com/sh827kim/',
    color: '#581010',
  },
  '정성우': {
    image: 'https://ca.slack-edge.com/T03B3BN98DC-U03B9A1694N-8f3202ea6b13-512',
    link: 'https://github.com/eggplantiny/',
    color: '#5D32BE',
  },
  '최승훈': {
    image: 'https://ca.slack-edge.com/T03B3BN98DC-U03B96LULLW-1c77fd804ed1-512',
    color: '#bfc819',
  },
  '이승연': {
    image: 'https://ca.slack-edge.com/T03B3BN98DC-U03BJ07QYDS-075296008923-512',
    color: '#2cc023',
  },
  '오현지': {
    image: 'https://ca.slack-edge.com/T03B3BN98DC-U03BCNUG6Q5-e90c933b629c-512',
    color: '#c354bd',
  },
  '오상현': {
    image: 'https://ca.slack-edge.com/T03B3BN98DC-U03MPF13BBJ-9d567058deb5-512',
    color: '#279b8b',
  },
  '사봉준': {
    image: 'https://ca.slack-edge.com/T03B3BN98DC-U03MPFWCMNU-gd84feb8e0e1-512',
    color: '#070745',
  }
}

// a function for choose random user key from UserInfo
function generateRandomUserKey() {
  const keys = Object.keys(UserInfo)
  return keys[keys.length * Math.random() << 0]
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

function generateCard(name, nickname, userName) {
  return {
    "response_type": "in_channel",
    "attachments": [
      {
        "color": UserInfo[name]?.color ?? DEFAULT_COLOR,
        "author_name": '닉네임 생성기 🤖',
        "author_link": UserInfo[name]?.image ?? DEFAULT_IMAGE,
        "author_icon": UserInfo[name]?.image ?? DEFAULT_IMAGE,
        "title": `${name} 님의 닉네임은?`,
        "title_link": UserInfo[name]?.link ?? DEFAULT_IMAGE,
        "text": nickname,
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
  const name = body.text && body.text.length > 0 ? body.text : generateRandomUserKey();
  const userName = body.user_name
  const nickname = generateNickname(name)

  res.setHeader('content-type', 'application/json');
  res.json(generateCard(name, nickname, userName));
});

app.listen(10054);
