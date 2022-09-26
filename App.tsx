import { PageSlider } from "@pietile-native-kit/page-slider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import {
  Alert,
  Button,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  Touchable,
  TouchableOpacity,
  View,
  Dimensions,
  RefreshControl,
  FlatList,
} from "react-native";
import Task, { TaskProps } from "./src/components/Task";

const { height, width } = Dimensions.get("window");

export default function App() {
  const [tasks, setTasks] = useState<TaskProps[]>([
    { id: "1", title: "Pushups", goal: 100, numComplete: 80 },
    { id: "2", title: "Situps", goal: 50, numComplete: 5 },
    { id: "3", title: "Pullups", goal: 10, numComplete: 5 },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const [selectedPage, setSelectedPage] = useState(0);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("todos");
      if (value !== null) {
        // value previously stored
        const parsedTodos = JSON.parse(value);
        setTasks(parsedTodos);
      }
    } catch (e) {
      // error reading value
      console.log(e);
    }
  };

  const setObjectValue = async (value: TaskProps[]) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("todos", jsonValue);
    } catch (e) {
      // save error
    }

    console.log("Done.");
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setObjectValue(tasks);
  }, [tasks]);

  return (
    <>
      <SafeAreaView className="bg-slate-900" style={{ height }}>
        <StatusBar translucent={false} style="inverted" />

        <View className="mt-4 android:mt-10">
          <Text className="text-xl font-bold text-center text-white">
            27/9/22
          </Text>
          <Text className="text-center text-white">TODAY</Text>
        </View>

        <PageSlider
          selectedPage={selectedPage}
          onSelectedPageChange={setSelectedPage}
          onCurrentPageChange={setSelectedPage}
        >
          <View className="flex-1 pt-6">
            <FlatList
              data={tasks}
              renderItem={({ item: task }) => (
                <Task
                  id={task.id}
                  title={task.title}
                  goal={task.goal}
                  numComplete={task.numComplete}
                />
              )}
              keyExtractor={(item) => item.id}
            />
          </View>
          {/* <View className="flex-1 pt-6">
            <FlatList
              data={tasks}
              renderItem={({ item: task }) => (
                <Task
                  id={task.id}
                  title={task.title}
                  goal={task.goal}
                  numComplete={task.numComplete}
                />
              )}
              keyExtractor={(item) => item.id}
            />
          </View> */}
        </PageSlider>

        {/* <View>
          <Pressable
            className="p-4 m-5 bg-slate-600 rounded-xl"
            onPress={() => {
              setModalVisible(true);
            }}
          >
            <Text className="font-bold text-center text-white">Add Task</Text>
          </Pressable>
        </View> */}

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="flex flex-row m-4 mb-8"
        >
          <TextInput
            placeholder="+"
            className="flex-1 p-4 text-center text-white text-md rounded-xl bg-slate-700"
            onChangeText={(text) => setNewTaskTitle(text)}
          />
          <Pressable
            className={`${
              newTaskTitle === "" ? "hidden" : ""
            } p-4 ml-2 bg-slate-800 rounded-xl`}
            onPress={() => {
              if (newTaskTitle !== "") {
                setTasks([
                  ...tasks,
                  {
                    id: Math.random() + "",
                    title: newTaskTitle,
                    numComplete: 0,
                    goal: 100,
                  },
                ]);
              }
            }}
          >
            <Text className="font-bold text-center text-white">Add</Text>
          </Pressable>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
}
