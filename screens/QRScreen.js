import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { captureRef } from 'react-native-view-shot';
import axios from 'axios';

const WESTPAC_URL = 'https://www.westpac.com.au/';

export default function QRScreen() {
  const [inputValue, setInputValue] = useState('');
  const [email, setEmail] = useState('');
  const [userText, setUserText] = useState('');
  const [qrValue, setQRValue] = useState(WESTPAC_URL);
  const [isActive, setIsActive] = useState(false);
  const qrCodeRef = useRef(null);

  const isValidURL = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const isValidEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const sendEmail = async (imageURL) => {
    if (!isValidEmail(email)) {
      Alert.alert('Invalid email address', 'Please enter a valid email address.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/send-email', {
        to: email,
        subject: 'Your Generated QR Code',
        text: `Here is your QR Code for: ${qrValue}\n\nThe QR code contains: ${userText}`,
        qrCodeBase64: imageURL,
      });

      Alert.alert('Email sent', response.data);
    } catch (error) {
      Alert.alert('Error sending email', error.message);
    }
  };

  const captureQRCode = async () => {
    if (qrCodeRef.current) {
      try {
        const uri = await captureRef(qrCodeRef.current, {
          format: 'png',
          quality: 1.0,
        });
        const base64Image = uri.split(',')[1];
        await sendEmail(base64Image);
      } catch (error) {
        Alert.alert('Failed to capture QR code');
      }
    } else {
      Alert.alert('QR Code element is not available');
    }
  };

  const generateQRCode = () => {
    const url = isValidURL(inputValue.trim()) ? inputValue.trim() : WESTPAC_URL;
    setQRValue(url);
    setUserText(inputValue.trim());
    setIsActive(true);
  };

  useEffect(() => {
    if (isActive) {
      const timer = setTimeout(() => {
        captureQRCode();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isActive]);

  const handleInputChange = (text) => {
    setInputValue(text);
    setIsActive(false);
  };

  const handleEmailChange = (text) => {
    setEmail(text);
  };

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.title}>QR Code Generator</Text>
        <Text style={styles.description}>
          Enter a URL or text to generate a QR code. Invalid URLs will default to Westpac's URL.
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Enter text or URL"
          value={inputValue}
          onChangeText={handleInputChange}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter your email address"
          value={email}
          onChangeText={handleEmailChange}
        />
        <TouchableOpacity style={styles.button} onPress={generateQRCode}>
          <Text style={styles.buttonText}>Generate QR Code</Text>
        </TouchableOpacity>
        {isActive && (
          <View style={styles.qrCode} ref={qrCodeRef}>
            <QRCode
              value={qrValue}
              size={200}
              color="black"
              backgroundColor="white"
            />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
  },
  wrapper: {
    maxWidth: 300,
    backgroundColor: '#fff',
    borderRadius: 7,
    padding: 20,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 30,
  },
  title: {
    fontSize: 21,
    fontWeight: '500',
    marginBottom: 10,
  },
  description: {
    color: '#575757',
    fontSize: 16,
    marginBottom: 20,
  },
  input: {
    fontSize: 18,
    padding: 17,
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 5,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#3498DB',
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  qrCode: {
    marginTop: 20,
    alignItems: 'center',
  },
});
