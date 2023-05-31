import { Alert, Button, Text, View } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication'

import { styles } from './styles'
import { useEffect, useState } from 'react';

export default function App() {
  const [isAuthenticate, setIsAuthenticate] = useState(false);

  async function verifyAvailableAuthentication() {
    // metodo para ver se o dispositivo é compatível com a autenticação local
    const compatible = await LocalAuthentication.hasHardwareAsync();

    // metodo para ver os tipos de autenticação local disponíveis para uso
    const types = await LocalAuthentication.supportedAuthenticationTypesAsync();
  }

  async function handleAuthentication() {
    // metodo que verifica se existe algum tipo de autenticação cadastrado no dispositivo
    const isBiometricEnrolled = await LocalAuthentication.isEnrolledAsync();

    if (!isBiometricEnrolled) {
      return Alert.alert(
        'Login',
        'Nenhuma biometria encontrada. Por favor cadastre no dispositivo!'
      )
    }

    // metodo que chama a autenticação local para validar o usuário
    const auth = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Login com biometrica',
      fallbackLabel: 'Biometria não reconhecida',
    });

    setIsAuthenticate(auth.success);
  }

  useEffect(() => {
    verifyAvailableAuthentication();
  }, [])

  return (
    <View style={styles.container}>
      <Text>
        Usuário Conectado: {isAuthenticate ? 'Sim' : 'Não'}
      </Text>

      <Button
        title="Entrar"
        onPress={handleAuthentication}
      />
    </View>
  );
}
