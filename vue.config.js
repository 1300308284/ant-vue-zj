const path = require('path')
const webpack = require('webpack')
const GitRevisionPlugin = require('git-revision-webpack-plugin')
const GitRevision = new GitRevisionPlugin()
const buildDate = JSON.stringify(new Date().toLocaleString())
const createThemeColorReplacerPlugin = require('./config/plugin.config')
// const baseUrl = process.env.VUE_APP_PREVIEW
console.log('>node 当前环境process.env>>:', process.env);
const baseUrl = process.env.NODE_ENV === 'production' ? 'http://127.0.0.1:8090/' : 'http://10.93.45.213:8088/'

function resolve (dir) {
  return path.join(__dirname, dir)
}

// check Git
function getGitHash () {
  try {
    return GitRevision.version()
  } catch (e) {}
  return 'unknown'
}

const isProd = process.env.NODE_ENV === 'production'

const assetsCDN = {
  // webpack build externals
  externals: {
    vue: 'Vue',
    'vue-router': 'VueRouter',
    vuex: 'Vuex',
    axios: 'axios'
  },
  css: [],
  // https://unpkg.com/browse/vue@2.6.10/
  js: [
    '//cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.min.js',
    '//cdn.jsdelivr.net/npm/vue-router@3.5.1/dist/vue-router.min.js',
    '//cdn.jsdelivr.net/npm/vuex@3.1.1/dist/vuex.min.js',
    '//cdn.jsdelivr.net/npm/axios@0.21.1/dist/axios.min.js'
  ]
}

// vue.config.js
const vueConfig = {
  configureWebpack: {
    // webpack plugins
    plugins: [
      // Ignore all locale files of moment.js
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      new webpack.DefinePlugin({
        APP_VERSION: `"${require('./package.json').version}"`,
        GIT_HASH: JSON.stringify(getGitHash()),
        BUILD_DATE: buildDate
      })
    ],
    // if prod, add externals
    externals: isProd ? assetsCDN.externals : {}
  },

  chainWebpack: config => {
    config.resolve.alias.set('@$', resolve('src'))

    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule
      .oneOf('inline')
      .resourceQuery(/inline/)
      .use('vue-svg-icon-loader')
      .loader('vue-svg-icon-loader')
      .end()
      .end()
      .oneOf('external')
      .use('file-loader')
      .loader('file-loader')
      .options({
        name: 'assets/[name].[hash:8].[ext]'
      })

    // if prod is on
    // assets require on cdn
    if (isProd) {
      config.plugin('html').tap(args => {
        args[0].cdn = assetsCDN
        return args
      })
    }
  },

  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          // less vars，customize ant design theme

          // 'theme': 'light',
          // 'navTheme': 'light',
          // 'nav-theme': 'light',
          // 'primary-color': '#FAAD14',
          // 'link-color': '#F5222D',

          // 'primary-color': '#F5222D',
          // 'link-color': '#F5222D',
          'border-radius-base': '2px'
        },
        // DO NOT REMOVE THIS LINE
        javascriptEnabled: true
      }
    }
  },

  devServer: {
    // development server port 8000
    port: 8099,
    // If you want to turn on the proxy, please remove the mockjs /src/main.jsL11
    proxy: {
      // '/email': {
      //   // target: 'http://172.23.0.137:8088/',
      //   target: 'http://127.0.0.1:8088/',
      //   // ws: true,
      //   changeOrigin: true
      // },
      '/emailRule': {
        // target: 'http://127.0.0.1:8090/',
        target: baseUrl,
        ws: true,
        changeOrigin: true
      },
      '/emailAccount': {
        // target: 'http://127.0.0.1:8090/',
        target: baseUrl,
        ws: true,
        changeOrigin: true
      },
      '/emailAccountBiz': {
        // target: 'http://127.0.0.1:8090/',
        target: baseUrl,
        ws: true,
        changeOrigin: true
      },
      '/valuationTime': {
        // target: 'http://127.0.0.1:8090/',
        target: baseUrl,
        ws: true,
        changeOrigin: true
      },
      '/repeatEmail': {
        // target: 'http://127.0.0.1:8090/',
        target: baseUrl,
        ws: true,
        changeOrigin: true
      }
      // '/emailRule': { // TODO 有接口后再调整
      //   // target: 'http://127.0.0.1:8088/', // http://localhost:8088/emailRule/queryDealerInfo
      //   target: 'http://172.23.0.137:8088/',
      //   changeOrigin: true
      // },
      // '/emailAccount': { // TODO 有接口后再调整
      //   // target: 'http://127.0.0.1:8088/', // http://localhost:8088/emailRule/queryDealerInfo
      //   target: 'http://172.23.0.137:8088/',
      //   changeOrigin: true
      // }
    }
  },

  // disable source map in production
  productionSourceMap: false,
  lintOnSave: undefined,
  // babel-loader no-ignore node_modules/*
  transpileDependencies: []
}

