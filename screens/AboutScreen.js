import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const AboutScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const navigation = useNavigation();
  
    const handleSubmit = async () => {
      if (!name || !email || !message) {
        Alert.alert('Please fill in all fields');
        return;
      }
  
      try {
        const response = await axios.post('http://localhost:3002/send-emailform', {
          to: email,
          subject: "Contact Me Email",
          text: message
        });
        Alert.alert('Email sent', response.data);
        setName('');
        setEmail('');
        setMessage('');
      } catch (error) {
        console.error('Error sending email:', error);
        Alert.alert('Error sending email', error.message);
      }
      try {
        const response = await axios.post('http://localhost:3002/save', {
          name,
          email,
          message
        });
        Alert.alert('Success', response.data.message);
        setName('');
        setEmail('');
        setMessage('');
      } catch (error) {
        console.error('Error saving data:', error);
        Alert.alert('Error', error.message);
      }
    };
  
    
  
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Contact Me</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Message"
          value={message}
          onChangeText={setMessage}
          multiline
        />
        <Button title="Submit" onPress={handleSubmit} />
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 16
    },
    heading: {
      fontSize: 24,
      marginBottom: 16,
      textAlign: 'center'
    },
    input: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 12,
      padding: 8
    }
  });

export default AboutScreen;
