import { StatusBar } from "expo-status-bar";
import { useState } from "react";
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
} from "react-native";
import Task, { TaskProps } from "./src/components/Task";

export default function App() {
  const [tasks, setTasks] = useState<TaskProps[]>([
    { title: "Pushups", goal: 100, numComplete: 80 },
    { title: "Situps", goal: 50, numComplete: 5 },
    { title: "Pullups", goal: 10, numComplete: 5 },
  ]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  return (
    <>
      <SafeAreaView className="h-screen bg-slate-800">
        <StatusBar translucent={true} style="inverted" />
        <View className="mt-4 android:mt-14">
          <Text className="text-white font-bold text-xl text-center">
            27/9/22
          </Text>
          <Text className="text-white text-center">TODAY</Text>
        </View>

        <ScrollView className="mt-4">
          {tasks.map((task) => (
            <Task
              key={task.title + task.goal}
              title={task.title}
              goal={task.goal}
              numComplete={task.numComplete}
            />
          ))}
        </ScrollView>
        <View>
          <Pressable
            className="bg-slate-600 p-4 m-5 rounded-xl"
            onPress={() => {
              setModalVisible(true);
            }}
          >
            <Text className="text-white text-center font-bold">Add Task</Text>
          </Pressable>
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View className="flex flex-1 justify-end">
            <View className=" bg-slate-800 shadow-2xl shadow-slate-500 m-2 p-5 pb-16 items-center rounded-3xl ios:rounded-[40%]">
              <Text className="text-white font-bold text-xl">Add Task</Text>
              <Pressable
                className="absolute right-6 top-1"
                onPress={() => setModalVisible(false)}
              >
                <Text className="text-white">close</Text>
              </Pressable>

              <TextInput
                placeholder="Lorem ipsum..."
                className="bg-slate-500 p-4 w-full rounded-lg text-white text-md"
                onChangeText={(text) => setNewTaskTitle(text)}
              />

              <Pressable
                className="bg-slate-600 p-4 m-5 rounded-xl"
                onPress={() => {
                  setTasks([...tasks, { title: newTaskTitle }]);
                  setModalVisible(false);
                }}
              >
                <Text className="text-white font-bold">Add</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </>
  );
}
