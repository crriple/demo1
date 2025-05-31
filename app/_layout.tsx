import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Add from '../components/Add';
import Categories from '../components/Categories';
import Navbar from '../components/Navbar';
import Tast from '../components/Tast';
import { addImage } from '../utils/index';

function App() {
  // 展示添加任务的弹窗
  const [showAdd, setShowAdd] = useState(false);
  // 任务列表
  const [tasks, setTasks] = useState<{ text: string; color: string; done: boolean }[]>([]);
  // 添加任务
  const handleAddTask = (task: { text: string; color: string }) => {
    setTasks(prev => [...prev, { ...task, done: false }]);
    setShowAdd(false);
  };
  // 删除任务
  const handleDeleteTask = (index: number) => {
    setTasks(prev => prev.filter((_, i) => i !== index));
  };
  // 完成任务
  const handleToggleDone = (index: number) => {
    setTasks(prev => prev.map((t, i) => i === index ? { ...t, done: !t.done } : t));
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.content}>
          <Navbar />
          <Text style={styles.title}>What's up,Olivia!</Text>
          <Categories tasks={tasks} />
          <Tast tasks={tasks} onDeleteTask={handleDeleteTask} onToggleDone={handleToggleDone} />
        </ScrollView>
        <TouchableOpacity style={styles.fab} onPress={() => setShowAdd(true)}>
          <Image source={addImage} style={{ width: 32, height: 32 }} />
        </TouchableOpacity>
        {showAdd && <Add onClose={() => setShowAdd(false)} onAddTask={handleAddTask} />}
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#3450A1',
    width: '100%',
    height: '100%',
  },
  content: {
    marginTop: 60,
    marginLeft: 40,
    marginRight: 40,
  },
  title: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
  },
  fab: {
    position: 'absolute',
    right: 24,
    bottom: 32,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgb(235,6,255)',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },

});

export default App;