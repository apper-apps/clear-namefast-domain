import mockDomains from "@/services/mockData/domains.json";

// Simulate network delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const domainService = {
  async getAll() {
    await delay(300);
    return [...mockDomains];
  },

  async getById(id) {
    await delay(200);
    const domain = mockDomains.find(d => d.Id === id);
    if (!domain) {
      throw new Error("Domain not found");
    }
    return { ...domain };
  },

  async create(domainData) {
    await delay(400);
    const newDomain = {
      ...domainData,
      Id: Math.max(...mockDomains.map(d => d.Id)) + 1,
      createdAt: new Date().toISOString(),
      status: "pending-approval"
    };
    mockDomains.push(newDomain);
    return { ...newDomain };
  },

  async update(id, updateData) {
    await delay(300);
    const index = mockDomains.findIndex(d => d.Id === id);
    if (index === -1) {
      throw new Error("Domain not found");
    }
    
    mockDomains[index] = {
      ...mockDomains[index],
      ...updateData,
      updatedAt: new Date().toISOString()
    };
    
    return { ...mockDomains[index] };
  },

  async delete(id) {
    await delay(300);
    const index = mockDomains.findIndex(d => d.Id === id);
    if (index === -1) {
      throw new Error("Domain not found");
    }
    
    const deletedDomain = mockDomains.splice(index, 1)[0];
    return { ...deletedDomain };
  }
};