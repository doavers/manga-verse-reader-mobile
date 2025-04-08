
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.daf42e3144e24aa29086d58b0724aad1',
  appName: 'manga-verse-reader-mobile',
  webDir: 'dist',
  server: {
    url: 'https://daf42e31-44e2-4aa2-9086-d58b0724aad1.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      launchAutoHide: true,
      backgroundColor: "#1A1F2C",
      androidSplashResourceName: "splash",
      androidScaleType: "CENTER_CROP",
      showSpinner: true,
      androidSpinnerStyle: "large",
      iosSpinnerStyle: "large",
      spinnerColor: "#8B5CF6",
      splashFullScreen: true,
      splashImmersive: true
    }
  }
};

export default config;
