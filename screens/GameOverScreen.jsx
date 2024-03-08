import { Text, StyleSheet, View, Image, useWindowDimensions, ScrollView } from "react-native";
import Colors from "../constants/colors";
import Title from "../components/ui/Title";
import PrimaryButton from "../components/ui/PrimaryButton";

function GameOverScreen({ roundsNumber, userNumber, onStartNewGame }) {

    const { width, height } = useWindowDimensions();
    let imageSize = 300;

    if (width < 380) {
        imageSize = 150;
    }

    if (height < 400) {
        imageSize = 80;
    }

    const imageStyle = {
        width: imageSize,
        height: imageSize,
        borderRadius: imageSize / 2,
    }

    return (
        <ScrollView style={styles.screen}>
            <View style={styles.rootContainer}>
                <Title>IGRA JE GOTOVA!</Title>
                <View style={[styles.imageContainer, imageStyle]}>
                    <Image style={styles.image} source={require('../assets/images/success.png')} />
                </View>
                <Text style={styles.summaryText}>Telefonu je bilo potrebno <Text style={styles.highlight}> {roundsNumber} </Text>
                    pokušaja da pogodi broj  <Text style={styles.highlight}>{userNumber}</Text>.
                </Text>
                <PrimaryButton onPress={onStartNewGame}>Nova igra</PrimaryButton>
            </View>
        </ScrollView>
    )
}

export default GameOverScreen;

// const deviceWidth = Dimensions.get("window").width;
// const deviceHeight = Dimensions.get("window").height;


const styles = StyleSheet.create({
    inputContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        marginTop: 30,
        backgroundColor: Colors.primary800,
        borderRadius: 8,
        elevation: 4,
    },
    screen: {
        flex: 1,
    },
    imageContainer: {
        // height: deviceWidth < 300 ? 150 : 300,
        // width: deviceWidth < 300 ? 150 : 300,
        // borderRadius: deviceWidth < 300 ? 75 : 150,
        borderWidth: 3,
        borderColor: Colors.primary800,
        overflow: 'hidden',
        margin: 36,
    },
    image: {
        height: "100%",
        width: "100%",
    },
    rootContainer: {
        flex: 1,
        padding: 24,
        justifyContent: "center",
        alignItems: "center"
    },
    summaryText: {
        color: Colors.white,
        fontSize: 24,
        textAlign: "center",
        marginVertical: 24,
    },
    highlight: {
        color: Colors.primary500,
    }
});