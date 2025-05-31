import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
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
      <ScrollView contentContainerStyle={{ minHeight: hp('100%') }}>
        <View style={styles.content}>
          <Navbar />
          <Text style={styles.title}>What's up,Olivia!</Text>
        </View>
        <Categories tasks={tasks} />

        <View style={styles.content1}>
          <Tast tasks={tasks} onDeleteTask={handleDeleteTask} onToggleDone={handleToggleDone} />
        </View>
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
    marginTop: hp('7.5%'),
    marginLeft: wp('10%'),
    marginRight: wp('10%'),
  },
  content1: {
    marginLeft: wp('10%'),
    marginRight: wp('10%'),
  },
  title: {
    color: 'white',
    fontSize: wp('7.5%'),
    fontWeight: 'bold',
    marginTop: hp('2.5%'),
    marginBottom: hp('2.5%'),
  },
  fab: {
    position: 'absolute',
    right: wp('6%'),
    bottom: hp('4%'),
    width: wp('14%'),
    height: wp('14%'),
    borderRadius: wp('7%'),
    backgroundColor: 'rgb(235,6,255)',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: hp('0.25%') },
    shadowOpacity: 0.3,
    shadowRadius: wp('1%'),
  },

});

export default App;