import React from 'react';

import {Location, Permissions} from 'expo';

export const _getLocation = async () => {
    const {status} = await Permissions.askAsync(Permissions.LOCATION)
    if(status !== 'granted'){
        alert('You must have location enabled, to gain credit for the post')
        return false
    } else {
        const location = await Location.getCurrentPositionAsync();
       
        return !location.cancelled ?  location: null
    }
}
