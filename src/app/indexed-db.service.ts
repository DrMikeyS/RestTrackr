import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class IndexedDbService {
  private readonly dbName = 'sleepQualityDB';
  private readonly storeName = 'sleepQualityStore';

  constructor() { }

  async initDB(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, 1);

      request.onerror = (event) => {
        reject('IndexedDB error: ' + (event.target as any).errorCode);
      };

      request.onsuccess = (event) => {
        const db = (event.target as IDBOpenDBRequest).result as IDBDatabase;
        resolve(db);
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result as IDBDatabase;
        if (!db.objectStoreNames.contains(this.storeName)) {
          const store = db.createObjectStore(this.storeName, { keyPath: 'id', autoIncrement: true });
          // Add indexes for flexible querying if needed
        }
      };
    });
  }

  async addEntry(data: any): Promise<void> {
    const db = await this.initDB();
    const transaction = db.transaction(this.storeName, 'readwrite');
    const store = transaction.objectStore(this.storeName);
    await store.add(data);
  }

  async getAllEntries(): Promise<any[]> {
    const db = await this.initDB();
    const transaction = db.transaction(this.storeName, 'readonly');
    const store = transaction.objectStore(this.storeName);
    const request = store.getAll();

    return new Promise((resolve, reject) => {
      request.onsuccess = (event) => {
        resolve(request.result);
      };

      request.onerror = (event) => {
        reject('Error fetching entries from IndexedDB');
      };
    });
  }
}

