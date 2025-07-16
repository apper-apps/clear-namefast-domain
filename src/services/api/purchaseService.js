import mockPurchases from "@/services/mockData/purchases.json";

// Simulate network delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const purchaseService = {
  async getAll() {
    await delay(300);
    return [...mockPurchases];
  },

  async getById(id) {
    await delay(200);
    const purchase = mockPurchases.find(p => p.Id === id);
    if (!purchase) {
      throw new Error("Purchase not found");
    }
    return { ...purchase };
  },

  async create(purchaseData) {
    await delay(500);
    const newPurchase = {
      ...purchaseData,
      Id: Math.max(...mockPurchases.map(p => p.Id)) + 1,
      status: "processing",
      transferStatus: "initiated",
      purchaseDate: new Date().toISOString()
    };
    mockPurchases.push(newPurchase);
    return { ...newPurchase };
  },

  async update(id, updateData) {
    await delay(300);
    const index = mockPurchases.findIndex(p => p.Id === id);
    if (index === -1) {
      throw new Error("Purchase not found");
    }
    
    mockPurchases[index] = {
      ...mockPurchases[index],
      ...updateData,
      updatedAt: new Date().toISOString()
    };
    
    return { ...mockPurchases[index] };
  },

  async delete(id) {
    await delay(300);
    const index = mockPurchases.findIndex(p => p.Id === id);
    if (index === -1) {
      throw new Error("Purchase not found");
    }
    
    const deletedPurchase = mockPurchases.splice(index, 1)[0];
    return { ...deletedPurchase };
  }
};