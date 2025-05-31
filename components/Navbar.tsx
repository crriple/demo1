import { Image, StyleSheet, View } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { alertImage, searchImage, sidebarImage } from '../utils/index';


const Navbar = () => {
    return (
        <View style={styles.container}>
        
          <Image source={sidebarImage} style={{ width: 20, height: 20 }} />
 
          <View style={styles.rightIcons}>
            <Image source={searchImage} style={{ width: 20, height: 20 }} />
            <Image source={alertImage} style={{ width: 20, height: 20 }} />
          </View>
        
      </View>
    )

}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    rightIcons: {
        flexDirection: 'row',
        gap: wp('10%'),
    }
})


export default Navbar;
