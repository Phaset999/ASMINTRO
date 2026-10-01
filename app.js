/**
 * ระบบรับสมัครนักศึกษาใหม่ มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าพระนครเหนือ (มจพ.)
 * เขียนด้วย Pure Vanilla JavaScript (ไม่ใช้ Framework หรือ Library ใดๆ)
 */

// ข้อมูลวิทยาเขต คณะ และสาขาวิชาของ มจพ. แบบครบถ้วน
const KMUTNB_DATA = {
  campuses: [
    {
      id: "bkk",
      name: "วิทยาเขตกรุงเทพมหานคร (มจพ. กรุงเทพฯ)",
      faculties: [
        {
          name: "คณะวิศวกรรมศาสตร์",
          majors: [
            "วิศวกรรมเครื่องกลและการบิน-อวกาศ",
            "วิศวกรรมไฟฟ้าและคอมพิวเตอร์",
            "วิศวกรรมเคมี",
            "วิศวกรรมโยธา",
            "วิศวกรรมการผลิตและหุ่นยนต์",
            "วิศวกรรมวัสดุและการบิน"
          ]
        },
        {
          name: "วิทยาลัยเทคโนโลยีอุตสาหกรรม (วทอ.)",
          majors: [
            "เทคโนโลยีวิศวกรรมอิเล็กทรอนิกส์กำลัง",
            "เทคโนโลยีวิศวกรรมการเชื่อม",
            "เทคโนโลยีวิศวกรรมยานยนต์",
            "เทคโนโลยีวิศวกรรมแมคคาทรอนิกส์",
            "เทคโนโลยีวิศวกรรมซ่อมบำรุงอากาศยาน"
          ]
        },
        {
          name: "คณะวิทยาศาสตร์ประยุกต์",
          majors: [
            "วิทยาการคอมพิวเตอร์ (CS)",
            "สถิติประยุกต์และการวิเคราะห์ข้อมูล",
            "เคมีอุตสาหกรรม",
            "ฟิสิกส์อุตสาหกรรมและอุปกรณ์การแพทย์",
            "เทคโนโลยีชีวภาพ"
          ]
        },
        {
          name: "คณะเทคโนโลยีสารสนเทศและนวัตกรรมดิจิทัล",
          majors: [
            "เทคโนโลยีสารสนเทศ (IT)",
            "วิทยาการข้อมูลและปัญญาประดิษฐ์ (AI)",
            "ความมั่นคงไซเบอร์ (Cybersecurity)"
          ]
        }
      ]
    },
    {
      id: "prachin",
      name: "วิทยาเขตปราจีนบุรี",
      faculties: [
        {
          name: "คณะเทคโนโลยีและการจัดการอุตสาหกรรม (FITM)",
          majors: [
            "วิศวกรรมสารสนเทศและเครือข่าย (INET)",
            "เทคโนโลยีสารสนเทศ (IT)",
            "การจัดการอุตสาหกรรม (IM)",
            "เทคโนโลยีเครื่องจักรกลเกษตร (AMT)",
            "คอมพิวเตอร์ช่วยออกแบบและบริหารงานก่อสร้าง (CA)"
          ]
        },
        {
          name: "คณะบริหารธุรกิจและอุตสาหกรรมบริการ (BAS)",
          majors: [
            "การจัดการนวัตกรรมธุรกิจและการพาณิชย์",
            "การจัดการท่องเที่ยวและบริการสุขภาพ"
          ]
        },
        {
          name: "คณะอุตสาหกรรมเกษตร",
          majors: [
            "วิทยาศาสตร์การอาหารและโภชนาการ",
            "นวัตกรรมการแปรรูปอาหาร"
          ]
        }
      ]
    },
    {
      id: "rayong",
      name: "วิทยาเขตระยอง",
      faculties: [
        {
          name: "คณะวิศวกรรมศาสตร์และเทคโนโลยี",
          majors: [
            "วิศวกรรมกระบวนการเคมี (ระยอง)",
            "วิศวกรรมเครื่องกลและการผลิต",
            "วิศวกรรมระบบอัตโนมัติและหุ่นยนต์อัจฉริยะ"
          ]
        },
        {
          name: "คณะบริหารธุรกิจ",
          majors: [
            "การบัญชีดิจิทัลและการจัดการการเงิน",
            "โลจิสติกส์และการจัดการซัพพลายเชนอัจฉริยะ"
          ]
        }
      ]
    }
  ],
  quotas: [
    "TCAS รอบที่ 1 - Portfolio (ผู้มีผลงานดีเด่น)",
    "โควตาเรียนดี (GPAX 3.50 ขึ้นไป)",
    "โควตานักเรียนสายอาชีพ (ปวช./ปวส.)",
    "โควตาบุตรบุคลากรและศิษย์เก่า มจพ.",
    "โควตานักกีฬาและศิลปวัฒนธรรม"
  ],
  eduLevels: [
    "ม.3",
    "ม.6",
    "ปวช",
    "ปวส",
    "อนุปริญญา",
    "ปริญญาตรี",
    "ปริญญาตรีสำหรับสมัครปริญญาโท"
  ]
};

