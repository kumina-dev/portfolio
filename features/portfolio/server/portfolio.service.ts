import { portfolioRepository } from "./portfolio.repository";

export const portfolioService = {
  async getPortfolioPageData() {
    return portfolioRepository.getPortfolioPageData();
  },
};