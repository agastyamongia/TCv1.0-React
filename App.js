import React, {Component} from 'react';
import { View, Text, Button, TextInput, Image, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//import { Input } from 'react-native-elements';

interface Props {}
interface State {
  email: string;
  password: string;
}

//const userInfo = {username: 'admin', password: 'pass12345' }


class LoginScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      emailAddress: '',
      passWord: ''
    }
  }

onPressButton() {
  this.onFetchLogin();
}

  render() {

//function LoginScreen ({ navigation }) {
  return (
    <View style={ styles.view }>
      <Image
        style={{ width: 70, height: 70 }}
        source={require('./assets/Images/logo.png')}
      />
      <Text style={{ fontSize: 40, textDecorationLine: 'underline', margin: 10 }}>TeamCalendar.ai</Text>
      <Text style={{ fontSize: 30, marginBottom: 30 }}>Login</Text>
      <TextInput
        style={{ height: 50, width: 200, backgroundColor: 'white' }}
        placeholder= "Email"
        onChangeText={(emailAddress)=>this.setState({emailAddress})}
        value={this.state.emailAddress}
      />
      <TextInput
        secureTextEntry={true}
        style={{ height: 50, width: 200, backgroundColor: 'white' }}
        placeholder= "Password"
        onChangeText={(passWord)=>this.setState({passWord})}
        value={this.state.passWord}
      />
      <Button
        title='Login'
        onPress={this.onPressButton.bind(this)}
      //  onPress={() => navigation.navigate('Header')}
      />
      <Button
        title='Register'
        onPress={() => this.props.navigation.navigate('Header')} />
    </View>
  );
}

async onFetchLogin() {
  var data={
    email: this.state.emailAddress,
    password: this.state.passWord
  };
  try {
    console.log(data);
    let response =
    await fetch(
      "https://calndr.ai/api/login",
      {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      }
    )
    let json = await response.json();
    //return json.email
    console.log(json.email);
    /*.then((response) => response.json())
      .then((json) => {
        //return json.email;
        console.log(json()) */

   //let json = await response.json();
    //console.log(json.email);
    if (response.status >= 200 && response.status < 300) {
      alert("authenticated successfully");
      //this.props.navigation.navigate('Header')
    }
  } catch (errors) {
    alert(errors);
  }
}

}


function TestScreen ({route, navigation }) {
  React.useEffect(() => {
    if (route.params?.post) {
    }
  }, [route.params?.post]);
  return (
    <View style={styles.view}>
      <Text style={{ fontSize: 40 }}> Test </Text>
      <Text style={{ margin: 10 }}>Your Post: {route.params?.post}</Text>
      <Button title='Create Post' onPress={() => navigation.navigate('Create Post', {name: 'Create your post!'})}/>
    </View>
  );
}


function CreatePostScreen({ route, navigation }) {
  const [postText, setPostText] = React.useState('');
  return (
    <>
      <View style={styles.view}>
        <Text style={{ fontSize: 30 }}>Create Post</Text>
        <TextInput
          multiline
          placeholder="What's on your mind?"
          style={{ height: 300, padding: 100, backgroundColor: 'white' }}
          value={postText}
          onChangeText={setPostText}
        />
        <Button
          title="Done"
          onPress={() => {
            navigation.navigate("Test", { post: postText});
          }}
        />
      </View>
    </>
  );
}


function InsightsScreen ({route, navigation }) {
  return (
    <View style={styles.view}>
      <Text style={{ fontSize: 40, fontFamily:'AvenirLTStd-Book' }}> Insights </Text>
    </View>
  );
}


function LogoTitle() {
  return (
    <Image
      style={{ width: 50, height: 50, margin: 10 }}
      source={require('./assets/Images/logo.png')}
    />
  );
}


const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
});


/*const LoginStack = createStackNavigator();

function LoginStackNavigator() {
  return (
    <LoginStack.Navigator>
      <LoginStack.Screen name="Login" component={LoginScreen} />
    </LoginStack.Navigator>
  );
}*/


const Tab = createBottomTabNavigator();

function HeaderTabs() {
  return (
      <Tab.Navigator
      //  initialRouteName= "Test"
        tabBarOptions={{
          activeTintColor: 'blue',
          inactiveTintColor: 'black',
        }}>
        <Tab.Screen name="Test" component={TestScreen} options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Image
              style={{ width: 25, height: 25}}
              source={require('./assets/Images/home.png')} />
          )
        }} />
        <Tab.Screen name="Create Post" component={CreatePostScreen} options={{
          tabBarLabel: 'Calendar',
          tabBarIcon: ({ color, size }) => (
            <Image
              style={{ width: 30, height: 30}}
              source={require('./assets/Images/meetingCrop.png')} />
          )
        }} />
        <Tab.Screen name="Insights" component={InsightsScreen} options={{
          tabBarLabel: 'Insights',
          tabBarIcon: ({ color, size }) => (
            <Image
              style={{ width: 25, height: 25}}
              source={require('./assets/Images/statsCrop.png')} />
          )
        }} />
      </Tab.Navigator>
  );
}


const Stack = createStackNavigator();

export default function StackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        //mode="modal"
        screenOptions={{
          headerStyle: {
            backgroundColor: 'lightblue',
          },
          headerTintColor: 'grey',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="Header"
          component={HeaderTabs}
          options={{
            title: "TeamCalendar.ai",
            headerTitleAlign: 'center',
            /*headerLeft: () => (
              <Button
                title= "Back"
                onPress={() => navigation.navigate('Login')}
                color= "grey"
              />
            ),*/
            headerLeft: props => <LogoTitle {...props} />,
            headerRight: () => (
              <Button
                onPress={() => alert('TeamCalendar.ai Android Application (Still in development)')}
                title= "Info"
                color= "grey"
              />
            ),
          }}
        />
        <Stack.Screen
          name="CreatePost"
          component={CreatePostScreen}
          options={({ route }) => ({title: route.params.name})}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
