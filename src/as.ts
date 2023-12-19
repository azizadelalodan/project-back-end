import { prisma } from "./config/db"

app.get ("user",async (req:Request,res:Response)=>{
const users =await prisma.user.findMany();
return res.json(users)
})

app.get("/user", async (req: Request, res: Response) => {
    const users = await prisma.user.findMany();
    return res.json(users);
  });