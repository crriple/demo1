import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

const categoryList = [
  { name: 'Business', color: '#2563EB' },
  { name: 'Personal', color: 'rgb(235,6,255)' },
  { name: 'Other', color: '#22C55E' },
];

// 颜色到分类名的映射
const colorToCategory: Record<string, string> = {
  '#2563EB': 'Business',
  'rgb(235,6,255)': 'Personal',
  '#22C55E': 'Other',
};

interface Task {
  color: string;
  text: string;
}

const Categories = ({ tasks = [] }: { tasks?: Task[] }) => {
  // 统计每类任务数量
  const counts: Record<string, number> = {
    Business: 0,
    Personal: 0,
    Other: 0,
  };
  tasks.forEach((task: { color: string }) => {
    const cat = colorToCategory[task.color] || 'Other';
    counts[cat]++;
  });
  const total = tasks.length||1;

  return (
    <View>
      <Text style={styles.title}>CATEGORIES</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.row}
      >
        {categoryList.map(cat => (
          <View key={cat.name} style={styles.card}>
            <Text style={styles.count}>{counts[cat.name]} tasks</Text>
            <Text style={styles.name}>{cat.name}</Text>
            <View style={styles.progressBg}>
              <View style={[styles.progressBar, { backgroundColor: cat.color, width: `${(counts[cat.name] / total) * 100}%` }]} />
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: wp('3%'),
    color: '#A0A3BD',
    marginBottom: hp('1.875%'),
    letterSpacing: 1,
    fontWeight: 'bold',
    marginLeft: wp('10%'),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginLeft: wp('10%'),
    gap: wp('3%'),
    marginRight: wp('10%'),
  },
  card: {
    backgroundColor: '#0A1747',
    borderRadius: wp('4.5%'),
    padding: wp('4.5%'),
    width: wp('45%'),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: hp('0.25%') },
    shadowOpacity: 0.15,
    shadowRadius: wp('2%'),
    elevation: 4,
  },
  count: {
    color: '#A0A3BD',
    fontSize: wp('3.25%'),
    marginBottom: hp('0.75%'),
  },
  name: {
    color: 'white',
    fontSize: wp('5%'),
    fontWeight: 'bold',
    marginBottom: hp('2%'),
  },
  progressBg: {
    height: hp('0.75%'),
    backgroundColor: '#23336C',
    borderRadius: hp('0.75%'),
    width: '100%',
    overflow: 'hidden',
  },
  progressBar: {
    height: hp('0.75%'),
    borderRadius: hp('0.75%'),
  },
});

export default Categories;