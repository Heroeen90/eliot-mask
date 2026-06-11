// ==================== عميل API ====================
// استبدل هذا بعنوان خادمك الحقيقي عند النشر

const API_URL = 'https://eliot1server.pythonanywhere.com/api/execute';

/**
 * تنفيذ أمر على الخادم الخلفي
 * @param {string} command - الأمر الكامل
 * @param {number} timeout - المهلة بالثواني
 * @returns {Promise<{output: string, success: boolean, error?: string}>}
 */
export async function executeCommand(command, timeout = 120) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), (timeout + 10) * 1000);

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        command,
        timeout,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        output: '',
        error: errorData.error || `خطأ ${response.status}: ${response.statusText}`,
      };
    }

    const data = await response.json();
    return {
      success: data.success ?? true,
      output: data.output || '',
      error: data.error || null,
    };

  } catch (err) {
    if (err.name === 'AbortError') {
      return {
        success: false,
        output: '',
        error: '⏱️ انتهت مهلة الاتصال بالخادم',
      };
    }
    return {
      success: false,
      output: '',
      error: `❌ فشل الاتصال بالخادم: ${err.message}`,
    };
  }
}

/**
 * اختبار اتصال الخادم
 * @returns {Promise<boolean>}
 */
export async function checkServerStatus() {
  try {
    const response = await fetch(API_URL.replace('/api/execute', '/'), {
      method: 'GET',
      signal: AbortSignal.timeout(5000),
    });
    return response.ok;
  } catch {
    return false;
  }
}
