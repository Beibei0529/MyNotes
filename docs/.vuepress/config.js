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
        link: '/Html&Css/Center.md',
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
        text: 'Chrome',
        link: '/Chrome/'
      },
      {
        text: '网络',
        link: '/Net/',
      },
      {
        text: '算法',
        link: '/算法/'
      }
    ],
    sidebar: {
      '/Html&Css/': [
        ['../Html&Css/Center.md','CSS水平垂直居中']
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
      '/Chrome/': [
        {
          title: 'Chrome',
          collapsable: false
        }
      ],
      '/Net/': [
        {
          title: '网络',
          collapsable: false
        }
      ],
      '/算法/': [
        ['../算法/Sort.md','常用排序算法'],
        ['../算法/BinaryTree.md','二叉树'],
        ['../算法/Common.md','面试常见算法题'],
      ]  
    }
  },
  plugins: [
    '@vuepress/plugin-back-to-top',
    '@vuepress/plugin-medium-zoom',
  ]
}
