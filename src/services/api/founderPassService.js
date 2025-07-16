import mockPerks from "@/services/mockData/founderPassPerks.json";

// Simulate network delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const founderPassService = {
  async getAll() {
    await delay(250);
    return [...mockPerks];
  },

  async getById(id) {
    await delay(200);
    const perk = mockPerks.find(p => p.Id === id);
    if (!perk) {
      throw new Error("Perk not found");
    }
    return { ...perk };
  },

  async create(perkData) {
    await delay(400);
    const newPerk = {
      ...perkData,
      Id: Math.max(...mockPerks.map(p => p.Id)) + 1,
      createdAt: new Date().toISOString()
    };
    mockPerks.push(newPerk);
    return { ...newPerk };
  },

  async update(id, updateData) {
    await delay(300);
    const index = mockPerks.findIndex(p => p.Id === id);
    if (index === -1) {
      throw new Error("Perk not found");
    }
    
    mockPerks[index] = {
      ...mockPerks[index],
      ...updateData,
      updatedAt: new Date().toISOString()
    };
    
    return { ...mockPerks[index] };
  },

  async delete(id) {
    await delay(300);
    const index = mockPerks.findIndex(p => p.Id === id);
    if (index === -1) {
      throw new Error("Perk not found");
    }
    
    const deletedPerk = mockPerks.splice(index, 1)[0];
    return { ...deletedPerk };
  }
};