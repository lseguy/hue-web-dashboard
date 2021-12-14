import config from './config'

async function setLightState(lightId, on) {
    const response = await fetch(`http://${config.bridgeIP}/api/${config.apiUser}/lights/${lightId}/state`, {
        method: 'PUT',
        body: JSON.stringify({on}),
    });
    return await response.json();
}

export default {
    async switchOnLight(lightId) {
        return await setLightState(lightId, true);
    },
    async switchOffLight(lightId) {
        return await setLightState(lightId, false);
    },
    async getLightInfo(lightId) {
        const response = await fetch(`http://${config.bridgeIP}/api/${config.apiUser}/lights/${lightId}`);
        return await response.json();
    },
    async getLights() {
        const response = await fetch(`http://${config.bridgeIP}/api/${config.apiUser}/lights`);
        return await response.json();
    }
}