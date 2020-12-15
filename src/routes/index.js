import React from 'react';
import {createStackNavigator} from '@react-navigation/stack'
import {EditData, Home, ListData} from '../pages/Pages'

const Stackk = createStackNavigator();

const Routes = () => {
    return (
       <Stackk.Navigator>
           <Stackk.Screen name="Home" component={Home}></Stackk.Screen>
           <Stackk.Screen name="List Data" component={ListData}></Stackk.Screen>
           <Stackk.Screen name="Edit Data" component={EditData}></Stackk.Screen>

       </Stackk.Navigator>
    );
}

export default Routes;