const vscode = require('vscode');
const originalCodeMap = new Map();

function activate(context) {
    let rewriteDisposable = vscode.commands.registerCommand('code-rewriter.rewriteCode', async () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const document = editor.document;
            const uri = document.uri.toString();
            
            const currentCode = document.getText();
            originalCodeMap.set(uri, currentCode);
            
            const fullRange = new vscode.Range(
                document.positionAt(0),
                document.positionAt(currentCode.length)
            );
            await editor.edit(editBuilder => {
                editBuilder.delete(fullRange);
            });
            
            const fileExt = document.fileName.split('.').pop().toLowerCase();
            
            let codeTemplate = currentCode;
            
            if (fileExt === 'html') {
                codeTemplate = '<!DOCTYPE html>\n<html>\n<head>\n    <title></title>\n</head>\n<body>\n    \n</body>\n</html>';
            } else if (fileExt === 'css') {
                codeTemplate = '/* CSS Document */';
            } else if (fileExt === 'js') {
                codeTemplate = '// JavaScript Document';
            }
            
            if (codeTemplate) {
                let i = 0;
                const typingInterval = setInterval(() => {
                    if (i < codeTemplate.length) {
                        const char = codeTemplate.charAt(i);
                        const pos = editor.selection.active;
                        editor.edit(editBuilder => {
                            editBuilder.insert(pos, char);
                        });
                        i++;
                    } else {
                        clearInterval(typingInterval);
                        vscode.window.showInformationMessage('تم كتابة الكود بنجاح!');
                    }
                }, 50);
            } else {
                vscode.window.showInformationMessage('بدء كتابة الكود من جديد!');
            }
        }
    });
    
    let revertDisposable = vscode.commands.registerCommand('code-rewriter.revertCode', async () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const document = editor.document;
            const uri = document.uri.toString();
            
            if (originalCodeMap.has(uri)) {
                const originalText = originalCodeMap.get(uri);
                
                const fullRange = new vscode.Range(
                    document.positionAt(0),
                    document.positionAt(document.getText().length)
                );
                await editor.edit(editBuilder => {
                    editBuilder.replace(fullRange, originalText);
                });
                
                vscode.window.showInformationMessage('تم استعادة الكود الأصلي!');
            } else {
                vscode.window.showWarningMessage('لا يوجد نسخة أصلية محفوظة لهذا الملف');
            }
        }
    });
    
    context.subscriptions.push(rewriteDisposable, revertDisposable);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};