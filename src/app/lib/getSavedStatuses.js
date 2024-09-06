const filePath = path.join(process.cwd(), 'statuses.json');

export async function getSavedStatuses() {
    try {
        const fileContent = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(fileContent);
    } catch (error) {
        // If the file doesn't exist, return empty statuses
        return [];
    }
}
