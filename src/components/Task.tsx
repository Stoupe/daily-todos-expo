import { useState } from "react";
import { View, Text, Pressable } from "react-native";

export interface TaskProps {
  title: string;
  goal?: number;
  numComplete?: number;
}

const Task = ({ title, goal, numComplete }: TaskProps) => {
  const percentComplete = ((numComplete ?? 0) / (goal ?? 0)) * 100;
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Pressable onPress={() => setIsExpanded((x) => !x)}>
      <View
        className={`bg-slate-600 px-4 ${
          isExpanded ? "py-8" : "py-4"
        } m-2 rounded-lg flex flex-row items-center justify-between`}
      >
        <Text className={`text-white mr-5 ${isExpanded && "font-bold"}`}>
          {title}
        </Text>

        <View className="flex w-56">
          <View className="bg-slate-500 h-4 rounded-sm">
            <View
              className="bg-slate-300 h-full w-10"
              style={{ width: `${percentComplete}%` }}
              onTouchStart={(x) => {
                console.log(x.nativeEvent.locationX);
                console.log(x.nativeEvent.pageX);
              }}
              onTouchMove={(x) => {
                console.log((x.nativeEvent.locationX / 380) * 100);
              }}
            />
          </View>
          <View className="flex flex-row justify-between mt-1">
            <Text className="text-white">0</Text>
            <Text className="text-white">25</Text>
            <Text className="text-white">50</Text>
            <Text className="text-white">75</Text>
            <Text className="text-white">100</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default Task;
