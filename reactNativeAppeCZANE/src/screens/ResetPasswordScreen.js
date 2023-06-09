import React, { useState } from 'react'
import Background from '../components/Background'
import BackButton from '../components/BackButton'
import Logo from '../components/Logo'
import Header from '../components/Header'
import TextInput from '../components/TextInput'
import Button from '../components/Button'
import { emailValidator } from '../helpers/emailValidator'
import getRequest from '../../assets/component/getRequest'
import { Alert } from 'react-native'


export default function ResetPasswordScreen({ navigation }) {
  const [email, setEmail] = useState({ value: '', error: '' })

  const sendResetPasswordEmail = async () => {
    const emailError = emailValidator(email.value)
    if (emailError) {
      setEmail({ ...email, error: emailError })
      return
    }
    var baseurl = "http://eczanev2-dev.eu-central-1.elasticbeanstalk.com/api/getSendMailPass?email=";
    baseurl = baseurl + email.value; 
    var result = await getRequest(baseurl)
    if(result != null)
    {
      Alert.alert('Başarılı', 'Şifreniz Başarı İle Gönderildi.', [{ text: 'Tamam' }]);
      navigation.navigate('LoginScreen')
    }
    else
    {
      Alert.alert('Başarısız', 'Kullanıcı Bulunamadı !', [{ text: 'Tamam' }]);
    }
    
  }

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Parolayı Güncelle</Header>
      <TextInput
        label="E-mail adresi"
        returnKeyType="done"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
        description="Mail adresinize bir parola sıfırlama linki alacaksınız"
      />
      <Button
        mode="contained"
        onPress={sendResetPasswordEmail}
        style={{ marginTop: 16 }}
      >
        Parolayı Gönder
      </Button>
    </Background>
  )
}
