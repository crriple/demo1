import React, { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
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
          <Image source={forkImage} style={{ width: wp('10%'), height: wp('10%') }} />
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
    borderRadius: wp('6%'),
    padding: wp('6%'),
    alignItems: 'center',
    position: 'relative',
  },
  closeBtn: {
    position: 'absolute',
    top: hp('2%'),
    right: wp('4%'),
    width: wp('10%'),
    height: wp('10%'),
    borderRadius: wp('5%'),
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeText: {
    fontSize: wp('7%'),
    color: '#B0B3C7',
  },
  input: {
    width: '100%',
    borderBottomColor: '#E0E0E0',
    fontSize: wp('5.5%'),
    color: '#6E7491',
    marginTop: hp('5%'),
    marginBottom: hp('4%'),
    paddingVertical: hp('1%'),
    borderWidth: 0,
    borderBottomWidth: 0,
  },

  row: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: hp('4%'),
  },
  dateBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: wp('4%'),
    paddingHorizontal: wp('4.5%'),
    paddingVertical: hp('1%'),
    marginRight: wp('4%'),
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  dateText: {
    color: '#A0A3BD',
    fontSize: wp('4%'),
  },
  circleBtn: {
    width: wp('9%'),
    height: wp('9%'),
    borderRadius: wp('4.5%'),
    borderWidth: 1,
    borderColor: '#A0A3BD',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    width: wp('4%'),
    height: wp('4%'),
    borderRadius: wp('2%'),
    backgroundColor: '#A0A3BD',
  },
  iconRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp('6%'),
    paddingHorizontal: wp('6%'),
  },
  iconImg: {
    width: wp('5%'),
    height: wp('5%'),
    marginHorizontal: wp('5%'),
  },
  icImg: {
    width: wp('5%'),
    height: wp('5%'),
    marginRight: wp('2%'),
  },
  newTaskBtn: {
    width: '100%',
    backgroundColor: '#2563EB',
    borderRadius: wp('6%'),
    paddingVertical: hp('2%'),
    alignItems: 'center',
  },
  newTaskText: {
    color: '#fff',
    fontSize: wp('4.5%'),
    fontWeight: 'bold',
  },
});

export default Add;
