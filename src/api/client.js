// ==================== عميل API ====================
const LOCAL_URL = 'http://127.0.0.1:5000/api/execute';
const CLOUD_URL = 'https://eliot1server.pythonanywhere.com/api/execute';

// غيّر إلى false للعودة للسحابة
const USE_LOCAL = true;

const API_URL = USE_LOCAL ? LOCAL_URL : CLOUD_URL;

export async function executeCommand(command, timeout = 120) {
  try {
    const response = await fetch(API_URL, {
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
