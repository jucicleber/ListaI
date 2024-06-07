import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import { TextInputMask } from 'react-native-masked-text';


export interface Data {
    key: number,
    item: string,
    price: number,
    onIncrementList: () => void,
    onDeleteList: () => void
}

export default function CreateLista({ data, deleteList, list, setList, onIncrementList, onDeleteList }: {
    data: Data,
    deleteList: () => void,
    list: Data[],
    setList: React.Dispatch<React.SetStateAction<Data[]>>,
    onIncrementList: () => void,
    onDeleteList: () => void,
}) {
    const [quantidade, setQuantidade] = useState(1);
    const [price, setPrice] = useState(data.price.toString());
    const [checked, setChecked] = useState(false);

    const handleDeleteList = () => {
        const updatedList = list.filter(item => item.key !== data.key);
        setList(updatedList);
    };

    const handleIncrementList = () => {
        onIncrementList();
        setQuantidade(prevQuantity => prevQuantity + 1);
    };

    const handleDecrementList = () => {
        setQuantidade(prevQuantity => Math.max(prevQuantity - 1, 1));
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={handleDeleteList}>
                <FontAwesome name="trash" size={25} color="#22272e" />
            </TouchableOpacity>
            <Text numberOfLines={1} ellipsizeMode="tail" style={[styles.text, checked && styles.textChecked]}>{data.item}</Text>
            <View style={styles.quantityContainer}>
                <TouchableOpacity style={styles.quantityButton} onPress={handleDecrementList}>
                    <FontAwesome name="minus" size={15} color="#22272e" />
                </TouchableOpacity>
                <Text style={styles.quantityInput}>{quantidade.toString()}</Text>
                <TouchableOpacity style={styles.quantityButton} onPress={handleIncrementList}>
                    <FontAwesome name="plus" size={15} color="#22272e" />
                </TouchableOpacity>
            </View>
            <TextInputMask
                style={styles.input}
                placeholder="Preço"
                keyboardType="numeric"
                type={'money'}
                options={{
                    precision: 2,
                    separator: ',',
                    delimiter: '.',
                    unit: 'R$',
                    suffixUnit: ''
                }}
                value={price}
                onChangeText={(text) => setPrice(text)}
                onBlur={() => {
                    const newPrice = parseFloat(price.replace('R$', '').replace(',', '.'));
                    const updatedList = list.map(item => {
                        if (item.key === data.key) {
                            return { ...item, price: newPrice };
                        }
                        return item;
                    });
                    setList(updatedList);
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(196,196,196,0.20)',
        marginTop: 8,
        borderRadius: 4,
        flexDirection: 'row',
        alignItems: 'center'
    },
    button: {
        paddingLeft: '5%',
        paddingRight: '2%'
    },
    checkbox: {
        paddingLeft: '5%',
        paddingRight: '2%'
    },
    text: {
        flex: 1,
        marginLeft: 12,
        textAlign: 'left'
    },
    textChecked: {
        textDecorationLine: 'line-through',
    },
    input: {
        width: 70,
        backgroundColor: '#fff',
        height: 21,
        borderRadius: 4,
        paddingHorizontal: 5,
        marginLeft: 6,
        fontSize: 12
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
    },
    quantityButton: {
        width: 20,
        height: 18,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 4,
        marginLeft: 4,
    },
    quantityInput: {
        width: 30,
        backgroundColor: '#fff',
        height: 21,
        borderRadius: 4,
        paddingHorizontal: 5,
        marginLeft: 4,
        textAlign: 'center'
    }
});
