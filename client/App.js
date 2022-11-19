import React from "react";
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import LoadingScreen from "./component/loadingScreen";
import RenderPages from "./renderPages.js";

const switchNavigator = createSwitchNavigator({
  Loading: LoadingScreen,
  mainFlow: RenderPages
},
  {
    initialRouteName: 'mainFlow',
});
// test/check reinit git...
const App = createAppContainer(switchNavigator);

export default () => {
  return (
    <App />
  );
};