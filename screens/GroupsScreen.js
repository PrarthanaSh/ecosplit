import { Button } from '@rneui/themed';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { getAuthUser, signOut } from '../AuthManager';


function GroupsScreen({navigation}) {

  return (
    <View style={styles.container}>
      <Text>
        Coming soon, Groups Screen!
        New branch
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue'
  }
});

export default GroupsScreen;