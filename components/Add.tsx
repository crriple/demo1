import React, { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { calendarImage, flagImage, folderImage, forkImage, moonImage } from '../utils/index';

interface AddProps {
  onClose: () => void;
  onAddTask: (task: { text: string; color: string }) => void;
}

const Add = ({ onClose, onAddTask }: AddProps) => {
  const [input, setInput] = useState('');
  const [circleColorIndex, setCircleColorIndex] = useState(0);
  const circleColors = ['rgb(235,6,255)', '#2563EB', '#22C55E']; // 粉、蓝、绿

  const handleAdd = () => {
    if (input.trim()) {
      onAddTask({ text: input.trim(), color: circleColors[circleColorIndex] });
      setInput('');
    }
  };

  return (
    <View style={styles.overlay}>
      <View style={styles.container}>
        <Pressable onPress={onClose} style={styles.closeBtn}>
          <Image source={forkImage} style={{ width: 35, height: 35 }} />
        </Pressable>
        <TextInput
          style={styles.input}
          placeholder="Enter new task"
          placeholderTextColor="#A0A3BD"
          value={input}
          onChangeText={setInput}
        />
        <View style={styles.row}>
          <TouchableOpacity style={styles.dateBtn}>
            <Image source={calendarImage} style={styles.icImg} />
            <Text style={styles.dateText}>Today</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.circleBtn} onPress={() => setCircleColorIndex((circleColorIndex + 1) % 3)}>
            <View style={[styles.circle, { backgroundColor: circleColors[circleColorIndex] }]} />
          </TouchableOpacity>
        </View>
        <View style={styles.iconRow}>
          <Image source={folderImage} style={styles.iconImg}  />
          <Image source={flagImage} style={styles.iconImg} />
          <Image source={moonImage} style={styles.iconImg} />
        </View>

        <TouchableOpacity style={styles.newTaskBtn} onPress={handleAdd}>
          <Text style={styles.newTaskText}>New task</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255,255,255,0.95)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
  container: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    position: 'relative',
  },
  closeBtn: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 40 ,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeText: {
    fontSize: 28,
    color: '#B0B3C7',
  },
  input: {
    width: '100%',
    borderBottomColor: '#E0E0E0',
    fontSize: 22,
    color: '#6E7491',
    marginTop: 40,
    marginBottom: 32,
    paddingVertical: 8,
    borderWidth: 0, // 明确无边框
    borderBottomWidth: 0, // 明确无底线
  },

  row: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 32,
  },
  dateBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 8,
    marginRight: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  dateText: {
    color: '#A0A3BD',
    fontSize: 16,
  },
  circleBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#A0A3BD',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#A0A3BD',
  },
  iconRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 48,
    paddingHorizontal: 24,
  },
  iconImg: {
    width: 20,
    height: 20,
    marginHorizontal: 20,
  },
  icImg: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  newTaskBtn: {
    width: '100%',
    backgroundColor: '#2563EB',
    borderRadius: 24,
    paddingVertical: 16,
    alignItems: 'center',
  },
  newTaskText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Add;