// ค่าเริ่มต้นกรณีเปิดเข้ามาครั้งแรก
const DEFAULT_APPLICANT = {
  idCard: "1234567890123",
  title: "นาย",
  name: "พาส ปรีดา",
  birthdate: "2549-05-15",
  phone: "089-1234567",
  email: "pass.pr@example.com",
  school: "วิทยาลัยนครสิงห์บุรี",
  eduLevel: "ปวช",
  gpax: "3.85",
  campus: "วิทยาเขตปราจีนบุรี",
  faculty: "คณะเทคโนโลยีและการจัดการอุตสาหกรรม (FITM)",
  major: "วิศวกรรมสารสนเทศและเครือข่าย (INET)",
  quota: "TCAS รอบที่ 1 - Portfolio (ผู้มีผลงานดีเด่น)",
  appNumber: "Admission-2027-004381",
  applyDate: "10 มกราคม 2570 - 14:32 น.",
  statusStep: 2, // 1: ส่งเอกสารแล้ว, 2: ตรวจสอบเอกสารแล้ว, 3: รอสัมภาษณ์, 4: ผ่านการคัดเลือก
  statusTitle: "ตรวจสอบเอกสารแล้ว",
  statusNote: "ประกาศ: เอกสารของท่านได้รับการอนุมัติแล้ว อยู่ในขั้นตอนรอประกาศผลการคัดเลือก กรุณาติดตามผลในเร็ว ๆ นี้",
  isPaid: true
};

// ฟังก์ชันตรวจสอบเลขบัตรประชาชน 13 หลัก (สูตร Modulo 11 ของไทย)
function isValidThaiID(id) {
  if (!id) return false;
  const cleanId = id.replace(/[^0-9]/g, '');
  if (cleanId.length !== 13) return false;
  
  let sum = 0;
  for (let i = 0; i < 12; i++) {
    sum += parseInt(cleanId.charAt(i), 10) * (13 - i);
  }
  const check = (11 - (sum % 11)) % 10;
  return check === parseInt(cleanId.charAt(12), 10);
}

// ฟังก์ชันจัดรูปแบบเลขบัตรประชาชนเป็น X-XXXX-XXXXX-XX-X
function formatThaiID(id) {
  if (!id) return '';
  const clean = id.replace(/[^0-9]/g, '');
  if (clean.length <= 1) return clean;
  if (clean.length <= 5) return `${clean.slice(0, 1)}-${clean.slice(1)}`;
  if (clean.length <= 10) return `${clean.slice(0, 1)}-${clean.slice(1, 5)}-${clean.slice(5)}`;
  if (clean.length <= 12) return `${clean.slice(0, 1)}-${clean.slice(1, 5)}-${clean.slice(5, 10)}-${clean.slice(10)}`;
  return `${clean.slice(0, 1)}-${clean.slice(1, 5)}-${clean.slice(5, 10)}-${clean.slice(10, 12)}-${clean.slice(12, 13)}`;
}

// ฟังก์ชันจัดฟอร์แมตเบอร์โทรศัพท์ 0XX-XXX-XXXX
function formatPhone(phone) {
  if (!phone) return '';
  const clean = phone.replace(/[^0-9]/g, '');
  if (clean.length <= 3) return clean;
  if (clean.length <= 6) return `${clean.slice(0, 3)}-${clean.slice(3)}`;
  return `${clean.slice(0, 3)}-${clean.slice(3, 6)}-${clean.slice(6, 10)}`;
}

// ฟังก์ชันจัดการ LocalStorage ของผู้สมัคร
function getApplicantData() {
  try {
    const raw = localStorage.getItem('kmutnb_applicant');
    if (!raw) {
      localStorage.setItem('kmutnb_applicant', JSON.stringify(DEFAULT_APPLICANT));
      return DEFAULT_APPLICANT;
    }
    return JSON.parse(raw);
  } catch (e) {
    return DEFAULT_APPLICANT;
  }
}

function saveApplicantData(data) {
  const current = getApplicantData();
  const updated = { ...current, ...data };
  localStorage.setItem('kmutnb_applicant', JSON.stringify(updated));
  return updated;
}

// แสดง Toast Notification แบบ Pure JS
function showToast(message, type = 'info') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  
  let icon = 'ℹ️';
  if (type === 'success') icon = '✓';
  if (type === 'error') icon = '⚠️';
  
  toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
  container.appendChild(toast);
  
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(60px)';
    setTimeout(() => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 300);
  }, 3500);
}

// อัปเดตชื่อผู้ใช้ที่ Header ในทุกหน้าโดยอัตโนมัติ
function initHeader() {
  const data = getApplicantData();
  const nameEl = document.querySelector('.user-meta .name');
  const avatarEl = document.querySelector('.user-avatar');
  
  if (nameEl && data && data.name) {
    nameEl.textContent = data.name;
  }
  if (avatarEl && data && data.name) {
    avatarEl.textContent = data.name.charAt(0);
  }
}

// เมื่อโหลด DOM เสร็จให้รันอัตโนมัติ
document.addEventListener('DOMContentLoaded', () => {
  initHeader();
});
