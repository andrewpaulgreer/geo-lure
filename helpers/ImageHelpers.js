import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'
import {Platform} from 'react-native'

export const openImageLibrary = async () => {
    const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL, Permissions.LOCATION)
    if(status !== 'granted'){
        alert('camera roll permissions needed to select an image')
        return false
    } else {
        const result= await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1,1],
            base64: true,
            allowsMultipleSelection: true
        })
       
            // console.log('response: ', response);
            // console.log('response latitude: ', response.latitude);
            // console.log('response longitude: ', response.longitude);

        return !result.cancelled ?  result : false
    }
}

export const openCamera = async () => {
    const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL, Permissions.CAMERA, Permissions.LOCATION)
    if(status !== 'granted'){
        alert('camera and camera roll permissions needed to select an image')
        return false
    } else {
        const result= await ImagePicker.launchCameraAsync({
            quality: 0.1,
            allowsEditing: Platform.OS == 'ios'? false : true,
            aspect: [4,3],
            base64: true,
        })
        
       
        return !result.cancelled ?  result : false
    }
}



    export const prepareBlob = async imageUri => {
        const blob = await new Promise((resolve, reject) => {
            // make request
            const xml = new XMLHttpRequest()

            // seuccess resolved
            xml.onload = function () {
                resolve(xml.response)
            }

            //error
            xml.onerror = function(e){
                console.log(e)
                reject (new TypeError('image upload failed'))
            }

            //set resdponse type to blob
            xml.responseType = 'blob'
            xml.open('GET', imageUri, true)
            //send request
            xml.send()
        })
        return blob
    }
