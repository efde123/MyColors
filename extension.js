// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
async function activate(context)  {

	const persistentButton = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 0);
    persistentButton.text = "BUTTON";
    persistentButton.tooltip = "Click me anytime!";
    persistentButton.show();

    const dropdown = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 1);

    dropdown.text = "Dropdown";
    dropdown.tooltip = "Select an item";
    
    
   
    try {

        const filePath = await vscode.workspace.findFiles("colors.dart");
        
        fs.readFile(filePath[0].fsPath, 'utf8', (err, data) => {
            if (err) {
              console.error(err);
              return;
            }
            console.log(data);
          });
   
        persistentButton.command = "mycolors.showColors";
                    vscode.commands.registerCommand("mycolors.showColors", () => {
                        const items = ["Item 1", "Item 2", "Item 3"];
                        vscode.window.showQuickPick(items).then((selection) => {
                            if (selection) {
                                vscode.window.showInformationMessage(`You selected ${selection}`);
                                dropdown.hide();
                            }
                        });
                    });

    } catch (err) {
        vscode.window.showErrorMessage("Finding colors failed");
    }
}



function deactivate() {}

module.exports = {
	activate,
	deactivate
}
