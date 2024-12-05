import 'react-native-gesture-handler';
import RouteStack from './src/routes';
import { PaperProvider } from 'react-native-paper';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { themePaper } from './src/styles/theme';
import { GlobalContext, GlobalContextProvider } from './src/contexts/globalContext';
import { useEffect, useState, useContext } from 'react';
import { getItemStorage } from './src/helpers/getItemStorage';
import { hideAsync, preventAutoHideAsync } from 'expo-splash-screen';
import Splash from './src/screens/noAuth/Splash';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';

preventAutoHideAsync();

function AppContent() {
  const { setIsAuthenticated } = useContext(GlobalContext);
  const [splashCompleted, setSplashCompleted] = useState(true);

  useEffect(() => {
    (async function getDataStorage() {
      const data = await getItemStorage('accessData');
      if (data) {
        setIsAuthenticated(true);
      }
    })();

    hideAsync();

    setTimeout(() => {
      setSplashCompleted(false);
    }, 2000);
  }, []);

  return (
    <>
      {splashCompleted ? (
        <Splash />
      ) : (
        <GestureHandlerRootView>
          <BottomSheetModalProvider>
            <PaperProvider theme={themePaper}>
              <RouteStack />
            </PaperProvider>
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
      )}
    </>
  );
}

export default function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <GlobalContextProvider>
          <AppContent />
        </GlobalContextProvider>
      </QueryClientProvider>
      <Toast />
    </>
  );
}
