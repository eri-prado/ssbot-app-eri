module.exports = {
  expo: {
    name: 'SSBot',
    slug: 'ss-bot-teste',
    version: '1.0.1',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'light',
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#189AB4',
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.sistemabiodata.ssbotappteste',
    },
    web: {
      favicon: './assets/favicon.png',
    },
    extra: {
      eas: {
        projectId: '05ef71fa-7330-45e4-929d-070dd9086951',
      },
    },
    android: {
      versionCode: '2',
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
      googleServicesFile: process.env.GOOGLE_SERVICES_JSON || './google-services.json',
      package: 'com.sistemabiodata.ssbotappteste',
    },
  },
};
