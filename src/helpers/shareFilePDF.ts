import { Platform } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as IntentLauncher from 'expo-intent-launcher';
import * as Sharing from 'expo-sharing';
import Toast from 'react-native-toast-message';

async function openPdf(fileUri: string) {
  if (Platform.OS === 'android') {
    const contentUri = await FileSystem.getContentUriAsync(fileUri);
    IntentLauncher.startActivityAsync('android.intent.action.VIEW', {
      data: contentUri,
      flags: 1,
      type: 'application/pdf',
    });
  } else {
    await Sharing.shareAsync(fileUri);
  }
}

function decodeBase64Url(encodedUrl: string) {
  return decodeURIComponent(encodedUrl);
}

async function saveBase64AsFile(base64String: string, fileName: string) {
  const decodedBase64 = decodeBase64Url(base64String);
  const fileUri = `${FileSystem.cacheDirectory}${fileName}`;
  await FileSystem.writeAsStringAsync(fileUri, decodedBase64, {
    encoding: FileSystem.EncodingType.Base64,
  });
  return fileUri;
}

export async function shareFilePDF(base64String: string, fileName: string) {
  try {
    const fileUri = await saveBase64AsFile(
      decodeBase64Url(base64String),
      fileName
    );
    await openPdf(fileUri);
  } catch (error) {
    Toast.show({
      type: 'error',
      text1: 'Erro ao abrir o arquivo:' + String(error),
      position: 'bottom',
    });
  }
}
