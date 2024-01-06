import React, {Component} from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import colores from "../../style/colors";

const SuperiorBar = ({folder, onPress})=>{
    return(
        <View style={styles.container}>
            { folder !== 'notes' && 
                <View style={styles.button}>
                    <Button title="Atrás" onPress={onPress} />
                </View>
            }
            <Text style={styles.title}>{folder}</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colores.principal1,
    },
    button: {
        position: "absolute",
        left: 15
    },
    title: {
        color: colores.negro,
        fontWeight: "bold",
        fontSize: 26
    }
})


export default SuperiorBar;