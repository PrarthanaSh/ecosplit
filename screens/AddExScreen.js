import { Button } from '@rneui/themed';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { getAuthUser, signOut } from '../AuthManager';

function AddExScreen({navigation}) {

  return (
    <View style={styles.container}>
      <Text>
        Coming soon, Add Expense Screen!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'ivory'
  }
});

export default AddExScreen;