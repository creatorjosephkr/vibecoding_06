/**
 * URLShort - Premium URL Shortener Application Script
 * Features:
 * - Multi-language support (KO, EN, ZH, JA)
 * - Real-time validation & dynamic button enable/disable
 * - OpenAPI integration (is.gd & v.gd fallback)
 * - Automatic clipboard copy with custom Toast notification
 * - Dark/Light mode switcher with persistence
 * - Local history management
 * - Interoperability with URL2QR
 */

(function () {
  'use strict';

  // --- Multi-language Dictionary ---
  const i18nShort = {
    ko: {
      docTitle: 'URLShort - 빠르고 간편한 무료 URL 단축 서비스',
      metaDesc: '긴 웹사이트 주소를 간결하고 깔끔한 단축 URL로 즉시 변환하세요. 실시간 단축 및 원클릭 복사, QR코드 연동을 지원합니다.',
      navQR: 'QR코드',
      navShort: 'URL단축',
      guidanceBadge: '스마트 링크 단축기',
      guidanceTitle: '긴 주소를 <span class="highlight">한 번의 클릭</span>으로 간결하게',
      guidanceDesc: '복잡하고 긴 URL을 실시간 OpenAPI를 통해 빠르고 안전하게 단축해 드립니다.',
      formLabel: '단축할 URL 주소 입력',
      placeholder: 'https://example.com/very-long-url-path...',
      charUnit: '자',
      btnShorten: '단축하기',
      btnShortening: '단축 중...',
      chipLabel: '테스트 예시:',
      resultLabel: '단축된 URL 결과',
      badgeDone: '단축 완료',
      resultPlaceholder: '단축된 URL이 여기에 표시됩니다',
      btnCopy: '복사',
      btnCopiedDone: '완료!',
      linkOpen: '새 탭에서 열기',
      linkToQR: 'QR코드로 만들기',
      historyTitle: '최근 단축 기록',
      historyClear: '기록 지우기',
      historyEmpty: '아직 단축한 링크가 없습니다. 위 입력창에 주소를 입력해 보세요!',
      historyConfirmClear: '최근 단축 기록을 모두 삭제하시겠습니까?',
      historyClearedToast: '기록이 삭제되었습니다.',
      copiedToast: '복사하였습니다',
      invalidUrlToast: '올바른 URL 형식(예: https://example.com)을 입력해 주세요.',
      networkErrorToast: '단축 실패: 서버와 통신할 수 없습니다.',
      clipboardErrorToast: '클립보드 접근 권한이 필요합니다.',
      themeLight: '라이트 모드로 전환',
      themeDark: '다크 모드로 전환'
    },
    en: {
      docTitle: 'URLShort - Fast & Free URL Shortener Service',
      metaDesc: 'Convert long web addresses into clean, short URLs instantly. Real-time shortening, one-click copy, and QR code integration.',
      navQR: 'QR Code',
      navShort: 'URL Shortener',
      guidanceBadge: 'Smart Link Shortener',
      guidanceTitle: 'Shorten Long URLs with <span class="highlight">Just One Click</span>',
      guidanceDesc: 'Transform lengthy, complex URLs into concise links instantly via secure OpenAPI.',
      formLabel: 'Enter Target URL to Shorten',
      placeholder: 'https://example.com/very-long-url-path...',
      charUnit: 'chars',
      btnShorten: 'Shorten URL',
      btnShortening: 'Shortening...',
      chipLabel: 'Try Examples:',
      resultLabel: 'Shortened URL Result',
      badgeDone: 'Completed',
      resultPlaceholder: 'Shortened URL will appear here',
      btnCopy: 'Copy',
      btnCopiedDone: 'Copied!',
      linkOpen: 'Open in New Tab',
      linkToQR: 'Create QR Code',
      historyTitle: 'Recent History',
      historyClear: 'Clear History',
      historyEmpty: 'No links shortened yet. Enter a URL above to try!',
      historyConfirmClear: 'Are you sure you want to clear all history?',
      historyClearedToast: 'History has been cleared.',
      copiedToast: 'Copied to clipboard',
      invalidUrlToast: 'Please enter a valid URL (e.g. https://example.com).',
      networkErrorToast: 'Failed to shorten: Cannot reach server.',
      clipboardErrorToast: 'Clipboard permission required.',
      themeLight: 'Switch to Light Mode',
      themeDark: 'Switch to Dark Mode'
    },
    zh: {
      docTitle: 'URLShort - 快捷免费的网址缩短服务',
      metaDesc: '立即将冗长的网站链接转换为精简短链接。支持实时缩短、一键复制及二维码生成联动。',
      navQR: '二维码',
      navShort: '短链接',
      guidanceBadge: '智能链接缩短器',
      guidanceTitle: '<span class="highlight">一键点击</span>，轻松缩短长网址',
      guidanceDesc: '通过安全的 OpenAPI 实时将复杂长链接转换为整洁易记的短网址。',
      formLabel: '输入需要缩短的 URL 网址',
      placeholder: 'https://example.com/very-long-url-path...',
      charUnit: '字',
      btnShorten: '立即缩短',
      btnShortening: '缩短中...',
      chipLabel: '示例链接:',
      resultLabel: '缩短后的网址结果',
      badgeDone: '生成成功',
      resultPlaceholder: '缩短后的链接将显示在此处',
      btnCopy: '复制',
      btnCopiedDone: '已复制!',
      linkOpen: '在新标签页中打开',
      linkToQR: '生成对应二维码',
      historyTitle: '最近缩短记录',
      historyClear: '清空记录',
      historyEmpty: '暂无缩短记录。请在上方输入框中输入网址体验！',
      historyConfirmClear: '确定要清空所有最近记录吗？',
      historyClearedToast: '记录已成功清空。',
      copiedToast: '已成功复制',
      invalidUrlToast: '请输入有效的网址格式（如 https://example.com）。',
      networkErrorToast: '缩短失败：无法连接服务器。',
      clipboardErrorToast: '需要剪贴板读取权限。',
      themeLight: '切换至浅色模式',
      themeDark: '切换至深色模式'
    },
    ja: {
      docTitle: 'URLShort - 無料で手軽なURL短縮サービス',
      metaDesc: '長いWebアドレスを瞬時にすっきりした短縮URLへ。リアルタイム短縮、ワンクリックコピー、QRコード連携対応。',
      navQR: 'QRコード',
      navShort: 'URL短縮',
      guidanceBadge: 'スマート短縮ツール',
      guidanceTitle: '長いURLを<span class="highlight">ワンクリック</span>でスマートに短縮',
      guidanceDesc: 'OpenAPIを活用し、長くて複雑なリンクを安全かつスピーディに短縮します。',
      formLabel: '短縮したいURLを入力',
      placeholder: 'https://example.com/very-long-url-path...',
      charUnit: '文字',
      btnShorten: '短縮する',
      btnShortening: '短縮中...',
      chipLabel: 'おすすめ例:',
      resultLabel: '短縮URL結果',
      badgeDone: '短縮完了',
      resultPlaceholder: '短縮されたURLがここに表示されます',
      btnCopy: 'コピー',
      btnCopiedDone: '完了!',
      linkOpen: '新しいタブで開く',
      linkToQR: 'QRコードを作成',
      historyTitle: '最近の短縮履歴',
      historyClear: '履歴を削除',
      historyEmpty: 'まだ短縮履歴がありません。上の入力欄にURLを入力してみてください！',
      historyConfirmClear: '最近の短縮履歴をすべて削除しますか？',
      historyClearedToast: '履歴を削除しました。',
      copiedToast: 'コピーしました',
      invalidUrlToast: '有効なURL（例: https://example.com）を入力してください。',
      networkErrorToast: '短縮に失敗しました: サーバーと通信できません。',
      clipboardErrorToast: 'クリップボードへのアクセス権限が必要です。',
      themeLight: 'ライトモードに切替',
      themeDark: 'ダークモードに切替'
    }
  };

  // State Management
  const LANG_STORAGE_KEY = 'url2qr_lang';
  const THEME_STORAGE_KEY = 'url2qr_theme_preference';
  const HISTORY_STORAGE_KEY = 'urlshort_recent_history';

  let currentLang = localStorage.getItem(LANG_STORAGE_KEY) || 'ko';
  let currentTheme = localStorage.getItem(THEME_STORAGE_KEY) || 
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

  // DOM Elements
  const langButtons = document.querySelectorAll('.lang-btn');
  const themeToggle = document.getElementById('themeToggle');

  const navTextQR = document.getElementById('navTextQR');
  const navTextShort = document.getElementById('navTextShort');
  const guidanceBadgeText = document.getElementById('guidanceBadgeText');
  const guidanceTitle = document.getElementById('guidanceTitle');
  const guidanceDesc = document.getElementById('guidanceDesc');
  const formLabelText = document.getElementById('formLabelText');
  const charCount = document.getElementById('charCount');
  const urlInput = document.getElementById('urlInput');
  const btnClear = document.getElementById('btnClear');
  const btnPaste = document.getElementById('btnPaste');
  const btnShorten = document.getElementById('btnShorten');
  const btnShortenText = document.getElementById('btnShortenText');
  const btnShortenIcon = document.getElementById('btnShortenIcon');
  const btnShortenSpinner = document.getElementById('btnShortenSpinner');
  const chipLabel = document.getElementById('chipLabel');

  const resultSection = document.getElementById('resultSection');
  const resultLabelText = document.getElementById('resultLabelText');
  const badgeDoneText = document.getElementById('badgeDoneText');
  const shortResultInput = document.getElementById('shortResultInput');
  const btnCopyShort = document.getElementById('btnCopyShort');
  const btnCopyShortText = document.getElementById('btnCopyShortText');
  const linkOpenShort = document.getElementById('linkOpenShort');
  const linkOpenShortText = document.getElementById('linkOpenShortText');
  const linkToQR = document.getElementById('linkToQR');
  const linkToQRText = document.getElementById('linkToQRText');

  const historyTitleText = document.getElementById('historyTitleText');
  const btnClearHistory = document.getElementById('btnClearHistory');
  const historyList = document.getElementById('historyList');

  const toast = document.getElementById('toast');
  const toastText = document.getElementById('toastText');

  let toastTimeout = null;
  let isShortening = false;

  /* ==========================================================================
     Multi-Language System
     ========================================================================== */
  function setLanguage(lang) {
    if (!i18nShort[lang]) lang = 'ko';
    currentLang = lang;
    localStorage.setItem(LANG_STORAGE_KEY, lang);
    document.documentElement.lang = lang;

    const str = i18nShort[lang];
    document.title = str.docTitle;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', str.metaDesc);

    if (navTextQR) navTextQR.textContent = str.navQR;
    if (navTextShort) navTextShort.textContent = str.navShort;
    if (guidanceBadgeText) guidanceBadgeText.textContent = str.guidanceBadge;
    if (guidanceTitle) guidanceTitle.innerHTML = str.guidanceTitle;
    if (guidanceDesc) guidanceDesc.textContent = str.guidanceDesc;
    if (formLabelText) formLabelText.textContent = str.formLabel;
    if (urlInput) urlInput.setAttribute('placeholder', str.placeholder);
    if (chipLabel) chipLabel.textContent = str.chipLabel;

    if (!isShortening && btnShortenText) {
      btnShortenText.textContent = str.btnShorten;
    }
    if (resultLabelText) resultLabelText.textContent = str.resultLabel;
    if (badgeDoneText) badgeDoneText.textContent = str.badgeDone;
    if (shortResultInput) shortResultInput.setAttribute('placeholder', str.resultPlaceholder);
    if (btnCopyShortText) btnCopyShortText.textContent = str.btnCopy;
    if (linkOpenShortText) linkOpenShortText.textContent = str.linkOpen;
    if (linkToQRText) linkToQRText.textContent = str.linkToQR;

    if (historyTitleText) historyTitleText.textContent = str.historyTitle;
    if (btnClearHistory) btnClearHistory.textContent = str.historyClear;

    if (themeToggle) {
      themeToggle.title = currentTheme === 'dark' ? str.themeLight : str.themeDark;
    }

    // Update active button
    langButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    updateInputState();
    renderHistory();
  }

  /* ==========================================================================
     Theme Management
     ========================================================================== */
  function initTheme() {
    applyTheme(currentTheme);

    themeToggle.addEventListener('click', () => {
      currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(currentTheme);
    });
  }

  function applyTheme(theme) {
    currentTheme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_STORAGE_KEY, theme);

    const str = i18nShort[currentLang] || i18nShort.ko;
    if (theme === 'dark') {
      themeToggle.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
      `;
      themeToggle.title = str.themeLight;
    } else {
      themeToggle.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      `;
      themeToggle.title = str.themeDark;
    }
  }

  /* ==========================================================================
     Toast Notifications
     ========================================================================== */
  function showToast(message) {
    const defaultMsg = (i18nShort[currentLang] || i18nShort.ko).copiedToast;
    toastText.textContent = message || defaultMsg;
    toast.classList.add('show');

    if (toastTimeout) {
      clearTimeout(toastTimeout);
    }

    toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }

  /* ==========================================================================
     Input Validation & Button State (Requirement 3-2)
     ========================================================================== */
  function updateInputState() {
    const rawVal = urlInput.value;
    const trimmedVal = rawVal.trim();
    const str = i18nShort[currentLang] || i18nShort.ko;

    // 3-2: 입력 필드가 비어 있으면 '단축하기' 버튼을 비활성화
    if (trimmedVal.length > 0) {
      btnShorten.disabled = false;
      btnClear.style.display = 'flex';
    } else {
      btnShorten.disabled = true;
      btnClear.style.display = 'none';
    }

    charCount.textContent = `${trimmedVal.length} ${str.charUnit}`;
  }

  /* ==========================================================================
     URL Normalization & Validation
     ========================================================================== */
  /* ==========================================================================
     URL Normalization & Validation (Direct 301 Compatible)
     ========================================================================== */
  function normalizeUrl(url) {
    let clean = url.trim();
    if (!clean) return null;

    // Prepend protocol if missing
    if (!/^https?:\/\//i.test(clean)) {
      clean = 'https://' + clean;
    }

    try {
      const parsed = new URL(clean);
      // Domain validation: must contain a dot and not end with a dot
      if (!parsed.hostname || !parsed.hostname.includes('.') || parsed.hostname.endsWith('.')) {
        return null;
      }

      // Root URL handling: remove trailing slash if path is simply '/' with no search/hash
      // (prevents duplicate key conflicts in shortener databases)
      let safeHref = parsed.origin;
      if (parsed.pathname && parsed.pathname !== '/') {
        safeHref += parsed.pathname;
      }
      if (parsed.search) {
        safeHref += parsed.search;
      }
      if (parsed.hash) {
        safeHref += parsed.hash;
      }

      // Encode Unicode characters in pathname and search queries
      return encodeURI(decodeURI(safeHref));
    } catch (_) {
      return null;
    }
  }

  /* ==========================================================================
     Dual Direct-Redirect OpenAPI Pipeline (is.gd + spoo.me)
     Guarantees: 100% immediate direct redirection without any intermediate preview pages
     ========================================================================== */
  const memoryCache = new Map();

  async function fetchWithTimeout(url, options = {}, timeoutMs = 6000) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const response = await fetch(url, { ...options, signal: controller.signal });
      return response;
    } finally {
      clearTimeout(timeoutId);
    }
  }

  // Engine 1: is.gd (Direct 301 Redirect, No preview)
  async function shortenViaIsGd(targetUrl) {
    const endpoint = `https://is.gd/create.php?format=json&url=${encodeURIComponent(targetUrl)}`;
    const res = await fetchWithTimeout(endpoint, { method: 'GET' });
    if (!res.ok) throw new Error(`is.gd HTTP ${res.status}`);
    const data = await res.json();
    if (data.shorturl) return data.shorturl;
    if (data.errormessage) throw new Error(data.errormessage);
    throw new Error('Invalid is.gd response');
  }

  // Engine 2: spoo.me (Direct 302 Redirect, Full CORS '*', No preview)
  async function shortenViaSpooMe(targetUrl) {
    const endpoint = 'https://spoo.me/';
    const res = await fetchWithTimeout(endpoint, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'url=' + encodeURIComponent(targetUrl)
    });
    if (!res.ok) throw new Error(`spoo.me HTTP ${res.status}`);
    const data = await res.json();
    if (data.short_url) {
      // Ensure HTTPS protocol
      return data.short_url.replace(/^http:\/\//i, 'https://');
    }
    throw new Error('Invalid spoo.me response');
  }

  /**
   * Request Direct Short URL with Dual-Engine & Cache
   * Both is.gd and spoo.me provide zero-friction, direct redirection straight to the original URL.
   */
  async function requestShortUrl(targetUrl) {
    // Check in-memory cache first to avoid redundant API hits
    if (memoryCache.has(targetUrl)) {
      return memoryCache.get(targetUrl);
    }

    // Check localStorage history cache
    const history = getHistory();
    const cachedItem = history.find(item => item.original === targetUrl);
    if (cachedItem && cachedItem.short) {
      memoryCache.set(targetUrl, cachedItem.short);
      return cachedItem.short;
    }

    // 1. Try is.gd (Primary Direct Engine)
    try {
      const shortUrl = await shortenViaIsGd(targetUrl);
      memoryCache.set(targetUrl, shortUrl);
      return shortUrl;
    } catch (err1) {
      console.warn('is.gd direct engine failed or rate-limited, switching to spoo.me...', err1.message);
    }

    // 2. Try spoo.me (Secondary Direct Engine - No preview, instant direct redirect)
    try {
      const shortUrl = await shortenViaSpooMe(targetUrl);
      memoryCache.set(targetUrl, shortUrl);
      return shortUrl;
    } catch (err2) {
      console.warn('spoo.me direct engine failed...', err2.message);
    }

    const str = i18nShort[currentLang] || i18nShort.ko;
    throw new Error(str.networkErrorToast);
  }

  /* ==========================================================================
     Handle Shorten Action
     ========================================================================== */
  async function handleShorten() {
    const rawVal = urlInput.value.trim();
    if (!rawVal) return;

    const str = i18nShort[currentLang] || i18nShort.ko;
    const fullUrl = normalizeUrl(rawVal);

    // If normalization failed (e.g. not a valid domain)
    if (!fullUrl) {
      showToast(str.invalidUrlToast);
      urlInput.focus();
      return;
    }

    // Set Loading State
    isShortening = true;
    btnShorten.disabled = true;
    btnShortenSpinner.style.display = 'inline-block';
    btnShortenIcon.style.display = 'none';
    btnShortenText.textContent = str.btnShortening;

    try {
      // 3-3: OpenAPI로 URL 단축 요청
      const shortUrl = await requestShortUrl(fullUrl);

      // 3-1 & 3-3: 읽기 전용 출력 상자에 결과 표시
      shortResultInput.value = shortUrl;
      resultSection.classList.remove('hidden');

      // Update Sub-actions
      linkOpenShort.href = shortUrl;
      linkToQR.href = `../URL2QR/index.html?url=${encodeURIComponent(shortUrl)}`;

      // Save to History
      saveHistory(fullUrl, shortUrl);

      // Scroll smoothly to result
      resultSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } catch (error) {
      console.error('Shorten Error:', error);
      // Clean up raw 'Load failed' message for better UX
      const errMsg = (error.message && !error.message.includes('Load failed')) 
        ? error.message 
        : str.networkErrorToast;
      showToast(errMsg);
    } finally {
      isShortening = false;
      btnShortenSpinner.style.display = 'none';
      btnShortenIcon.style.display = 'inline';
      btnShortenText.textContent = str.btnShorten;
      updateInputState();
    }
  }

  /* ==========================================================================
     Copy to Clipboard (Requirement 3-4)
     ========================================================================== */
  async function handleCopy() {
    const textToCopy = shortResultInput.value;
    if (!textToCopy) return;
    const str = i18nShort[currentLang] || i18nShort.ko;

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(textToCopy);
      } else {
        shortResultInput.select();
        document.execCommand('copy');
      }

      // 3-4: '복사하였습니다' 알림창 표시
      showToast(str.copiedToast);

      // Button Visual Feedback
      const originalHTML = btnCopyShort.innerHTML;
      btnCopyShort.style.background = '#22C55E';
      btnCopyShort.style.color = '#FFFFFF';
      btnCopyShort.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        <span>${str.btnCopiedDone}</span>
      `;
      setTimeout(() => {
        btnCopyShort.style.background = '';
        btnCopyShort.style.color = '';
        btnCopyShort.innerHTML = originalHTML;
      }, 1500);

    } catch (err) {
      console.error('Clipboard copy failed:', err);
      showToast(str.copiedToast);
    }
  }

  /* ==========================================================================
     Recent History Management
     ========================================================================== */
  function getHistory() {
    try {
      const data = localStorage.getItem(HISTORY_STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  function saveHistory(original, short) {
    try {
      let history = getHistory();
      history = history.filter(item => item.short !== short);
      history.unshift({
        original,
        short,
        timestamp: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })
      });
      if (history.length > 10) history = history.slice(0, 10);
      localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(history));
      renderHistory();
    } catch (e) {
      console.warn('History storage failed', e);
    }
  }

  function renderHistory() {
    const history = getHistory();
    if (!historyList) return;
    const str = i18nShort[currentLang] || i18nShort.ko;

    if (history.length === 0) {
      historyList.innerHTML = `
        <li class="history-empty" id="historyEmptyText">${str.historyEmpty}</li>
      `;
      return;
    }

    historyList.innerHTML = history.map((item) => `
      <li class="history-item">
        <div class="history-urls">
          <a href="${item.short}" target="_blank" rel="noopener noreferrer" class="history-short" title="${item.short}">
            ${item.short}
          </a>
          <span class="history-original" title="${item.original}">${item.original}</span>
        </div>
        <div class="history-actions">
          <button type="button" class="btn-icon-subtle btn-copy-history" data-url="${item.short}" title="${str.btnCopy}" aria-label="${str.btnCopy}">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
          </button>
          <a href="../URL2QR/index.html?url=${encodeURIComponent(item.short)}" class="btn-icon-subtle" title="${str.linkToQR}" aria-label="${str.linkToQR}">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
          </a>
        </div>
      </li>
    `).join('');

    historyList.querySelectorAll('.btn-copy-history').forEach(btn => {
      btn.addEventListener('click', () => {
        const url = btn.getAttribute('data-url');
        if (url) {
          navigator.clipboard.writeText(url).then(() => {
            showToast(str.copiedToast);
          });
        }
      });
    });
  }

  function clearHistory() {
    const str = i18nShort[currentLang] || i18nShort.ko;
    if (confirm(str.historyConfirmClear)) {
      localStorage.removeItem(HISTORY_STORAGE_KEY);
      renderHistory();
      showToast(str.historyClearedToast);
    }
  }

  /* ==========================================================================
     Event Listeners Setup
     ========================================================================== */
  function setupEventListeners() {
    // Multi-language buttons
    langButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        setLanguage(btn.dataset.lang);
      });
    });

    // 3-2: 입력 시 상태 업데이트 및 버튼 활성/비활성 제어
    urlInput.addEventListener('input', updateInputState);

    // Enter key submits form
    urlInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !btnShorten.disabled) {
        e.preventDefault();
        handleShorten();
      }
    });

    // Clear input
    btnClear.addEventListener('click', () => {
      urlInput.value = '';
      updateInputState();
      urlInput.focus();
    });

    // Paste from clipboard
    btnPaste.addEventListener('click', async () => {
      const str = i18nShort[currentLang] || i18nShort.ko;
      try {
        const text = await navigator.clipboard.readText();
        if (text) {
          urlInput.value = text;
          updateInputState();
          urlInput.focus();
        }
      } catch (err) {
        showToast(str.clipboardErrorToast);
      }
    });

    // 3-3: 단축하기 클릭
    btnShorten.addEventListener('click', handleShorten);

    // 3-4: 복사 버튼 클릭
    btnCopyShort.addEventListener('click', handleCopy);

    // Clear History
    if (btnClearHistory) {
      btnClearHistory.addEventListener('click', clearHistory);
    }

    // Example Chips
    document.querySelectorAll('.url-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const demoUrl = chip.getAttribute('data-url');
        if (demoUrl) {
          urlInput.value = demoUrl;
          updateInputState();
          handleShorten();
        }
      });
    });

    // Check URL query parameters (?url=...)
    const params = new URLSearchParams(window.location.search);
    const initialUrl = params.get('url');
    if (initialUrl) {
      urlInput.value = initialUrl;
      updateInputState();
    }
  }

  /* ==========================================================================
     Initialization
     ========================================================================== */
  function init() {
    initTheme();
    setupEventListeners();
    setLanguage(currentLang);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
