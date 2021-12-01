const storage = new Map();

const store = {
  add(token: string, lang: string) {
    storage.set(token, lang);
  },
  get(token: string) : string {
    const lang = storage.get(token);
    if (lang) return lang;
    throw new Error("User not found");
  },
};

export { store as controller };