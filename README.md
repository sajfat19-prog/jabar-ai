# Jabar AI
منصة محادثة AI مستقلة بواجهة عربية RTL وBackend بـ Node/Express.

## التشغيل
1. ثبّت Node.js 20+.
2. انسخ `.env.example` إلى `.env`.
3. ضع مفتاح مزود الـAPI في `OPENAI_API_KEY`.
4. نفّذ `npm install` ثم `npm start`.
5. افتح `http://localhost:3000`.

> لا تضع مفتاح API داخل `public` أو JavaScript المتصفح.

## التطوير التالي
- حسابات ومصادقة وقاعدة بيانات PostgreSQL
- رفع ملفات وصور وتحليلها
- Web Search
- Code Interpreter / sandbox
- توليد الصور والصوت
- اشتراكات ودفع
- لوحة Admin وإحصائيات الاستخدام
- حدود استخدام حقيقية حسب الخطة
