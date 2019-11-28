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
    editLinks: false,
    lastUpdated: false,
    // search: false,
    nav: [
      {
        text: 'Html&Css',
        link: '/Html&Css/',
      },
      {
        text: 'JavaScript',
        link: '/JavaScript/'
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
          // children: [
          //   '',
          //   'using-vue',
          // ]
        }
      ],
      '/JavaScript/': [
        {
          title: 'JavaScript',
          collapsable: false
        }
      ],
      '/Vue/': [
        {
          title: 'Vue',
          collapsable: false
        }
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
      ]
    }
  },
  plugins: [
    '@vuepress/plugin-back-to-top',
    '@vuepress/plugin-medium-zoom',
  ]
}
