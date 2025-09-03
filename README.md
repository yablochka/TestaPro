# TESTA_V1.0

## Loyihaning maqsadi

**TESTA_V1.0** — bu Node.js asosida yozilgan autentifikatsiya va test tizimi bo‘lib, foydalanuvchilarni ro‘yxatdan o‘tkazish, tizimga kirish, test savollariga javob berish va darajalar bo‘yicha rivojlanishini kuzatish imkonini beradi.

## API endpointlari (to'liq va yangilangan)

**Barcha so‘rovlar uchun asosiy URL:**
```
http://localhost:PORT
yoki
https://kiymeshek.uz
yoki
sizning serveringiz manzili
```

---

### 1. Ro‘yxatdan o‘tish
**POST** `/testa2/register`

**Yuboriladigan JSON (body):**
```json
{
  "username": "foydalanuvchi",
  "email": "email@example.com",
  "password": "parol"
}
```
**Javob (response) misoli:**
- 201:
```json
{
  "message": "Foydalanuvchi muvaffaqiyatli yaratildi",
  "user": {
    "id": "1752167521210",
    "username": "foydalanuvchi",
    "email": "email@example.com",
    "level": "Mutaxassis"
  }
}
```
- 400: Barcha maydonlar to‘ldirilmagan yoki email band

---

### 2. Tizimga kirish
**POST** `/testa2/login`

**Yuboriladigan JSON (body):**
```json
{
  "email": "email@example.com",
  "password": "parol"
}
```
**Javob (response) misoli:**
- 200:
```json
{
  "message": "Muvaffaqiyatli kirildi",
  "token": "token_string",
  "user": {
    "id": "1752167521210",
    "username": "foydalanuvchi",
    "email": "email@example.com",
    "level": "Mutaxassis"
  }
}
```
- 400: Email yoki parol kiritilmagan
- 401: Noto‘g‘ri email yoki parol

---

### 3. Tizimdan chiqish
**POST** `/testa2/logout`

**Header:**
```
Authorization: Bearer <token>
```
**Javob (response) misoli:**
- 200:
```json
{ "message": "Muvaffaqiyatli chiqildi" }
```

---

### 4. Profil ma’lumotlari
**GET** `/testa2/profile`

**Header:**
```
Authorization: Bearer <token>
```
**Javob (response) misoli:**
- 200:
```json
{
  "user": {
    "id": "1752167521210",
    "username": "foydalanuvchi",
    "email": "email@example.com",
    "level": "Mutaxassis",
    "createdAt": "2025-07-10T17:12:01.213Z",
    "testProgress": {
      "currentLevel": "Mutaxassis",
      "completedTests": [],
      "canTakeTest": true
    }
  }
}
```
- 401: Token kerak yoki noto‘g‘ri token

---

### 5. Mavjud darajalar
**GET** `/testa2/levels`

**Javob (response) misoli:**
- 200:
```json
{
  "levels": [
    "Mutaxassis",
    "Yetakchi mutaxassis",
    "Bosh mutaxassis",
    "Bo'lim boshlig'i o'rinbosari",
    "Bo'lim boshlig'i"
  ],
  "message": "Mavjud foydalanuvchi darajalari"
}
```

---

### 6. Joriy test savollari
**GET** `/testa2/tests/current`

**Header:**
```
Authorization: Bearer <token>
```
**Javob (response) misoli:**
- 200:
```json
{
  "message": "Yetakchi mutaxassis darajasi uchun test",
  "level": "Yetakchi mutaxassis",
  "questions": [
    {
      "title": "Savol matni",
      "variants": ["A", "B", "C", "D"],
      "id": 0
    }
    // ... jami 5 ta savol
  ],
  "totalQuestions": 5,
  "passingScore": 3
}
```
- 400: Eng yuqori darajadasiz
- 401: Token kerak yoki noto‘g‘ri token

---

### 7. Test natijalarini yuborish
**POST** `/testa2/tests/submit`

**Header:**
```
Authorization: Bearer <token>
```
**Yuboriladigan JSON (body):**
```json
{
  "answers": [
    { "questionId": 0, "answer": 2 },
    { "questionId": 1, "answer": 0 },
    { "questionId": 2, "answer": 1 },
    { "questionId": 3, "answer": 3 },
    { "questionId": 4, "answer": 1 }
  ]
}
```
**Javob (response) misoli:**
- 200:
```json
{
  "message": "Tabriklaymiz! Test muvaffaqiyatli o'tildi",
  "score": 4,
  "totalQuestions": 5,
  "passed": true,
  "results": [
    { "questionId": 0, "correct": true },
    { "questionId": 1, "correct": false }
    // ...
  ],
  "newLevel": "Yetakchi mutaxassis",
  "canTakeNextTest": true
}
```
- 400: Barcha savollarga javob berilmagan
- 401: Token kerak yoki noto‘g‘ri token

---

### 8. Test progress holati
**GET** `/testa2/tests/progress`

**Header:**
```
Authorization: Bearer <token>
```
**Javob (response) misoli:**
- 200:
```json
{
  "currentLevel": "Mutaxassis",
  "nextLevel": "Yetakchi mutaxassis",
  "canTakeTest": true,
  "completedTests": [],
  "isMaxLevel": false
}
```
- 401: Token kerak yoki noto‘g‘ri token

---

### 9. Barcha foydalanuvchilarni o‘chirish (admin/test uchun)
**POST** `/testa2/clear-users`

**Izoh:**
- Bu endpoint barcha foydalanuvchilarni (users.json) tozalaydi.
- Hech qanday token yoki autentifikatsiya talab qilinmaydi.
- Faqat test yoki admin maqsadlarida ishlatish tavsiya etiladi!

**Javob (response) misoli:**
- 200:
```json
{ "message": "Barcha foydalanuvchilar o'chirildi!" }
```

---

## Foydalanish bo‘yicha eslatmalar
- **Token**: Foydalanuvchi login qilganda token oladi va uni barcha himoyalangan endpointlarga `Authorization: Bearer <token>` ko‘rinishida yuboradi.
- **Test savollari**: Har bir foydalanuvchi o‘z darajasiga mos test oladi. Test xato topshirilganda ham darhol qayta urinish mumkin (timer yo‘q!).
- **Ma’lumotlar**: Foydalanuvchilar `users.json` faylida, test savollari esa `data.js` faylida saqlanadi.

## Hissa qo‘shish

Pull request va takliflar uchun ochiq! 