import { ScrollView, StyleSheet, Text, View } from 'react-native';

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
    fontSize: 12,
    color: '#A0A3BD',
    marginBottom: 15,
    letterSpacing: 1,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 16,
  },
  card: {
    backgroundColor: '#0A1747',
    borderRadius: 18,
    padding: 18,
    width: 140,
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  count: {
    color: '#A0A3BD',
    fontSize: 13,
    marginBottom: 6,
  },
  name: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  progressBg: {
    height: 6,
    backgroundColor: '#23336C',
    borderRadius: 6,
    width: '100%',
    overflow: 'hidden',
  },
  progressBar: {
    height: 6,
    borderRadius: 6,
  },
});

export default Categories;