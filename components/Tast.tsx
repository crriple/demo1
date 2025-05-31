import React, { useRef } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { deleteImage } from '../utils/index';

type TastProps = {
    tasks: { text: string; color: string; done: boolean }[];
    onDeleteTask: (index: number) => void;
    onToggleDone: (index: number) => void;
};

const Tast = ({ tasks, onDeleteTask, onToggleDone }: TastProps) => {
    const swipeableRefs = useRef<(Swipeable | null)[]>([]);
    const openedRow = useRef<number | null>(null);

    const closeOpenedRow = () => {
        if (openedRow.current !== null && swipeableRefs.current[openedRow.current]) {
            swipeableRefs.current[openedRow.current]?.close();
        }
    };

    const renderRightActions = (index: number) => (
        <TouchableOpacity style={styles.deleteBtn} onPress={() => onDeleteTask(index)}>
            <Image source={deleteImage} style={styles.deleteImg} />
        </TouchableOpacity>
    );

    return (
        <View>
            <Text style={styles.title}>Today's Tasts</Text>
            <View style={styles.container}>
                {tasks.map((task, idx) => (
                    // 生成一个唯一的key
                    <Swipeable
                        key={task.text + idx}
                        renderRightActions={() => renderRightActions(idx)}
                        ref={ref => swipeableRefs.current[idx] = ref}
                        onSwipeableWillOpen={() => {
                            closeOpenedRow();
                            openedRow.current = idx;
                        }}
                        onSwipeableClose={() => {
                            if (openedRow.current === idx) {
                                openedRow.current = null;
                            }
                        }}
                    >
                        <View style={styles.task}>
                            <TouchableOpacity
                                style={[styles.circle, { borderColor: task.color }]}
                                onPress={() => onToggleDone(idx)}
                                activeOpacity={0.7}
                            >
                                {task.done && <Text style={styles.check}>✓</Text>}
                            </TouchableOpacity>
                            <Text style={[styles.taskText, task.done && styles.lineThrough]}>{task.text}</Text>
                        </View>
                    </Swipeable>
                ))}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 12,
        color: '#A0A3BD',
        marginBottom: 12,
        letterSpacing: 1,
        fontWeight: 'bold',
        marginTop: 20,
    },
    container: {
        marginTop: 10,
    },
    task: {
        backgroundColor: '#041954',
        flexDirection: 'row',
        borderRadius: 15,
        height: 60,
        alignItems: 'center',
        marginBottom: 5,
    },
    circle: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#A0A3BD',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 20,
        backgroundColor: 'transparent',
    },
    check: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    taskText: {
        marginLeft: 20,
        color: 'white',
        fontSize: 16,
    },
    lineThrough: {
        textDecorationLine: 'line-through',
        color: '#A0A3BD',
    },
    deleteBtn: {
        backgroundColor: '#3450A1',
        justifyContent: 'center',
        alignItems: 'center',
        width: 60,
        height: 60,
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
        marginBottom: 5,
    },
    deleteText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    deleteImg: {
        width: 25,
        height: 25,
        marginRight: 15,
    },
})

export default Tast;