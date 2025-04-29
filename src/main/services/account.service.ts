import { ipcMain, app, dialog } from "electron";
import path from "path";
import fs from "fs";

export class AccountService {
  private avatarsDir: string;

  constructor() {
    // Define the directory where avatars will be saved
    this.avatarsDir = path.join(app.getPath("userData"), "avatars");

    // Ensure the avatars directory exists
    if (!fs.existsSync(this.avatarsDir)) {
      fs.mkdirSync(this.avatarsDir, { recursive: true });
    }
    console.log("AccountService initialized:", { avatarsDir: this.avatarsDir });
    this.registerHandlers();
  }

  public registerHandlers(): void {
    // Handle avatar saving
    ipcMain.handle("save-avatar", async (event, filePath: string) => {
      try {
        if (!filePath) {
          throw new Error("Invalid file path");
        }

        // Generate a unique file name for the avatar
        const fileName = `${Date.now()}-${path.basename(filePath)}`;
        const destination = path.join(this.avatarsDir, fileName);

        // Copy the file to the avatars directory
        fs.copyFileSync(filePath, destination);

        // Return the relative path to the saved avatar
        return destination;
      } catch (error) {
        console.error("Error saving avatar:", error);
        throw error;
      }
    });

    // Handle file picker dialog
    ipcMain.handle("select-file", async () => {
      const result = await dialog.showOpenDialog({
          properties: ["openFile"],
          filters: [{ name: "Images", extensions: ["jpg", "jpeg", "png", "gif"] }],
      })

      console.log(result);

      if (!result) {
        throw new Error("No file selected");
      }

      return result; // Return the selected file path
    });
  }
}