// preview.pro.loacg.com only do not use in your production;
if (process.env.VUE_APP_PREVIEW === 'true') {
  // add `ThemeColorReplacer` plugin to webpack plugins
  vueConfig.configureWebpack.plugins.push(createThemeColorReplacerPlugin())
}

const envObject = {
  ALLUSERSPROFILE: 'C:\\ProgramData',
  APPDATA: 'C:\\Users\\Lihaohui3\\AppData\\Roaming',
  BABEL_ENV: 'development',
  ChocolateyInstall: 'C:\\ProgramData\\chocolatey',
  ChocolateyLastPathUpdate: '132931161484194356',
  CHROME_CRASHPAD_PIPE_NAME: '\\\\.\\pipe\\crashpad_11144_ZGJILFYYGVYUMWQG',
  COLOR: '1',
  COLORTERM: 'truecolor',
  CommonProgramFiles: 'C:\\Program Files\\Common Files',
  'CommonProgramFiles(x86)': 'C:\\Program Files (x86)\\Common Files',
  CommonProgramW6432: 'C:\\Program Files\\Common Files',
  COMPUTERNAME: 'BJ-VDIITVV2-134',
  ComSpec: 'C:\\Windows\\system32\\cmd.exe',
  dp0: 'D:\\code\\_zhongjin\\ant-vue-zj11\\ant-vue-zj\\node_modules\\.bin\\',
  DriverData: 'C:\\Windows\\System32\\Drivers\\DriverData',
  EDITOR: 'notepad.exe',
  GIT_ASKPASS: 'd:\\soft\\Microsoft VS Code\\resources\\app\\extensions\\git\\dist\\askpass.sh',
  HOME: 'C:\\Users\\Lihaohui3',
  HOMEDRIVE: 'C:',
  HOMEPATH: '\\Users\\Lihaohui3',
  INIT_CWD: 'D:\\code\\_zhongjin\\ant-vue-zj11\\ant-vue-zj',
  'IntelliJ IDEA': 'd:\\Program Files\\JetBrains\\IntelliJ IDEA 2020.1\\bin;',
  LANG: 'zh_CN.UTF-8',
  LOCALAPPDATA: 'C:\\Users\\Lihaohui3\\AppData\\Local',
  LOGONSERVER: '\\\\BJZJDC02',
  NODE: 'D:\\Program Files\\nodejs\\node.exe',
  NODE_ENV: 'development',
  NODE_EXE: 'D:\\Program Files\\nodejs\\\\node.exe',
  NPM_CLI_JS: 'D:\\Program Files\\nodejs\\\\node_modules\\npm\\bin\\npm-cli.js',
  npm_command: 'run-script',
  npm_config_cache: 'C:\\Users\\Lihaohui3\\AppData\\Local\\npm-cache',
  npm_config_globalconfig: 'C:\\Users\\Lihaohui3\\AppData\\Roaming\\npm\\etc\\npmrc',
  npm_config_global_prefix: 'C:\\Users\\Lihaohui3\\AppData\\Roaming\\npm',
  npm_config_init_module: 'C:\\Users\\Lihaohui3\\.npm-init.js',
  npm_config_local_prefix: 'D:\\code\\_zhongjin\\ant-vue-zj11\\ant-vue-zj',
  npm_config_metrics_registry: 'https://registry.npm.taobao.org/',
  npm_config_node_gyp: 'D:\\Program Files\\nodejs\\node_modules\\npm\\node_modules\\node-gyp\\bin\\node-gyp.js',
  npm_config_noproxy: '',
  npm_config_prefix: 'C:\\Users\\Lihaohui3\\AppData\\Roaming\\npm',
  npm_config_registry: 'https://registry.npm.taobao.org/',
  npm_config_userconfig: 'C:\\Users\\Lihaohui3\\.npmrc',
  npm_config_user_agent: 'npm/8.5.0 node/v16.14.2 win32 x64 workspaces/false',
  npm_execpath: 'D:\\Program Files\\nodejs\\node_modules\\npm\\bin\\npm-cli.js',
  npm_lifecycle_event: 'serve',
  npm_lifecycle_script: 'vue-cli-service serve',
  npm_node_execpath: 'D:\\Program Files\\nodejs\\node.exe',
  npm_package_json: 'D:\\code\\_zhongjin\\ant-vue-zj11\\ant-vue-zj\\package.json',
  npm_package_name: 'vue-antd-pro',
  npm_package_version: '3.0.2',
  NPM_PREFIX_NPM_CLI_JS: 'C:\\Users\\Lihaohui3\\AppData\\Roaming\\npm\\node_modules\\npm\\bin\\npm-cli.js',
  NUMBER_OF_PROCESSORS: '4',
  ORIGINAL_XDG_CURRENT_DESKTOP: 'undefined',
  OS: 'Windows_NT',
  Path: 'D:\\code\\_zhongjin\\ant-vue-zj11\\ant-vue-zj\\node_modules\\.bin;D:\\code\\_zhongjin\\ant-vue-zj11\\node_modules\\.bin;D:\\code\\_zhongjin\\node_modules\\.bin;D:\\code\\node_modules\\.bin;D:\\node_modules\\.bin;D:\\Program Files\\nodejs\\node_modules\\npm\\node_modules\\@npmcli\\run-script\\lib\\node-gyp-bin;C:\\Program Files (x86)\\Common Files\\Oracle\\Java\\javapath;C:\\Windows\\system32;C:\\Windows;C:\\Windows\\System32\\Wbem;C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\;C:\\Windows\\System32\\OpenSSH\\;C:\\Program Files (x86)\\Enterprise Vault\\EVClient\\x64\\;D:\\Program Files\\nodejs\\;C:\\ProgramData\\chocolatey\\bin;d:\\Program Files\\Git\\cmd;D:\\Program Files\\TortoiseSVN\\bin;C:\\Users\\Lihaohui3\\AppData\\Local\\Microsoft\\WindowsApps;D:\\soft\\Microsoft VS Code\\bin;C:\\Users\\Lihaohui3\\AppData\\Roaming\\npm;C:\\Users\\Lihaohui3\\AppData\\Local\\GitHubDesktop\\bin;d:\\Program Files\\JetBrains\\IntelliJ IDEA 2020.1\\bin;',
  PATHEXT: '.COM;.EXE;.BAT;.CMD;.VBS;.VBE;.JSE;.WSF;.WSH;.MSC;.CPL',
  PROCESSOR_ARCHITECTURE: 'AMD64',
  PROCESSOR_IDENTIFIER: 'Intel64 Family 6 Model 63 Stepping 0, GenuineIntel',
  PROCESSOR_LEVEL: '6',
  PROCESSOR_REVISION: '3f00',
  ProgramData: 'C:\\ProgramData',
  ProgramFiles: 'C:\\Program Files',
  'ProgramFiles(x86)': 'C:\\Program Files (x86)',
  ProgramW6432: 'C:\\Program Files',
  PROMPT: '$P$G',
  PSModulePath: 'C:\\Users\\Lihaohui3\\Documents\\WindowsPowerShell\\Modules;C:\\Program Files\\WindowsPowerShell\\Modules;C:\\Windows\\system32\\WindowsPowerShell\\v1.0\\Modules',
  PUBLIC: 'C:\\Users\\Public',
  SESSIONNAME: 'Console',
  SystemDrive: 'C:',
  SystemRoot: 'C:\\Windows',
  TEMP: 'C:\\Users\\LIHAOH~1\\AppData\\Local\\Temp',
  TERM_PROGRAM: 'vscode',
  TERM_PROGRAM_VERSION: '1.66.0',
  TMP: 'C:\\Users\\LIHAOH~1\\AppData\\Local\\Temp',
  USERDNSDOMAIN: 'CICC.GROUP',
  USERDOMAIN: 'CICC',
  USERDOMAIN_ROAMINGPROFILE: 'CICC',
  USERNAME: 'Lihaohui3',
  USERPROFILE: 'C:\\Users\\Lihaohui3',
  ViewClient_Broker_DNS_Name: 'VDI-CS02.CICC.GROUP',
  ViewClient_Broker_DomainName: 'CICC',
  ViewClient_Broker_Farm_ID: 'vdi-itvv02',
  ViewClient_Broker_GatewayHost: 'vdi.cicc.com.cn',
  ViewClient_Broker_GatewayLocation: 'External',
  ViewClient_Broker_GatewayType: 'AP',
  ViewClient_Broker_Gateway_IP_Address: '10.108.65.61',
  ViewClient_Broker_Remote_IP_Address: '10.108.65.160',
  ViewClient_Broker_Tunneled: 'false',
  ViewClient_Broker_URL: 'https://10.108.61.3:443',
  ViewClient_Broker_UserName: 'Lihaohui3',
  ViewClient_Client_ID: 'AgAAAExr3Qd6K7IRqFy5SfNkfF8=',
  ViewClient_Client_Version: '5.4.4-16879994',
  ViewClient_Device_UUID: '54-05-DB-EA-2A-D5',
  'ViewClient_Displays.Number': '1',
  'ViewClient_Displays.SystemDpi': '96',
  'ViewClient_Displays.Topology': '{1920,1080,0,0,32,1}',
  'ViewClient_Displays.TopologyV2': '{1920,1080,0,0,32,1,96}',
  ViewClient_IP_Address: '172.23.0.177',
  'ViewClient_Keyboard.KeyDelayToRepeat': '1',
  'ViewClient_Keyboard.KeyRepeatRate': '31',
  'ViewClient_Keyboard.Language': '2052',
  'ViewClient_Keyboard.Layout': '00000804',
  'ViewClient_Keyboard.NumFuncKeys': '12',
  'ViewClient_Keyboard.NumIndicators': '3',
  'ViewClient_Keyboard.NumKeys': '101',
  'ViewClient_Keyboard.ScanCodeMode': '1',
  'ViewClient_Keyboard.SubType': '0',
  'ViewClient_Keyboard.Type': '4',
  ViewClient_Language: 'zh-CN',
  ViewClient_Launch_ID: 'VDI-ITvv02',
  ViewClient_Launch_SessionType: 'DESKTOP',
  ViewClient_LoggedOn_Domainname: 'WORKGROUP',
  ViewClient_LoggedOn_Username: 'admin',
  ViewClient_Machine_Domain: 'WORKGROUP',
  ViewClient_Machine_Name: 'DESKTOP-GGC8G5D',
  ViewClient_MAC_Address: '54-05-DB-EA-2A-D5',
  'ViewClient_Mouse.Identifier': '2',
  'ViewClient_Mouse.NumButtons': '2',
  'ViewClient_Mouse.SampleRate': '100',
  ViewClient_Protocol: 'BLAST',
  ViewClient_Type: 'Windows',
  ViewClient_TZID: 'KAST',
  ViewClient_Windows_Timezone: 'China Standard Time',
  VSCODE_GIT_ASKPASS_EXTRA_ARGS: '--ms-enable-electron-run-as-node',
  VSCODE_GIT_ASKPASS_MAIN: 'd:\\soft\\Microsoft VS Code\\resources\\app\\extensions\\git\\dist\\askpass-main.js',
  VSCODE_GIT_ASKPASS_NODE: 'D:\\soft\\Microsoft VS Code\\Code.exe',
  VSCODE_GIT_IPC_HANDLE: '\\\\.\\pipe\\vscode-git-6dbd41aa56-sock',
  VUE_APP_API_BASE_URL: '/api',
  VUE_APP_PREVIEW: 'true',
  windir: 'C:\\Windows',
  _prog: 'node'
}

module.exports = vueConfig
