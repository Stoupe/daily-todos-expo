import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
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

        <View>
          <Pressable
            className="p-4 m-5 bg-slate-600 rounded-xl"
            onPress={() => {
              setModalVisible(true);
            }}
          >
            <Text className="font-bold text-center text-white">Add Task</Text>
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
          <View className="flex justify-end flex-1">
            <View className=" bg-slate-800 shadow-2xl shadow-slate-500 m-2 p-5 pb-16 items-center rounded-3xl ios:rounded-[40%]">
              <Text className="text-xl font-bold text-white">Add Task</Text>
              <Pressable
                className="absolute right-6 top-1"
                onPress={() => setModalVisible(false)}
              >
                <Text className="text-white">close</Text>
              </Pressable>

              <TextInput
                placeholder="Lorem ipsum..."
                className="w-full p-4 text-white rounded-lg bg-slate-500 text-md"
                onChangeText={(text) => setNewTaskTitle(text)}
              />

              <Pressable
                className="p-4 m-5 bg-slate-600 rounded-xl"
                onPress={() => {
                  setTasks([
                    ...tasks,
                    { id: Math.random() + "", title: newTaskTitle },
                  ]);
                  setModalVisible(false);
                }}
              >
                <Text className="font-bold text-white">Add</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </>
  );
}
