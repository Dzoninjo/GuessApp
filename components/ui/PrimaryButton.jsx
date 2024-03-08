import { View, Text, Pressable, StyleSheet } from "react-native";
import Colors from "../../constants/colors";

function PrimaryButton({ children, onPress }) {

    return (
        <View style={styles.buttonOuterContainer}>
            <Pressable
                onPress={onPress}
                style={styles.buttonInnerContainer}
                android_ripple={{ color: Colors.primary600 }}>
                <Text style={styles.buttonText}>{children}</Text>
            </Pressable>
        </View>

    )
}

export default PrimaryButton;

const styles = StyleSheet.create({
    buttonInnerContainer: {
        backgroundColor: Colors.primary500,
        paddingVertical: 8,
        paddingHorizontal: 16,
        elevation: 2,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
    buttonOuterContainer: {
        borderRadius: 28,
        margin: 4,
        overflow: 'hidden',
    }
})