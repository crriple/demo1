import React, { useRef } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { deleteImage } from '../utils/index';

type TastProps = {
    tasks: { text: string; color: string; done: boolean }[];
    onDeleteTask: (index: number) => void;
    onToggleDone: (index: number) => void;
};

const Tast = ({ tasks, onDeleteTask, onToggleDone }: TastProps) => {
    const swipeableRefs = useRef<(Swipeable | null)[]>([]);
    // useRef不会触发组件的重新渲染
    const openedRow = useRef<number | null>(null);
    // 实例存在关闭删除任务的动画
    const closeOpenedRow = () => {
        if (openedRow.current !== null && swipeableRefs.current[openedRow.current]) {
            swipeableRefs.current[openedRow.current]?.close();
        }
    };
    // 渲染删除任务的按钮
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
                        ref={(ref: Swipeable | null) => { swipeableRefs.current[idx] = ref; }}
                        // 打开删除任务的动画
                        onSwipeableWillOpen={() => {
                            closeOpenedRow();
                            openedRow.current = idx;
                        }}
                        // 关闭删除任务的动画
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
        fontSize: wp('3%'),
        color: '#A0A3BD',
        marginBottom: hp('1.5%'),
        letterSpacing: 1,
        fontWeight: 'bold',
        marginTop: hp('2.5%'),
    },
    container: {
        marginTop: hp('1.25%'),
        marginBottom: hp('5%'),
    },
    task: {
        backgroundColor: '#041954',
        flexDirection: 'row',
        borderRadius: wp('3.75%'),
        height: hp('7.5%'),
        alignItems: 'center',
        marginBottom: hp('0.625%'),
    },
    circle: {
        width: wp('6%'),
        height: wp('6%'),
        borderRadius: wp('3%'),
        borderWidth: 2,
        borderColor: '#A0A3BD',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: wp('5%'),
        backgroundColor: 'transparent',
    },
    check: {
        color: '#fff',
        fontSize: wp('4%'),
        fontWeight: 'bold',
    },
    taskText: {
        marginLeft: wp('5%'),
        color: 'white',
        fontSize: wp('4%'),
    },
    lineThrough: {
        textDecorationLine: 'line-through',
        color: '#A0A3BD',
    },
    deleteBtn: {
        backgroundColor: '#3450A1',
        justifyContent: 'center',
        alignItems: 'center',
        width: wp('15%'),
        height: hp('7.5%'),
        borderTopLeftRadius: wp('3.75%'),
        borderBottomLeftRadius: wp('3.75%'),
        marginBottom: hp('0.625%'),
    },
    deleteText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: wp('4%'),
    },
    deleteImg: {
        width: wp('6.25%'),
        height: wp('6.25%'),
        marginRight: wp('3.75%'),
    },
})

export default Tast;