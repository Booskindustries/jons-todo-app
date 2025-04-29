export const accountService = {
    uploadAvatar: async (filePath: string): Promise<string> => {
      if (!filePath) {
        throw new Error("File path is required");
      }
      return await (window as any).ipcAPI.invoke("save-avatar", filePath);
    },
  
    selectFile: async (): Promise<string> => {
      return await (window as any).ipcAPI.invoke("select-file");
    },
  };