import { Button } from '@rneui/themed';
import { View, Text, StyleSheet, Alert, Image } from 'react-native';
import { getAuthUser, signOut } from '../AuthManager';
import { firebaseConfig } from '../Secrets';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getDoc, getFirestore, collection, query, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';

function HomeScreen({navigation}) {

  // const userExpenseAmount = getAuthUser().displayName
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  const [userExpenses, setUserExpenses] = useState('');
  // const userId = getAuthUser().id;
  const userId = 'yZ36FCjM5zEBTK1IbSEV';
  
  async function loadOneExpense () {
    // const collRef = collection(db, 'users', userId);
    // const q = query(collRef);
    // const querySnapshot = await getDocs(q);

    // // let expensesData = [];
    // let expensesData = querySnapshot.doc

    // // querySnapshot.forEach((doc) => {
    // //   expensesData.push(doc.data());
    // // });

    // setUserExpenses(expensesData);
    const collRef = collection(db, 'users');
    const docRef = doc(collRef, userId);

    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
      const userData = docSnapshot.data();
      const userExpense = userData.expense;
      
      console.log('User Expense:', userExpense);

      setUserExpenses(userExpense); // not showing up
    } else {
      // Handle the case where the document doesn't exist
      setUserExpenses('nothing');
    }
  }

  useEffect(() => {
    loadOneExpense();
  }, []);

  return (
    <View style={styles.container}>
      {/* Expenses Subject */}
      <Text style={styles.expenseSubject}>Expenses</Text>

      {/* Expense Amount */}
      <Text style={styles.expenseAmount}>$ {userExpenses}</Text>

      {/* Image */}
      <Image
        source={require('../assets/green.jpeg')} // Replace with the path to your image
        // source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}}
        style={styles.image}
        resizeMode="cover"
      />

      {/* User Sign Out */}
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
        buttonStyle={styles.signOut}
      >
        Sign out
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'ivory'
  },
  expenseSubject: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'grey',
    marginBottom: 5,
  },
  expenseAmount: {
    fontSize: 16,
    marginBottom: 15,
  },
  image: {
    width: '100%',
    height: 200, // Adjust the height as needed
    marginBottom: 20,
    // resizeMode: 'contain',
  },
  signOut: {
    backgroundColor: 'lightgray',
    borderRadius: 40,
    padding: "4%",
  },
});

export default HomeScreen;