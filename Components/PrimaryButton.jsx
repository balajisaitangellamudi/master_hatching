import React, { Children } from "react";
import { Pressable, View } from "react-native";

const PrimaryButton = ({ Children }) => {
  return (
    <Pressable>
      <View>
        <Text>{Children}</Text>
      </View>
    </Pressable>
  );
};

export default PrimaryButton;
