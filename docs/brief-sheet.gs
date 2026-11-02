/**
 * ACE Impact 需求單 → Google 試算表
 *
 * 設定方式（約 5 分鐘）：
 * 1. 新增一份 Google 試算表（名稱隨意，例如「ACE Impact 需求單」）。
 * 2. 選單「擴充功能」→「Apps Script」，把預設內容全部刪掉，貼上這整份程式，按存檔。
 * 3. 右上角「部署」→「新增部署作業」→ 類型選「網頁應用程式」：
 *      執行身分：我　／　誰可以存取：所有人
 *    按「部署」，依畫面授權（會要求寄信與編輯試算表的權限）。
 * 4. 複製「網頁應用程式網址」（https://script.google.com/macros/s/…/exec），
 *    貼到 app/brief/brief-data.ts 的 FORM_ENDPOINT。
 * 之後改程式，要在「部署」→「管理部署作業」→ 編輯 → 新版本，網址才會生效。
 */

const NOTIFY_EMAIL = 'info@luxkey.com.tw'; // 有新需求單時通知這個信箱；留空就不寄
const SHEET_NAME = '需求單';
const HEADERS = ['時間', '品牌／公司', '聯絡人', 'LINE ID 或手機', 'Email', '想做的影片', '合作期間', '每月支數', '雙 11 活動', '商品或服務', '需求單全文', '處理狀態'];

function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    const data = JSON.parse(e.postData.contents);
    if (data.hp) return out_({ ok: true }); // 機器人填了隱藏欄位：假裝成功，不記錄
    const f = data.fields || {};
    const text = String(data.text || '').slice(0, 20000);
    if (!f.brand || !f.contact || !text) return out_({ ok: false, error: 'missing' });

    lock.waitLock(10000);
    sheet_().appendRow([
      new Date(), cell_(f.brand), cell_(f.name), cell_(f.contact), cell_(f.email),
      cell_(f.plans), cell_(f.term), cell_(f.qty), cell_(f.promo), cell_(f.product), cell_(text), '新單',
    ]);
    lock.releaseLock();

    if (NOTIFY_EMAIL) {
      try { MailApp.sendEmail(NOTIFY_EMAIL, '新需求單｜' + f.brand, text); } catch (err) { /* 寄信失敗不影響已記錄的資料 */ }
    }
    return out_({ ok: true });
  } catch (err) {
    return out_({ ok: false });
  } finally {
    try { lock.releaseLock(); } catch (err) { /* 已釋放 */ }
  }
}

function doGet() { return out_({ ok: true, service: 'ace-brief' }); }

function sheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) {
    sh = ss.insertSheet(SHEET_NAME);
    sh.appendRow(HEADERS);
    sh.setFrozenRows(1);
    sh.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
    sh.setColumnWidth(11, 420);
  }
  return sh;
}

/** 陣列轉文字；開頭是 = + - @ 的字串加單引號，避免被當成公式執行。 */
function cell_(x) {
  const s = Array.isArray(x) ? x.join('、') : String(x == null ? '' : x);
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function out_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
