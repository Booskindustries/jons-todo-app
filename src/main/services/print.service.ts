import { ipcMain, BrowserWindow } from 'electron';
import path from 'path';

export const registerPrintService = () => {
  ipcMain.handle('print-home', async (event, tasks) => {
    const printWindow = new BrowserWindow({
      width: 800,
      height: 600,
      show: false, // Hide the window during printing
      webPreferences: {
        nodeIntegration: true, // Enable Node.js integration for dynamic content injection
        contextIsolation: false,
      },
    });

    // Load the print template
    const printTemplatePath = path.join(__dirname, '../templates/print-tasks.html');
    printWindow.loadFile(printTemplatePath);

    // Once the content is loaded, inject the tasks and print
    printWindow.webContents.once('did-finish-load', () => {
      const tasksHTML = tasks
        .map(
          (task: any) => `
          <div class="task">
            <h2>${task.title}</h2>
            <p>${task.description}</p>
            <p><strong>Due Date:</strong> ${task.due_date}</p>
            <p><strong>Status:</strong> ${task.status}</p>
          </div>
        `
        )
        .join('');

      printWindow.webContents.executeJavaScript(`
        document.getElementById('tasks').innerHTML = \`${tasksHTML}\`;
        window.print();
      `);

      // Close the print window after printing
      printWindow.on('closed', () => {
        printWindow.destroy();
      });
    });
  });
};