import React, { useState } from 'react'
import { View, Modal, Text, StyleSheet, Pressable } from 'react-native';

export const LocationPromptModal = ({visible, onConfirm, onCancel}) => {
    return <View>
        <Modal transparent style={{backgroundColor: 'rgba(0,0,0,0.1)'}} visible={visible}>
            <View style={styles.modalView}>
            <Text style={styles.h2}>Use your location</Text>
            <Text style={styles.text}>
                Sunsettr uses your device's location in order to compute the sunrise and sunset times at your location, even when the app is closed or not in use
            </Text>
            <View style={styles.buttonContainer}>
                <Pressable style={styles.button} onPress={onCancel}><Text style={styles.text}>No thanks</Text></Pressable>
                <Pressable style={styles.button} onPress={onConfirm}><Text style={styles.text}>Turn on</Text></Pressable>
            </View>
            </View>
        </Modal>
    </View>
}

const styles = StyleSheet.create({
    modalView: {
        marginBottom: 20,
        height: '100vh',
        marginLeft: 5,
        marginRight: 5,
        backgroundColor: "black",
        borderRadius: 5,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        color: 'white',
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        },
    h2: {
        color: 'white',
        fontSize: 24,
        margin: 10
    },
    text: {
        color: 'white',
        fontSize: 12
    },
    button: {
        flex: 'none',
        borderRadius: 5,
        padding: 10,
        elevation: 2,
        backgroundColor: 'steelblue',
        color: 'white'
        },
    buttonContainer: {
        marginTop: 100,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})