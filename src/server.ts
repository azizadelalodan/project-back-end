import express, { Request, Response } from "express";
import { connectDB, prisma } from "./config/db";
import { Blog, User } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

const app = express();
app.use(express.json());
const port = 3000;

connectDB();
app.post("/adduser", async (req: Request, res: Response) => {
  const newuser = req.body as User;

  await prisma.user.create({
    data: newuser,
  });
  return res.json("user added");
});

app.put("/updateuser/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = req.body as User;
  await prisma.user.update({
    where: { id: id },
    data: user,
  });
  res.json("user updated");
});

// app.delete('/deleteuser/:id', async (req: Request, res: Response) => {
//     const {id} = req.params
//     await prisma.user.delete({
//         where: { id: Number(id) }
//     })
//     res.json('user deleted')
// })
app.get("/user", async (req: Request, res: Response) => {
  const users = await prisma.user.findMany();
  return res.json(users);
});

// Register
app.post("/Register", async (req: Request, res: Response) => {
  const newuser = req.body as User;
  await prisma.user.create({
    data: newuser,
  });
  return res.json("user added");
});

//get all users
// app.Login('/api/Login',)

app.post("/createBlog", async (req: Request, res: Response) => {
  const newBlog = req.body as Blog;
  await prisma.blog.create({
    data: newBlog,
  });
  return res.json("blog posted");
});

app.get("/getallblog", async (req: Request, res: Response) => {
  const getallblog = await prisma.blog.findMany();
  return res.json(getallblog);
});

app.get("/api/getuserwihtBlog/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const get_all_from_user = await prisma.blog.findMany({
    where: { user_id: id },
    select: {
      title: true,
      creatdata: true,
      id: true,
      user: { select: { username: true, email: true } },
    },
  });

  res.json(get_all_from_user);
});

app.delete("/blog/delete/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  await prisma.blog.delete({ where: { id: id } });
  res.json("removed sucess")
});











app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
