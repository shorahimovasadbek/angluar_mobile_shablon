import type { CapacitorConfig } from '@capacitor/cli';
import { KeyboardResize } from '@capacitor/keyboard';

const config: CapacitorConfig = {
  appId: 'uz.example.app',
  appName: 'Template App',
  webDir: 'www',
  plugins: {
    StatusBar: { style: 'DARK' },
    Keyboard: {
      resize: KeyboardResize.Ionic,
      resizeOnFullScreen: true,
    },
    SplashScreen: { launchAutoHide: false },
  },
};

export default config;
