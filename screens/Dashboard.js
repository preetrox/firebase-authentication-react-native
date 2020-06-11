import React, { Component } from 'react';
import { Text, View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

// import MapView from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation'

const { width } = Dimensions.get("window")

export default class Dashboard extends Component {
    constructor(props){
        super(props);
        this.state={
            latitude:0,
            longitude:0
        }
    }
    componentDidMount(){
       Geolocation.getCurrentPosition(info => this.setState({latitude:info.coords.latitude,longitude:info.coords.longitude}));
        
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View>
                        <Text style={styles.geoText}>Geofence</Text>
                    </View>
                    <View style={styles.dashboardContentContainer}>
                        <View style={styles.dashboardContent}>
                            <MaterialIcons name="location-on" style={{ fontSize: 50, color: '#333' }} />
                            <Text style={styles.containerText}>Latitude</Text>
        <Text style={styles.containerValue}>{this.state.latitude.toFixed(2)}</Text>
                        </View>
                        <View style={[styles.dashboardContent, styles.secondBox]}>
                            <MaterialIcons name="location-on" style={{ fontSize: 50, color: '#333' }} />
                            <Text style={styles.containerText}>Latitude</Text>
        <Text style={styles.containerValue}>{this.state.longitude.toFixed(2)}</Text>
                        </View>
                    
                    </View>
                    <View>
                        {/* <MapView
                            initialRegion={{
                                latitude: 37.78825,
                                longitude: -122.4324,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,
                            }}
                        /> */}
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 30,
        paddingLeft: 20,
        paddingRight: 20,
    },
    geoText: {
        fontWeight: 'bold',
        color: 'rgb(217, 150, 177)',
        fontSize: 30,
        marginTop: 20
    },
    dashboardContentContainer: {
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row',
        marginTop: 50
    },
    dashboardContent: {
        height: 220,
        width: width / 2 - 30,
        backgroundColor: 'cornflowerblue',
        borderRadius: 30,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    secondBox: {
        marginLeft: 20,
        backgroundColor: 'rgb(217, 150, 177)'
    },
    containerText: { color: '#fff', fontWeight: 'bold', marginTop: 10 },
    containerValue: { color: '#fff', fontSize: 12 }
})