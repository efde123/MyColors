// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	const persistentButton = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 0);
    persistentButton.text = "BUTTON";
    persistentButton.tooltip = "Click me anytime!";

    const dropdown = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 1);

    dropdown.text = "Dropdown";
    dropdown.tooltip = "Select an item";
    dropdown.command = "mycolors.showDropdown";

 


	let disposable = vscode.commands.registerCommand('mycolors.showColors', async () => {
        const fileName = await vscode.window.showInputBox({
            prompt: "Enter file name"
        });
        if (!fileName) {
            return;
        }
        const filePath = vscode.Uri.file(fileName);
        try {
            const fileContent = await vscode.workspace.fs.readFile(filePath);
			
            vscode.window.showInformationMessage(`File content: ${fileContent.toString()}`);

			persistentButton.show();

			context.subscriptions.push(
				vscode.commands.registerCommand('mycolors.showDropdown', () => {
					const items = ['Item 1', 'Item 2', 'Item 3'];
		
					vscode.window.showQuickPick(items).then((selection) => {
						if (selection) {
							vscode.window.showInformationMessage(`You selected ${selection}`);
							dropdown.hide();
						}
					});
				})
			);

			persistentButton.command = 'mycolors.showDropdown';
			context.subscriptions.push(persistentButton, dropdown);

        } catch (err) {
            vscode.window.showErrorMessage(err.message);
        }
    });

    context.subscriptions.push(disposable);
	
}



function deactivate() {}

module.exports = {
	activate,
	deactivate
}
