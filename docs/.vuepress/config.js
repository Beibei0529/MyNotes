const { description } = require('../../package')

module.exports = {
  title: 'NoteBook',
  description: description,
  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
  ],
  themeConfig: {
    // lastUpdated: false,
    // displayAllHeaders: true,
    // search: false,
    nav: [
      {
        text: 'Html&Css',
        link: '/Html&Css/',
      },
      {
        text: 'JavaScript',
        link: '../JavaScript/Scope.md'
      },
      {
        text: 'Vue',
        link: '/Vue/',
      },
      {
        text: 'chrome',
        link: '/chrome/'
      },
      {
        text: '网络',
        link: '/网络/',
      },
      {
        text: '算法',
        link: '/算法/'
      }
    ],
    sidebar: {
      '/Html&Css/': [
        {
          title: 'Html&Css',
          collapsable: false
        }
      ],
      '/JavaScript/': [
        ['../JavaScript/Scope.md', '作用域(Scope)'],
        ['../JavaScript/Hoisting.md', '提升(Hoisting)'],
        ['../JavaScript/Closure.md', '闭包(Closure)'],
        ['../JavaScript/Prototype.md', '原型（Prototype）'],
        ['../JavaScript/this.md', 'this'],
        ['../JavaScript/Promise.md', 'Promise'],
        ['../JavaScript/EventLoop.md', '事件循环(EventLoop)'],
        ['../JavaScript/design.md', '设计模式'],
      ],
      '/Vue/': [
        ['../Vue/Vue注意事项.md', 'Vue注意事项'],
      ],
      '/chrome/': [
        {
          title: 'chrome',
          collapsable: false
        }
      ],
      '/网络/': [
        {
          title: '网络',
          collapsable: false
        }
      ],
      '/算法/': [
        {
          title: '算法',
          collapsable: false
        }
      ],
      '/': [
        '',
      ]
    }
  },
  plugins: [
    '@vuepress/plugin-back-to-top',
    '@vuepress/plugin-medium-zoom',
  ]
}
