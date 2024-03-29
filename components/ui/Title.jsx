import { Text, StyleSheet } from "react-native";
import Colors from "../../constants/colors";

function Title({ children }) {
    return (
        <Text style={styles.title}>{children}</Text>
    )
}

export default Title;

const styles = StyleSheet.create({
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        color: Colors.white,
        textAlign: 'center',
        borderColor: Colors.white,
        borderWidth: 2,
        padding: 12,
        maxWidth: "80%",
        minWidth: 300,
    },
})