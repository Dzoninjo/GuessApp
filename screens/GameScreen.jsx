import { StyleSheet, View, Alert, Text, FlatList, useWindowDimensions } from 'react-native';
import Title from '../components/ui/Title';
import { useState, useEffect } from 'react';
import PrimaryButton from '../components/ui/PrimaryButton';
import NumberContainer from '../components/game/NumberContainer';
import InstructionText from '../components/ui/InstructionText';
import Card from '../components/ui/Card';
import GuessLogItem from '../components/game/GuessLogItem';


function generateRandomBetween(min, max, exclude) {
    const rndNum = Math.floor(Math.random() * (max - min)) + min;

    if (rndNum === exclude) {
        return generateRandomBetween(min, max, exclude);
    }
    else {
        return rndNum;
    }
}

let minBoundry = 1;
let maxBoundry = 100;

function GameScreen({ userNumber, onGameOver }) {
    const initialGuess = generateRandomBetween(1, 100, userNumber);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [guessRounds, setGuessRounds] = useState([initialGuess]);
    const { width, height } = useWindowDimensions();

    const guessRoundsListLength = guessRounds.length;

    useEffect(() => {
        if (currentGuess === userNumber) {
            onGameOver(guessRounds.length);
        }
    }, [currentGuess, userNumber, onGameOver]);

    useEffect(() => {
        minBoundry = 1;
        maxBoundry = 100;
    }, []);

    function nextGuessHandler(direction) {

        if ((direction === 'lower' && currentGuess < userNumber) ||
            (direction === 'greater' && currentGuess > userNumber)) {
            Alert.alert("Ne laži", "Znaš da ovo nije tačno", [
                { text: 'Izvini!', style: 'cancel' }
            ]);
            return;
        }

        if (direction === 'lower') {
            maxBoundry = currentGuess;
        }
        else {
            minBoundry = currentGuess + 1;
        }
        const newRndNumber = generateRandomBetween(minBoundry, maxBoundry, currentGuess);
        setCurrentGuess(newRndNumber);
        setGuessRounds(prevGuessRounds => [newRndNumber, ...prevGuessRounds])
    }

    let content = (
        <>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card>
                <InstructionText style={styles.instructionText}>Veći ili manji?</InstructionText>
                <View style={styles.buttonsContainer}>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>-</PrimaryButton>
                    </View>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}>+</PrimaryButton>
                    </View>
                </View>
            </Card>
        </>
    )

    if (width > 500) {
        content = <>
            <View style={styles.buttonsContainerWide}>
                <View style={styles.buttonContainer}>
                    <PrimaryButton onPress={nextGuessHandler.bind(this, "lower")}>
                        -
                    </PrimaryButton>
                </View>
                <NumberContainer>{currentGuess}</NumberContainer>
                <View style={styles.buttonContainer}>
                    <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}>
                        +
                    </PrimaryButton>
                </View>
            </View>
        </>
    }

    return (
        <View style={styles.screen}>
            <Title>Pogađanje protivnika</Title>
            {content}
            <View style={styles.listContainer}>
                {/* {guessRounds.map(guessRound => <Text key={guessRound}>{guessRound}</Text>)} */}
                <FlatList data={guessRounds}
                    renderItem={(itemData) =>
                        <GuessLogItem
                            roundNumber={guessRoundsListLength - itemData.index}
                            guess={itemData.item} />}
                    keyExtractor={(item) => item} />
            </View>
        </View>
    )
}

export default GameScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 20,
        alignItems: "center"
    },
    buttonsContainer: {
        flexDirection: 'row'
    },
    buttonContainer: {
        flex: 1,
    },
    instructionText: {
        marginBottom: 12,
    },
    listContainer: {
        flex: 1,
        padding: 16,
    },
    buttonsContainerWide: {
        flexDirection: "row",
        alignItems: "center"
    },
});