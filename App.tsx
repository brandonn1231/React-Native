import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';

const NotificationItems = [{
  id: "1",
  title: "Sample 1",
  subject: "Hello World",
  icon: "ios-mail"
}, {
  id: "2",
  title: "Sample 2",
  subject: "Goodbye World",
  icon: "ios-mail"
}]

const style = StyleSheet.create({
  item: {
    borderColor: "black",
    borderBottomWidth: 1,
    flex: 1,
    flexDirection: "row"
    // alignItems: "center",
    // justifyContent: "center"
  }
});

function ListItem(props) {
  return (
    <View style={style.item}>
      {props.icon && (
        <View style={{width: 100, borderColor: "blue", borderWidth: 1, alignItems: "center", justifyContent: "center"}}>
          <Ionicons name={props.icon} size={45} />
        </View>
      )}
      <View style={{padding: 10}}>
        {props.children}
      </View>
    </View>
  )
}

class NotificationScreen extends React.Component {
  render() {
    return(
      <SafeAreaView style={{ flex: 1 }}>
        <FlatList
          data={NotificationItems}
          renderItem={({ item }) => (
            <View style={{height: 100}}>
              <ListItem icon={item.icon}>
                <Text style={{fontWeight: "bold"}}>{item.title}</Text>
                <Text>{item.subject}</Text>
              </ListItem>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
    )
  }
}

function ProfileScreen() {
  return(
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ height: 150 }}>
        <ListItem>
          <Text style={{fontWeight: "bold"}}>"TITLE"</Text>
          <Text>Email: dubsado@dubsado.com</Text>
        </ListItem>
      </View>
      <FlatList
          data={NotificationItems}
          renderItem={({ item }) => (
            <View style={{height: 100}}>
              <ListItem icon={item.icon}>
                <Text style={{fontWeight: "bold"}}>{item.title}</Text>
                <Text>{item.subject}</Text>
              </ListItem>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
    </SafeAreaView>
  )
}

const NotificationStackNavigator = createStackNavigator({
  Notification: NotificationScreen
});

const AppTabNavigator = createBottomTabNavigator(
  {
    Notification: NotificationStackNavigator,
    Profile: ProfileScreen
  },
  {
    initialRouteName: "Profile",
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let icon: string;
        switch (routeName) {
          case "Notification":
            icon = `ios-notifications-outline`;
            break;
          case "Profile":
            icon = `md-person`;
            break;
        }

        return <Ionicons name={icon} size={25} />
      }
    }),
    tabBarOptions: {
      showIcon: true,
      showLabel: false
    }
  }
);

export default createAppContainer(AppTabNavigator);