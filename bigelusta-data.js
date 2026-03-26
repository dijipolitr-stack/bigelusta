// BigelUsta - Ortak Veri Katmanı
// Tüm sayfalar bu dosyayı kullanır

window.BG = window.BG || {};

// ── USTALAR VERİTABANI ──
BG.ustalar = [
  { id:'U001', ad:'Mehmet Kaya',    tel:'05321234567', il:'İstanbul', ilceler:['Kadıköy','Üsküdar','Ataşehir','Maltepe','Kartal'], aktif:true, puan:4.8, tamamlanan:47 },
  { id:'U002', ad:'Ali Demir',      tel:'05333456789', il:'İstanbul', ilceler:['Beşiktaş','Şişli','Beyoğlu','Sarıyer','Kağıthane'], aktif:true, puan:4.5, tamamlanan:32 },
  { id:'U003', ad:'Hasan Yıldız',   tel:'05344567890', il:'İstanbul', ilceler:['Pendik','Tuzla','Sultanbeyli','Sancaktepe'], aktif:true, puan:4.9, tamamlanan:61 },
  { id:'U004', ad:'Emre Çelik',     tel:'05355678901', il:'İstanbul', ilceler:['Bakırköy','Zeytinburnu','Bağcılar','Güngören','Bahçelievler'], aktif:true, puan:4.6, tamamlanan:28 },
  { id:'U005', ad:'Fatih Arslan',   tel:'05366789012', il:'İstanbul', ilceler:['Beylikdüzü','Esenyurt','Avcılar','Büyükçekmece'], aktif:false, puan:4.3, tamamlanan:19 },
  { id:'U006', ad:'Osman Koç',      tel:'05377890123', il:'Ankara',   ilceler:['Çankaya','Keçiören','Mamak','Altındağ','Yenimahalle'], aktif:true, puan:4.7, tamamlanan:38 },
  { id:'U007', ad:'Serkan Güneş',   tel:'05388901234', il:'İzmir',    ilceler:['Konak','Karşıyaka','Bornova','Buca','Bayraklı'], aktif:true, puan:4.8, tamamlanan:44 },
];

// ── İŞ DURUMU ──
BG.durumlar = {
  yeni:         { label:'Yeni',                    color:'#1a56db', bg:'rgba(26,86,219,.08)',  icon:'🔵' },
  atandi:       { label:'Usta Atandı',             color:'#7c3aed', bg:'rgba(124,58,237,.08)', icon:'👷' },
  randevu_ok:   { label:'Randevu Onaylandı',       color:'#0891b2', bg:'rgba(8,145,178,.08)',  icon:'📅' },
  yolda:        { label:'Usta Yolda',              color:'#d97706', bg:'rgba(217,119,6,.08)',   icon:'🚗' },
  kurulum:      { label:'Kurulum Yapılıyor',       color:'#d97706', bg:'rgba(217,119,6,.08)',   icon:'🔧' },
  tamamlandi:   { label:'Tamamlandı',              color:'#059669', bg:'rgba(5,150,105,.08)',   icon:'✅' },
  anket_bekleniyor:{ label:'Anket Bekleniyor',     color:'#c8900a', bg:'rgba(200,144,10,.08)',  icon:'⭐' },
  kapandi:      { label:'Kapatıldı',               color:'#64748b', bg:'rgba(100,116,139,.08)', icon:'🔒' },
  iptal:        { label:'İptal',                   color:'#dc2626', bg:'rgba(220,38,38,.08)',   icon:'❌' },
};

// ── YARDIMCI FONKSİYONLAR ──
BG.getAppointments = () => JSON.parse(localStorage.getItem('bg_appointments') || '[]');
BG.saveAppointments = (data) => localStorage.setItem('bg_appointments', JSON.stringify(data));

BG.getOrders = () => JSON.parse(localStorage.getItem('bg_orders') || '[]');
BG.saveOrders = (data) => localStorage.setItem('bg_orders', JSON.stringify(data));

BG.getSurveys = () => JSON.parse(localStorage.getItem('bigelusta_surveys') || '[]');

BG.generateId = (prefix) => prefix + '-' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).slice(2,5).toUpperCase();

BG.matchUsta = (il, ilce) => {
  if(!il) return [];
  const ilNorm = il.trim().toLowerCase();
  return BG.ustalar.filter(u => {
    if(!u.aktif) return false;
    if(u.il.toLowerCase() !== ilNorm) return false;
    if(!ilce) return true;
    const ilceNorm = ilce.trim().toLowerCase();
    return u.ilceler.some(i => i.toLowerCase().includes(ilceNorm) || ilceNorm.includes(i.toLowerCase()));
  });
};

