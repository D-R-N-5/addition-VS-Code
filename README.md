# كيفية تثبيت إضافة Code Rewriter على VS Code

## خطوات التثبيت

1. افتح VS Code
2. افتح Terminal (Ctrl+`)
3. استخدم الأمر التالي لتثبيت الإضافة:

```powershell
code --install-extension e:\اكتب اسم الفولدر\addition\code-rewriter-1.0.0.vsix
```

أو إذا كنت تواجه مشاكل مع المسار:

```powershell
copy "e:\اكتب اسم الفولدر\addition\code-rewriter-1.0.0.vsix" "e:\extension.vsix"
code --install-extension e:\extension.vsix
```

## كيفية استخدام الإضافة

- `Ctrl+K`: لحفظ الكود الحالي، مسح المحرر، ثم إعادة كتابة الكود حرفًا بحرف مع تأخير 50 مللي ثانية
- `Ctrl+I` أو `Ctrl+O`: لاستعادة الكود الأصلي

## معلومات المطور

تم تطوير هذه الإضافة بواسطةدكتور نيتروس مطور مصري.


آخر تحديث: تم إصلاح مشكلة عدم مسح المحرر عند استخدام `Ctrl+K`.
