import { Button } from '@rneui/themed';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { getAuthUser, signOut } from '../AuthManager';

function HomeScreen({navigation}) {

  return (
    <View style={styles.container}>
      <Text>
        You're signed in, { getAuthUser().displayName }!
      </Text>
      <Button
        onPress={async () => {
          try {
            await signOut();
            navigation.navigate('Login');
          } catch (error) {
            Alert.alert("Sign In Error", error.message,[{ text: "OK" }])
          }
        }}
      >
        Now sign out!
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'pink'
  }
});

export default HomeScreen;