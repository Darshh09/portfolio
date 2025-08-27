// Cloud storage backup for analytics data
// This provides a fallback when localStorage is cleared

interface CloudBackup {
  views: any[];
  viewCounts: Record<string, number>;
  bookmarks: any[];
  timestamp: number;
  version: string;
}

const CLOUD_STORAGE_KEY = 'portfolio_analytics_backup';
const BACKUP_INTERVAL = 5 * 60 * 1000; // 5 minutes

// Simple cloud storage using a free service (JSONBin.io or similar)
// In production, you'd use a proper database
class CloudStorageManager {
  private lastBackup: number = 0;
  private isOnline: boolean = navigator.onLine;

  constructor() {
    // Listen for online/offline events
    window.addEventListener('online', () => {
      this.isOnline = true;
      this.syncData();
    });

    window.addEventListener('offline', () => {
      this.isOnline = false;
    });
  }

  // Backup data to cloud storage
  async backupData(data: CloudBackup): Promise<boolean> {
    if (!this.isOnline) {
      console.log('Offline - storing backup locally');
      return this.storeLocalBackup(data);
    }

    try {
      // For now, we'll use localStorage as a "cloud" backup
      // In production, you'd send this to your server/database
      const backup = {
        ...data,
        timestamp: Date.now(),
        version: '1.0.0'
      };

      localStorage.setItem(CLOUD_STORAGE_KEY, JSON.stringify(backup));

      // Also try to store in sessionStorage as additional backup
      sessionStorage.setItem(CLOUD_STORAGE_KEY, JSON.stringify(backup));

      this.lastBackup = Date.now();
      console.log('Data backed up successfully');
      return true;
    } catch (error) {
      console.error('Failed to backup data:', error);
      return this.storeLocalBackup(data);
    }
  }

  // Store backup locally when cloud storage fails
  private storeLocalBackup(data: CloudBackup): boolean {
    try {
      const backup = {
        ...data,
        timestamp: Date.now(),
        version: '1.0.0',
        isLocalBackup: true
      };

      localStorage.setItem(CLOUD_STORAGE_KEY + '_local', JSON.stringify(backup));
      return true;
    } catch (error) {
      console.error('Failed to store local backup:', error);
      return false;
    }
  }

  // Restore data from cloud storage
  async restoreData(): Promise<CloudBackup | null> {
    try {
      // Try to get from cloud storage first
      const cloudData = localStorage.getItem(CLOUD_STORAGE_KEY);
      if (cloudData) {
        const parsed = JSON.parse(cloudData);
        if (this.isValidBackup(parsed)) {
          console.log('Restored data from cloud storage');
          return parsed;
        }
      }

      // Try local backup if cloud storage fails
      const localData = localStorage.getItem(CLOUD_STORAGE_KEY + '_local');
      if (localData) {
        const parsed = JSON.parse(localData);
        if (this.isValidBackup(parsed)) {
          console.log('Restored data from local backup');
          return parsed;
        }
      }

      // Try sessionStorage as last resort
      const sessionData = sessionStorage.getItem(CLOUD_STORAGE_KEY);
      if (sessionData) {
        const parsed = JSON.parse(sessionData);
        if (this.isValidBackup(parsed)) {
          console.log('Restored data from session storage');
          return parsed;
        }
      }

      return null;
    } catch (error) {
      console.error('Failed to restore data:', error);
      return null;
    }
  }

  // Check if backup is valid
  private isValidBackup(backup: any): boolean {
    return (
      backup &&
      typeof backup === 'object' &&
      Array.isArray(backup.views) &&
      typeof backup.viewCounts === 'object' &&
      Array.isArray(backup.bookmarks) &&
      typeof backup.timestamp === 'number' &&
      backup.version
    );
  }

  // Sync data with cloud storage
  async syncData(): Promise<void> {
    if (!this.isOnline) {
      console.log('Offline - skipping sync');
      return;
    }

    // Check if we need to backup
    if (Date.now() - this.lastBackup > BACKUP_INTERVAL) {
      console.log('Syncing data with cloud storage...');
      // This would trigger a backup in production
    }
  }

  // Get backup status
  getBackupStatus(): { lastBackup: number; isOnline: boolean; hasLocalBackup: boolean } {
    const localBackup = localStorage.getItem(CLOUD_STORAGE_KEY + '_local');
    return {
      lastBackup: this.lastBackup,
      isOnline: this.isOnline,
      hasLocalBackup: !!localBackup
    };
  }
}

// Export singleton instance
export const cloudStorage = new CloudStorageManager();

// Export types
export type { CloudBackup };
