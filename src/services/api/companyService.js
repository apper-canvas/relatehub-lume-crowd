import companiesData from "@/services/mockData/companies.json";

let companies = [...companiesData];

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const companyService = {
  async getAll() {
    await delay(300);
    return [...companies];
  },

  async getById(id) {
    await delay(200);
    const company = companies.find((c) => c.Id === parseInt(id));
    return company ? { ...company } : null;
  },

  async create(companyData) {
    await delay(400);
    const maxId = companies.length > 0 ? Math.max(...companies.map((c) => c.Id)) : 0;
    const newCompany = {
      ...companyData,
      Id: maxId + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    companies.push(newCompany);
    return { ...newCompany };
  },

  async update(id, companyData) {
    await delay(400);
    const index = companies.findIndex((c) => c.Id === parseInt(id));
    if (index === -1) return null;
    
    companies[index] = {
      ...companies[index],
      ...companyData,
      Id: companies[index].Id,
      createdAt: companies[index].createdAt,
      updatedAt: new Date().toISOString()
    };
    return { ...companies[index] };
  },

  async delete(id) {
    await delay(300);
    const index = companies.findIndex((c) => c.Id === parseInt(id));
    if (index === -1) return false;
    
    companies.splice(index, 1);
    return true;
  }
};