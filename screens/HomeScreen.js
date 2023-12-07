import { Button } from '@rneui/themed';
import { View, Text, StyleSheet, Alert, Image } from 'react-native';
import { getAuthUser, signOut } from '../AuthManager';
import { firebaseConfig } from '../Secrets';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { doc, getDoc, getFirestore, collection, query, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { loadUsers } from '../data/Actions';
import { useDispatch, useSelector } from 'react-redux';

function HomeScreen({navigation}) {

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const dispatch = useDispatch()
  const userId = getAuthUser().uid;
  // const [userExpenses, setUserExpenses] = useState('');
  // const [carbonEmission, setCarbonEmission] = useState('');

  // async function loadOneExpense () {

  //   const collRef = collection(db, 'users');
  //   const docRef = doc(collRef, userId);

  //   const docSnapshot = await getDoc(docRef);

  //   if (docSnapshot.exists()) {
  //     const userData = docSnapshot.data();
  //     const userExpense = userData.expense;
  //     const carbonEmission = userData.carbonCost;

  //     setUserExpenses(userExpense); 
  //     setCarbonEmission(carbonEmission);
  //   } else {
  //     // Handle the case where the document doesn't exist
  //     setUserExpenses('Nothing');
  //     setCarbonEmission('Nothing');
  //   }
  // }

  useEffect(() => {
    // loadOneExpense();
    dispatch(loadUsers())
    console.log("user: ", currentUser, userId)
  }, []);

  const allUsers = useSelector((state) => state.listUsers);
  console.log(allUsers)
  const currentUser = allUsers.find(user => user.key === userId)


  return (
    <View style={styles.container}>
      {/* Expenses Subject */}
      <Text style={styles.expenseSubject}>Expenses</Text>

      {/* Carbon Emission */}
      <Text style={styles.carbonEmission}>Total carbon emissions are {} g</Text>

      {/* Expense Amount */}
      <Text style={styles.expenseAmount}>Total expenses are $ {}</Text>

      {/* Image */}
      <Image
        source={require('../assets/green.jpeg')}
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
  carbonEmission: {
    fontSize: 24,
    marginBottom: 15,
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