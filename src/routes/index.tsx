import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Icon} from '@sendbird/uikit-react-native-foundation';

import LoginScreen from '../screens/LoginScreen';
import ChatScreen from '../screens/ChatScreen';
import CreateChannelScreen from '../screens/CreateChannelScreen';

const TabMenu = createBottomTabNavigator();
const ModalStack = createNativeStackNavigator();

const CreateChannelMenu = () => (
  <ModalStack.Navigator>
    <ModalStack.Screen name="CreateChannel" component={CreateChannelScreen} />
  </ModalStack.Navigator>
);

const BottomTabs = () => {
  return (
    <TabMenu.Navigator>
      <TabMenu.Group>
        <TabMenu.Screen
          name="Login"
          component={LoginScreen}
          options={{
            tabBarIcon: ({color}) => <Icon icon={'user'} color={color} />,
          }}
        />
        <TabMenu.Screen
          name="Home"
          component={ChatScreen}
          options={{
            tabBarIcon: ({color}) => (
              <Icon icon={'chat-filled'} color={color} />
            ),
          }}
        />
      </TabMenu.Group>
    </TabMenu.Navigator>
  );
};

const RootStack = createNativeStackNavigator();

export const Navigation = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{headerShown: false}}>
        <RootStack.Screen name={'BottomTabs'} component={BottomTabs} />
        <RootStack.Screen
          name={'CreateChannel'}
          component={CreateChannelMenu}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
