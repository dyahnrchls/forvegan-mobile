import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  FlatList,
  StyleSheet,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const Accordion = (props: any) => {
  const [expanded, setExpanded] = useState(false);
  const [data, setData] = useState(props.data);

  if (Platform.OS === "android") {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  const onClick = (index: number) => {
    const temp = [...data];
    temp[index].value = !temp[index].value;
    setData(temp);
  };

  return (
    <View>
      <TouchableOpacity style={styles.row} onPress={toggleExpand}>
        <Text style={[styles.title]}>{props.title}</Text>
        <Icon
          name={expanded ? "keyboard-arrow-up" : "keyboard-arrow-down"}
          size={30}
          //   color={Colors.DARKGRAY}
        />
      </TouchableOpacity>
      <View style={styles.parentHr} />
      {expanded && (
        <View style={{}}>
          <FlatList
            data={data}
            numColumns={1}
            scrollEnabled={false}
            renderItem={({ item, index }) => (
              <View>
                <TouchableOpacity
                  style={[
                    styles.childRow,
                    styles.button,
                    item.value ? styles.btnActive : styles.btnInActive,
                  ]}
                  onPress={() => onClick(index)}
                >
                  <Text style={styles.itemInActive}>{item.key}</Text>
                  <Icon
                    name={"check-circle"}
                    size={24}
                    // color={item.value ? Colors.GREEN : Colors.LIGHTGRAY}
                  />
                </TouchableOpacity>
                <View style={styles.childHr} />
              </View>
            )}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  // eslint-disable-next-line react-native/no-unused-styles
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: "100%",
    height: 54,
    alignItems: "center",
    paddingLeft: 35,
    paddingRight: 35,
    fontSize: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    // color: Colors.DARKGRAY,
  },
  // eslint-disable-next-line react-native/no-unused-styles
  itemActive: {
    fontSize: 12,
    // color: Colors.GREEN,
  },
  itemInActive: {
    fontSize: 12,
    // color: Colors.DARKGRAY,
  },
  btnActive: {
    // borderColor: Colors.GREEN,
  },
  btnInActive: {
    // borderColor: Colors.DARKGRAY,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 56,
    paddingLeft: 25,
    paddingRight: 18,
    alignItems: "center",
    // backgroundColor: Colors.CGRAY,
  },
  childRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    // backgroundColor: Colors.GRAY,
  },
  parentHr: {
    height: 1,
    // color: Colors.WHITE,
    width: "100%",
  },
  childHr: {
    height: 1,
    // backgroundColor: Colors.LIGHTGRAY,
    width: "100%",
  },
  //   colorActive: {
  //     borderColor: Colors.GREEN,
  //   },
  //   colorInActive: {
  //     borderColor: Colors.DARKGRAY,
  //   },
});

export default Accordion;
