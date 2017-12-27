
// WebHook
const WebHook = {
  event: 'collections.save.after',
  hook: 'requestb',
  backend: 1,
  args: [
    'portfolio',
    {
      title: 'Project Ones',
      description: 'clodsmcaoidnc ',
      title_slug: 'project-ones',
      _mby: '5a3bf33ab5262doc1197003155',
      _by: '5a3bf33ab5262doc1197003155',
      _modified: 1513948857,
      _created: 1513878440,
      _id: '5a3bf3a810d59doc1957272294',
      published: true,
    },
    true,
  ],
};

// WebSocket
const WebSocket = {
  event: 'cockpit:collections.preview',
  entry: {
    title: 'This is supper fast!!',
    description: 'Oi',
    published: true,
    title_slug: 'this-is-supper-fast',
    _mby: '5a3bf33ab5262doc1197003155',
    _by: '5a3bf33ab5262doc1197003155',
    _modified: 1514387407,
    _created: 1513881601,
    _id: '5a3c00012dad9doc1289733293',
  },
  lang: 'default',
};

console.log('WebHook: ', WebHook);
console.log('WebSocket: ', WebSocket);
