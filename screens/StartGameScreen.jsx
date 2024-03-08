import {
    Alert, useWindowDimensions, StyleSheet,
    TextInput, View, KeyboardAvoidingView, ScrollView
} from 'react-native';
import PrimaryButton from '../components/ui/PrimaryButton';
import { useState } from 'react';
import Colors from '../constants/colors';
import Title from '../components/ui/Title';
import Card from '../components/ui/Card';
import InstructionText from '../components/ui/InstructionText';

function StartGameScreen({ onPickNumber }) {

    const [enteredNumber, setEnteredNumber] = useState("");

    const { width, height } = useWindowDimensions();

    function numberInputHandler(enteredText) {
        setEnteredNumber(enteredText)
    }

    function resetInputHandler() {
        setEnteredNumber("");
    }

    function confirmInputHandler() {
        const chosenNumber = parseInt(enteredNumber);

        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert('Upozorenje', 'Morate uneti broj između 1 i 99.',
                [{ text: 'Ok', style: 'destructive', onPress: resetInputHandler }])
            return;
        }
        onPickNumber(chosenNumber);
    }

    const marginTopDistance = height < 300 ? 30 : 80;

    return (
        <ScrollView style = {styles.screen}>
            <KeyboardAvoidingView style={styles.screen}>
                <View>
                    <View style={[styles.rootContainer, { marginTop: marginTopDistance }]}>
                        <Title>Pogodi broj</Title>
                    </View>
                    <Card>
                        <InstructionText>Unesi broj</InstructionText>
                        <TextInput style={styles.numberInput}
                            maxLength={2}
                            keyboardType='number-pad'
                            autoCapitalize='none'
                            autoCorrect={false}
                            onChangeText={numberInputHandler}
                            value={enteredNumber}
                        />
                        <View style={styles.buttonsContainer}>
                            <PrimaryButton onPress={resetInputHandler}>Restart</PrimaryButton>
                            <PrimaryButton onPress={confirmInputHandler}>Potvrdi</PrimaryButton>
                        </View>
                    </Card>
                </View>
            </KeyboardAvoidingView>
        </ScrollView>


    )
}

export default StartGameScreen;

// const deviceHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
    rootContainer: {
        marginTop: 100,
        alignItems: 'center',
    },
    screen: {
        flex: 1,
    },
    numberInput: {
        height: 60,
        fontSize: 32,
        borderBottomColor: Colors.accent500,
        borderBottomWidth: 2,
        color: Colors.accent500,
        marginVertical: 16,
        fontWeight: 'bold',
        width: 50,
        textAlign: 'center',
    },
    buttonsContainer: {
        flexDirection: 'row',
    },
    buttonContainer: {
        flex: 1,
    }
})