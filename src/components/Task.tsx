import { useEffect, useRef, useState } from "react";
import { View, Text, Pressable, GestureResponderEvent } from "react-native";

export interface TaskProps {
  title: string;
  goal?: number;
  numComplete?: number;
}

const Task = ({ title, goal, numComplete }: TaskProps) => {
  const [percentComplete, setPercentComplete] = useState(
    ((numComplete ?? 0) / (goal ?? 0)) * 100
  );
  const [isExpanded, setIsExpanded] = useState(false);
  const barRef = useRef<View>(null);

  const [barWidth, setBarWidth] = useState<number>();

  useEffect(() => {
    if (barRef.current != null) {
      console.log("setting width");
      barRef.current.measure((x, y, width, height, pageX, pageY) => {
        setBarWidth(width);
      });
    }
  }, [barRef.current]);

  const handleSliderMove = (evt: GestureResponderEvent) => {
    if (barWidth) {
      console.log("BAR WIDTH", barWidth);
      let percent = (evt.nativeEvent.locationX / barWidth) * 100;
      percent = Math.max(percent, 0);
      percent = Math.min(percent, 100);
      setPercentComplete(percent);
    }
  };

  return (
    <Pressable onPress={() => setIsExpanded((x) => x)}>
      <View
        className={`bg-slate-600 px-4 ${
          isExpanded ? "py-8" : "py-4"
        } m-2 rounded-lg flex flex-row items-center justify-between transition-all`}
      >
        <Text className={`text-white mr-5 ${isExpanded && "font-bold"}`}>
          {title}
        </Text>

        <View className="flex w-56">
          <View
            className="bg-slate-500 h-4 rounded-sm"
            ref={barRef}
            onTouchStart={handleSliderMove}
            onTouchMove={handleSliderMove}
            onTouchEnd={() => {
              console.log("set percent to " + percentComplete);
            }}
          >
            <View
              className="bg-slate-300 h-full w-10"
              style={{ width: `${percentComplete}%` }}
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
