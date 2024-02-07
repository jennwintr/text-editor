import { openDB } from "idb";

const initdb = async () =>
  openDB("jenni", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jenni")) {
        console.log("jenni database already exists");
        return;
      }
      db.createObjectStore("jenni", { keyPath: "id", autoIncrement: true });
      console.log("jenni database created");
    },
  });

export const putDb = async (content) => {
  const jenniDB = await openDB("jenni", 1);
  const tx = jenniDB.transaction("jenni", "readwrite");
  const store = tx.objectStore("jenni");
  const request = store.put({ id: 1, value: content });
  const result = await request;
  console.log("🚀 - data saved to the database", result);
};

export const getDb = async () => {
  const jenniDB = await openDB("jenni", 1);
  const tx = jenniDB.transaction("jenni", "readonly");
  const store = tx.objectStore("jenni");
  const request = store.getAll();
  const result = await request;
  console.log("Data read from database", result);
  return result.value;
};

initdb();