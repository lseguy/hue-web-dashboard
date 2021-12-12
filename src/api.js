import config from './config'

async function setLightState(lightId, on) {
    const response = await fetch(`http://${config.bridgeIP}/api/${config.apiUser}/lights/${lightId}/state`, {
        method: 'PUT',
        body: JSON.stringify({on}),
    });
    return await response.json();
}

export async function switchOnLight(lightId) {
    return await setLightState(lightId, true);
}

export async function switchOffLight(lightId) {
    return await setLightState(lightId, false);
}

export async function getLightInfo(lightId) {
    const response = await fetch(`http://${config.bridgeIP}/api/${config.apiUser}/lights/${lightId}`);
    return await response.json();
}

export async function getLights() {
    const response = await fetch(`http://${config.bridgeIP}/api/${config.apiUser}/lights`);
    return await response.json();
}