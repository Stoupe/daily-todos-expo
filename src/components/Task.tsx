import { useEffect, useRef, useState } from "react";
import { View, Text, Pressable, GestureResponderEvent } from "react-native";

export interface TaskProps {
  id: string;
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
  }, [barRef.current, isExpanded]);

  const handleSliderMove = (evt: GestureResponderEvent) => {
    if (barWidth && isExpanded) {
      console.log("BAR WIDTH", barWidth);
      let percent = (evt.nativeEvent.locationX / barWidth) * 100;
      percent = Math.max(percent, 0);
      percent = Math.min(percent, 100);
      setPercentComplete(percent);
    }
  };

  return (
    <Pressable
      onPress={() => {
        console.log("pressed");
        setIsExpanded((x) => !x);
      }}
    >
      <View
        className={
          "bg-slate-800 border-slate-700 border px-4 py-4 mx-4 my-2 rounded-3xl flex justify-between"
        }
        style={{
          flexDirection: isExpanded ? "column" : "row",
          alignItems: isExpanded ? "flex-start" : "center",
        }}
      >
        <Text className={"text-white mr-5 text-md font-bold"}>{title}</Text>

        <View className={`flex ${isExpanded ? "mt-2 w-full" : "w-3/5"}`}>
          <Pressable
            className={`${isExpanded ? "h-6" : "h-4"} rounded-lg bg-slate-500`}
            ref={barRef}
            onTouchStart={handleSliderMove}
            onTouchMove={handleSliderMove}
            onTouchEnd={() => {
              console.log("set percent to " + percentComplete);
            }}
          >
            <View
              className="h-full rounded-lg bg-slate-300"
              style={{ width: `${percentComplete}%` }}
            />
          </Pressable>
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