BG.ustaById = (id) => BG.ustalar.find(u => u.id === id);

BG.addOrderLog = (order, message, user='Admin') => {
  if(!order.log) order.log = [];
  order.log.unshift({ ts: new Date().toISOString(), message, user });
  return order;
};

// ── ÖRNEK RANDEVU VERİSİ (ana sayfadan geliyormuş gibi) ──
BG.seedAppointments = () => {
  if(BG.getAppointments().length > 0) return;
  const samples = [
    { id:'APT-001', musteri:'Ahmet Yılmaz', telefon:'05321111111', email:'ahmet@test.com', il:'İstanbul', ilce:'Kadıköy', arac:'Tesla Model 3 / Y / S / X', kurulumYeri:'Ev / Daire Otoparkı', cihazDurumu:'BigelUsta\'dan cihaz alacağım', cihaz:'Wallbox Pulsar Plus 22kW — ₺16.500', faz:'Trifaze (Üç Faz — 400V)', mesafe:'10–25 metre', tarih:'28.03.2026', saat:'10:00', notlar:'Garaj katında park yerim var.', olusturmaTarihi:'2026-03-26T08:30:00Z', durum:'yeni' },
    { id:'APT-002', musteri:'Selin Kara',   telefon:'05332222222', email:'selin@test.com', il:'İstanbul', ilce:'Beşiktaş', arac:'BMW i4', kurulumYeri:'Müstakil Garaj', cihazDurumu:'Cihazım mevcut, sadece kurulum istiyorum', cihaz:'Seçilmedi', faz:'Bilmiyorum — Sigorta Panosu Fotoğrafı Göndereyim', mesafe:'0–10 metre', tarih:'29.03.2026', saat:'14:00', notlar:'', olusturmaTarihi:'2026-03-26T09:15:00Z', durum:'yeni' },
    { id:'APT-003', musteri:'Mehmet Demir', telefon:'05343333333', email:'', il:'Ankara', ilce:'Çankaya', arac:'Togg T10X / T10F', kurulumYeri:'İşyeri / Ofis', cihazDurumu:'BigelUsta\'dan cihaz alacağım', cihaz:'ABB Terra AC 22kW — ₺22.900', faz:'Trifaze (Üç Faz — 400V)', mesafe:'25–50 metre', tarih:'30.03.2026', saat:'09:00', notlar:'5 araç için aynı anda kurulum gerekiyor.', olusturmaTarihi:'2026-03-26T10:00:00Z', durum:'yeni' },
    { id:'APT-004', musteri:'Fatma Şahin',  telefon:'05354444444', email:'', il:'İzmir', ilce:'Karşıyaka', arac:'Hyundai Ioniq 5 / 6', kurulumYeri:'Ev / Daire Otoparkı', cihazDurumu:'BigelUsta\'dan cihaz alacağım', cihaz:'Vestel EVC04 Smart 22kW — ₺22.000', faz:'Monofaze (Tek Faz — 230V)', mesafe:'10–25 metre', tarih:'31.03.2026', saat:'11:00', notlar:'', olusturmaTarihi:'2026-03-25T14:20:00Z', durum:'atandi' },
  ];
  BG.saveAppointments(samples);
};

BG.seedOrders = () => {
  if(BG.getOrders().length > 0) return;
  const orders = [
    { id:'IO-001', aptId:'APT-004', musteri:'Fatma Şahin', telefon:'05354444444', il:'İzmir', ilce:'Karşıyaka', arac:'Hyundai Ioniq 5 / 6', kurulumYeri:'Ev / Daire Otoparkı', faz:'Monofaze', mesafe:'10–25 metre', cihaz:'Vestel EVC04 Smart 22kW', tarih:'31.03.2026', saat:'11:00', ustaId:'U007', ustaAd:'Serkan Güneş', ustaTel:'05388901234', durum:'randevu_ok', olusturmaTarihi:'2026-03-25T15:00:00Z', anketGonderildi:false, surveyId:null, log:[{ts:'2026-03-25T15:00:00Z',message:'İş emri oluşturuldu ve Serkan Güneş\'e atandı.',user:'Admin'},{ts:'2026-03-25T15:05:00Z',message:'Randevu onaylandı. Müşteri WhatsApp üzerinden bilgilendirildi.',user:'Admin'}] },
  ];
  BG.saveOrders(orders);
};
