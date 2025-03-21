const express = require("express");
const prisma = require("../db/prisma/client.prisma");
const Exception = require("../exceptions");

const startupsRouter = express.Router();

/**
 * 기업 등록
 */
startupsRouter.post("/", async (req, res, next) => {
  try {
    const {
      companyName,
      introduce,
      category,
      totalAmount,
      salesRevenue,
      numOfEmployees,
      vmsTotalInvestment,
    } = req.body;

    const startup = await prisma.startup.create({
      data: {
        companyName,
        introduce,
        category,
        totalAmount,
        salesRevenue,
        numOfEmployees,
        vmsTotalInvestment,
      },
    });
    res.json(startup);
  } catch (e) {
    next(e);
  }
});

/**
 * 전체 기업 리스트
 */
startupsRouter.get("/", async (req, res, next) => {
  try {
    const startups = await prisma.startup.findMany({
      omit: { vmsTotalInvestment: true },
    });

    res.json(startups);
  } catch (e) {
    next(e);
  }
});

/**
 * 기업 검색
 */
startupsRouter.get("/:startupId", async (req, res, next) => {
  try {
    const startupId = Number(req.params.startupId);
    const startup = await prisma.startup.findUnique({
      where: { id: startupId },
    });
    if (!startup) throw new Exception(400, "존재하지 않는 기업입니다.");

    res.json(startup);
  } catch (e) {
    next(e);
  }
});

module.exports = startupsRouter;
