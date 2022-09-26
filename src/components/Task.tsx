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
    if (barWidth) {
      console.log("BAR WIDTH", barWidth);
      let percent = (evt.nativeEvent.locationX / barWidth) * 100;
      percent = Math.max(percent, 0);
      percent = Math.min(percent, 100);
      setPercentComplete(percent);
    }
  };

  return (
    <Pressable
      onLongPress={() => {
        console.log("pressed");
        setIsExpanded((x) => !x);
      }}
      ref={barRef}
      onTouchStart={handleSliderMove}
      onTouchMove={handleSliderMove}
      onTouchEnd={() => {
        console.log("set percent to " + percentComplete);
      }}
      className={
        "h-16  rounded-[25px] mb-4 mx-4 flex flex-row justify-between items-center border border-slate-700 overflow-hidden bg-slate-800"
      }
    >
      <View
        className="absolute h-full bg-slate-600"
        style={{ width: `${percentComplete}%` }}
      ></View>
      <Text className="ml-4 font-bold text-white text-md">{title}</Text>
      <Text className="mr-4 text-white text-md">
        {numComplete} / {goal}
      </Text>
      <View className="absolute w-full h-full" />
    </Pressable>
  );
};

export default Task;
