import config from '../config'

const BASE_URL = `http://${config.bridgeIP}/api/${config.apiUser}`;

async function apiCall(path, options) {
    const response = await fetch(`${BASE_URL}${path}`, options);
    const json = await response.json();

    // The Hue API returns 200 even if there is an error
    if (json[0] && json[0].error) {
        throw new Error('API request failed');
    }
    
    return json;
}

async function setLightState(lightId, on) {
    await apiCall(`/lights/${lightId}/state`, {
        method: 'PUT',
        body: JSON.stringify({on}),
    });
}

export default {
    async switchOnLight(lightId) {
        return await setLightState(lightId, true);
    },
    async switchOffLight(lightId) {
        return await setLightState(lightId, false);
    },
    async getLightInfo(lightId) {
        return await apiCall(`/lights/${lightId}`);
    },
    async getLights() {
        return await apiCall(`/lights`);
    },
}