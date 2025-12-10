interface StoredUser {
  email: string;
  password: string;
  id: string;
  firstName: string;
  lastName: string;
}

const STORAGE_KEY = "user_auth_details";

export function saveUserToLocalStorage(user: StoredUser) {
  if (typeof window !== "undefined") {
    try {
      // NOTE: In a real app, you would NOT save the password to localStorage.
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } catch (e) {
      console.error("Could not save user to localStorage", e);
    }
  }
}

export function getStoredUser(): StoredUser | null {
  if (typeof window !== "undefined") {
    try {
      const storedItem = localStorage.getItem(STORAGE_KEY);
      if (storedItem) {
        return JSON.parse(storedItem) as StoredUser;
      }
    } catch (e) {
      console.error("Could not get user from localStorage", e);
    }
  }
  return null;
}