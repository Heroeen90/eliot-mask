// ==================== عميل API ====================
const LOCAL_URL = 'http://192.168.9.10:5000/api/execute';
const CLOUD_URL = 'https://eliot1server.pythonanywhere.com/api/execute';

// اقرأ وضع الخادم من localStorage (افتراضي: سحابي)
function getServerMode() {
  try {
    return localStorage.getItem('eliot_server_mode') || 'cloud';
  } catch { return 'cloud'; }
}

function setServerMode(mode) {
  localStorage.setItem('eliot_server_mode', mode);
}

function getApiUrl() {
  return getServerMode() === 'local' ? LOCAL_URL : CLOUD_URL;
}

export async function executeCommand(command, timeout = 60) {
  const apiUrl = getApiUrl();
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ command, timeout }),
    });
    const data = await response.json();
    return {
      success: data.success ?? true,
      output: data.output || data.error || 'No output',
      error: data.error || null,
    };
  } catch (err) {
    return { success: false, output: '', error: 'Failed to connect: ' + err.message };
  }
}

export function isLocalMode() { return getServerMode() === 'local'; }
export function toggleServerMode() {
  const newMode = getServerMode() === 'local' ? 'cloud' : 'local';
  setServerMode(newMode);
  return newMode;
}
export { getServerMode };
