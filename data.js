const questions = [
	{
		title: "Davlat fuqarolik xizmati to'g'risidagi qonunchilik nimalardan iborat?",
		variants: [
			"Faqat O'zbekiston Respublikasi Konstitutsiyasidan",
			'Prezident farmonlaridan',
			'Ushbu Qonun va boshqa qonunchilik hujjatlaridan',
			"Faoliyat yo'riqnomalaridan",
		],
		correct: 2,
	},
	{
		title: 'Davlat fuqarolik xizmatining asosiy prinsipi qaysi javobda noto\'g\'ri berilgan?',
		variants: [
			'Yagona rahbarlik',
			'Ochiqlik va shaffoflik',
			'Qonuniylik',
			'Xolislik, professionallik va kompetentlik',
		],
		correct: 0,
	},
	{
		title: 'Davlat fuqarolik xizmatchilarining odob-axloq qoidalari qanday holatda buzilgan hisoblanadi?',
		variants: [
			'Kasbiy kompetensiyasini oshirish',
			'Xizmat majburiyatlarini bajarayotganda kamsitish',
			'Rasmiy tadbirga qatnashish',
			'Lavozim yo\'riqnomasi bilan tanishish',
		],
		correct: 1,
	},
	{
		title: "Qaysi holatda davlat fuqarolik xizmatchisiga sovg'a olishga ruxsat etiladi?",
		variants: [
			'Ishdan ketayotganda',
			'Tadbirkorlik bilan shug\'ullangani uchun',
			'Ish faoliyatidagi yordam uchun',
			'Davlat organi qarori bilan alohida xizmatlari uchun',
		],
		correct: 3,
	},
	{
		title: "Davlat fuqarolik xizmatining tizimi nimani o'z ichiga oladi?",
		variants: [
			"Fuqaro murojaatlarini ko'rib chiqishni",
			'Faqat lavozimga tayinlash jarayonini',
			'Boshqaruv faoliyatini',
			"Tanlab olish, hisobga olish, rag'batlantirish va lavozim bo'yicha ko'tarish mexanizmlarini",
		],
		correct: 3,
	},
	{
		title: "Mehnat kodeksi kimlar o'rtasidagi munosabatlarni tartibga soladi?",
		variants: [
			'Talabalar va universitetlar',
			'Ishsiz fuqarolar va hokimiyat',
			'Xodimlar, ish beruvchilar va davlat manfaatlari',
			'Davlat va nodavlat tashkilotlari',
		],
		correct: 2,
	},
	{
		title: 'Mehnat kodeksining asosiy vazifalaridan biri bu –',
		variants: [
			'Faoliyat turlarini ro\'yxatdan o\'tkazish',
			'Siyosiy erkinlikni targ\'ib qilish',
			'Mehnat huquqlarini davlat kafolatlari bilan ta\'minlash',
			'Soliqlarni kamaytirish',
		],
		correct: 2,
	},
	{
		title: 'Mehnat huquqlarining tengligi va kamsitishni taqiqlash prinsipiga ko\'ra, quyidagi holatlardan qaysi biri kamsitish hisoblanadi?',
		variants: [
			'Irqiy belgiga qarab ishga qabul qilmaslik',
			'Nogironlar uchun ish sharoitlarini moslashtirish',
			'Homilador ayollarga afzallik berish',
			'Yoshlarga alohida yondashuv',
		],
		correct: 0,
	},
	{
		title: 'Mehnat erkinligi nimani anglatadi?',
		variants: [
			'Mehnat qilish majburiyligi',
			'Mehnat qilishga, kasbni erkin tanlashga va shartnoma tuzishga bo\'lgan huquq',
			'Har bir fuqaro soliq to\'lamasligi',
			'Ish beruvchi tomonidan ishni tanlash huquqi',
		],
		correct: 1,
	},
	{
		title: 'Qaysi mehnat majburiy mehnat hisoblanmaydi?',
		variants: [
			'Ish beruvchining majburlashi ostida bajarilgan ish',
			'Jismoniy jazoga asoslangan xizmat',
			'Tazyiq ostida ko\'rsatilgan xizmat',
			'Favqulodda holat sababli chaqirilgan ish',
		],
		correct: 3,
	},
	{
		title: 'Yangi Konstitutsiyaga ko\'ra, saylov huquqi qachondan boshlanadi?',
		variants: ['16 yoshdan', '18 yoshdan', '20 yoshdan', '21 yoshdan'],
		correct: 1,
	},
	{
		title: '2023-yilgi Konstitutsiyaga ko\'ra, qaysi soha davlat nazoratiga kiritildi?',
		variants: [
			'Diniy tashkilotlarning moliyaviy faoliyati',
			'Tabiiy resurslardan foydalanish',
			'Xususiy korxonalarning ichki ishlari',
			'Xalqaro tashkilotlarning faoliyati',
		],
		correct: 1,
	},
	{
		title: 'Yangi Konstitutsiyaga ko\'ra, Prezidentning vakolat muddati necha marta uzaytirilishi mumkin?',
		variants: ['Cheklanmagan', 'Faqat bir marta', 'Ikki marta', 'Uch marta'],
		correct: 1,
	},
	{
		title: '2023-yilgi Konstitutsiyaga ko\'ra, qaysi yangi ijtimoiy himoya choralari kiritildi?',
		variants: [
			'Faqat pensiyalarni oshirish',
			'Nogironlar, mehnat faxriylari va kam ta\'minlanganlar uchun qo\'shimcha imtiyozlar',
			'Barcha fuqarolar uchun bepul tibbiy yordam',
			'Davlat tomonidan barcha fuqarolar uchun ish bilan ta\'minlash',
		],
		correct: 1,
	},
	{
		title: 'Yangi Konstitutsiyaga ko\'ra, davlat boshqaruvida qaysi yangi tamoyil qo\'shildi?',
		variants: [
			'Markazlashgan boshqaruv',
			'"Ochiq hukumat" va fuqarolarning ishtirokini kengaytirish',
			'Harbiy tartib',
			'Iqtisodiy izolyatsiya',
		],
		correct: 1,
	},
	{
		title: '2023-yilgi Konstitutsiyaga ko\'ra, qaysi organ fuqarolarning konstitutsiyaviy huquqlarini himoya qiladi?',
		variants: [
			'Vazirlar Mahkamasi',
			'Konstitutsiyaviy sud',
			'Bosh prokuratura',
			'Ichki ishlar vazirligi',
		],
		correct: 1,
	},
	{
		title: 'Yangi Konstitutsiyaga ko\'ra, qaysi hujjat davlat mustaqilligining asosi hisoblanadi?',
		variants: [
			'Oliy Majlis qonunlari',
			'O\'zbekiston Respublikasining Konstitutsiyasi',
			'Prezident farmonlari',
			'Xalqaro shartnomalar',
		],
		correct: 1,
	},
	{
		title: '2023-yilgi Konstitutsiyaga ko\'ra, qaysi huquq yangi kiritildi?',
		variants: [
			'Transportdan bepul foydalanish',
			'Shaxsiy ma\'lumotlarni himoya qilish huquqi',
			'Davlat lavozimlarini egallashda imtiyoz',
			'Soliq to\'lashdan voz kechish',
		],
		correct: 1,
	},
	{
		title: 'Yangi Konstitutsiyaga ko\'ra, davlat tilini o\'rganish...',
		variants: [
			'Ixtiyoriy',
			'Barcha fuqarolar uchun majburiy',
			'Faqat davlat xizmatchilari uchun majburiy',
			'Faqat maktab o\'quvchilari uchun majburiy',
		],
		correct: 1,
	},
];

module.exports = { questions };
