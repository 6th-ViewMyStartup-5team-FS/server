const express = require("express");
const prisma = require("../db/prisma/client.prisma");
const Exception = require("../exceptions");

const usersRouter = express.Router();

// 회원가입하기
usersRouter.post("/sign-up", async (req, res, next) => {
  try {
    const { email, username, password } = req.body;

    const existingUser = await prisma.user.findUnique({ where: { username } });
    if (existingUser) throw new Exception(400, "이미 사용중인 username입니다.");

    const user = await prisma.user.create({
      data: { email: email, username, password: password },
      omit: { password: true },
    });

    res.json(user);
  } catch (e) {
    next(e);
  }
});

// 로그인하기
usersRouter.post("/log-in", async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const existingUser = await prisma.user.findUnique({ where: { username } });
    if (!existingUser)
      throw new Exception(404, "존재하지 않는 username입니다.");

    if (password !== existingUser.password)
      throw new Exception(400, "비밀번호가 일치하지 않습니다.");

    res.send("로그인 되었습니다.");
  } catch (e) {
    next(e);
  }
});

module.exports = usersRouter;
