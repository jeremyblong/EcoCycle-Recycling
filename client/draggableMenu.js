import { useNavigation } from '@react-navigation/native';
import React, { Fragment, useState } from 'react';
import { View, Text, Dimensions, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Draggable from 'react-native-draggable';
import Popover from 'react-native-popover-view';

const { width, height } = Dimensions.get("window");

const DraggableMenuIcon = ({ Content }) => {
  const navigate = useNavigation();
  const [isPopoverVisible, setIsPopoverVisible] = useState(false);
  const [buttonPosition, setButtonPosition] = useState({ x: 50, y: 50 });

  const togglePopover = (item) => {
    setIsPopoverVisible(!isPopoverVisible);
    
    setTimeout(() => {
      if (item.link !== null) {
        navigate.navigate(item.link)
      }  
    }, 1000);
  };

  const togglePopoverOpen = () => {
    setIsPopoverVisible(!isPopoverVisible);
  };

  const handleDragRelease = (event, gestureState, bounds) => {
    setButtonPosition({ x: bounds.left, y: bounds.top });
  };

  const menuItems = ['A', 'B', 'C', "D", "E", "F", "G", "H"];
  const radius = 75;
  const itemsOptionsArr = [{
    title: "Cancel/Close.",
    icon: require("./assets/images/closing_prev_ui.png"),
    abbrev: "C",
    link: null,
    margin: 0
  }, {
    title: "Price my E-Waste!",
    icon: require('./assets/images/cash_prev_ui.png'),
    abbrev: "P",
    link: "PriceEWasteLocateDropoff",
    margin: 15
  }, {
    title: "Register as a recycling center",
    icon: require('./assets/images/cycle_prev_ui.png'),
    abbrev: "R",
    link: "RegisterAsRecyclingFacility",
    margin: 95
  }, {
    title: "Post new drop-off location",
    icon: require('./assets/images/screeen1_prev_ui.png'),
    abbrev: "P",
    link: "ListNewStorageSpaceForRentDropoff",
    margin: 80
  }, {
    title: "Boost Your Profile (Drop-Off)",
    icon: require('./assets/images/screen2_prev_ui.png'),
    abbrev: "P",
    link: "BoostProfileDropoffAccount",
    margin: 100
  }, {
    title: "Ship Out A Full Pallet!",
    icon: require('./assets/images/screen3_prev_ui.png'),
    abbrev: "P",
    link: "PostNewAvailableDeliveryContractForm",
    margin: 60
  }, {
    title: "Main Payment Overview",
    icon: require('./assets/images/screen4_prev_ui.png'),
    abbrev: "P",
    link: "ManagePaymentMethodsOverview",
    margin: 80
  }, {
    title: "View Notification(s)",
    icon: require('./assets/images/123_prev_ui.png'),
    abbrev: "P",
    link: "ViewNotificationScreen",
    margin: 55
  }]
  return (
    <Fragment>
      <View style={{ flex: 1 }}>
        {Content}
      </View>
      <Draggable
        renderSize={50}
        imageSource={require('./assets/images/menuiconillustration_prev_ui.png')} 
        renderColor='white'
        isCircle
        x={width - 82.5}
        y={75}
        minX={0}
        minY={0}
        maxX={width}
        maxY={height}
        onLongPress={() => console.log('long press')}
        onPressIn={() => console.log('in press')}
        onDragRelease={handleDragRelease}
        onShortPressRelease={() => togglePopoverOpen()}
        style={{ position: 'absolute', zIndex: 9999 }}
        onPressOut={() => console.log('out press')}
      />
      <Popover
        isVisible={isPopoverVisible}
        from={{
          x: buttonPosition.x + 25,
          y: buttonPosition.y + 25,
          width: 50,
          height: 50,
        }}
        popoverStyle={styles.popover}
      >
        <View style={styles.popoverContainer}>
          {itemsOptionsArr.map((item, index) => {
            const angle = (index / menuItems.length) * Math.PI; // Half-circle arrangement
            const x = radius * Math.cos(angle);
            const y = radius * Math.sin(angle);

            if (index === 0) {
              return (
                <Fragment>
                  <View style={[styles.row, { marginTop: 25 }]}>
                    <Image
                      source={item.icon}
                      key={item.title}
                      style={[styles.menuItem, { marginLeft: -20 }]}
                    />
                    <TouchableOpacity onPress={() => togglePopover(item)}>
                      <Text style={styles.cancelText}>Cancel/Abort</Text>
                    </TouchableOpacity>
                  </View>
              </Fragment>
              );
            } else {
              return (
                <Fragment>
                  <View style={styles.row}>
                    <Image
                      source={item.icon}
                      key={item.title}
                      style={[styles.menuItem, { marginLeft: item.margin }]}
                    />
                    <TouchableOpacity onPress={() => togglePopover(item)}>
                      <Text style={styles.cancelText}>{item.title}</Text>
                    </TouchableOpacity>
                  </View>
                </Fragment>
              );
            }
          })}
        </View>
      </Popover>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  cancelText: {
    color: '#fff',
    fontWeight: 'bold',
    marginTop: -20,
    marginLeft: 10
  },
  container: {
    flex: 1,
    position: 'relative',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  popoverContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  draggable: {
    position: 'absolute',
    zIndex: 9999,
  },
  popover: {
    backgroundColor: 'rgba(0, 0, 0, 0.575)',
    width,
    height
  },
  popoverContainer: {
    position: 'relative',
    width: width,
    marginLeft: -90,
    justifyContent: "flex-start",
    height: height,
    // left: 10, 
    // top: 10,
    alignItems: 'center',
    // justifyContent: 'center',
  },
  menuItem: {
    // position: 'absolute',
    width: 50,
    height: 50,
    left: 0,
    top: 10,
    marginBottom: 32.25,
    borderRadius: 25,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default DraggableMenuIcon;
