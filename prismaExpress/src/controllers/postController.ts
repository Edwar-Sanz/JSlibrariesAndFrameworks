import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { config } from 'dotenv'; config();

const prisma = new PrismaClient();

class PostController {

  //---------------------------------------------------------------
  async createPost(req: Request, res: Response) {
    //----------data------------
    const { userId, title, content} = req.body;
    //----------create----------
    const newPost = await prisma.post.create({
      data: {
        title: title,
        content: content,
        user: { //modelo user
          connect: {id: userId}
        }
      },
    });
    //---------res--------------
    res.json(newPost);
  }

  /*
  //---------------------------------------------------------------
  async updatePost(req: Request, res: Response) {
  }

  //---------------------------------------------------------------
  async deletePost(req: Request, res: Response) {
  }
  */

}

export default PostController;
