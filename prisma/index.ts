import { PrismaClient } from "@prisma/client";

//el objeto PrismaClient nos permite hacer consultas a la 
// base de datos
const prisma = new PrismaClient();


async function main() {
  //prisma.user hace referencia al modelo tabla de usuarios
  /*//-----------------crear registro------------------
  try {
    const newUser = await prisma.user.create({
      data: {
        name: "user3",
        dni: 1234567,
      },
    });
    const msj = "Created user " + newUser.name;
    console.log(msj);
  } catch (error: any) {
    const err = "Error to create user " + error.message + error.code;
    console.log(err);
  }

  //-------------listar todos los registros------------------
  try {
    const allUsers = await prisma.user.findMany();
    console.log(allUsers);
  } catch (error: any) {
    const err = "Error to find users " + error.message + error.code;
    console.log(err);
  }
  
  //-------------buscar primer coincidencia-------------------------------------------
  try {
    const user = await prisma.user.findFirst({
      where:{
        id: 1,
        name: "user1"
      }
    });
    console.log(user);
  } catch (error: any) {
    const err = "Error to find user " + error.message + error.code;
    console.log(err);
  }

  //-----------------eliminar-----------------------------------------------------
  try {
    const user = await prisma.user.delete({
      where:{
        id: 4,
      }
    });
    console.log(user);
  } catch (error: any) {
    const err = "Error to delete user " + error.meta.cause + error.code + error.message ;
    console.log(err);
  }
  // también existe deleteMany
  */

  //-----------------actualizar-----------------------------------------------------
  try {
    const user = await prisma.user.update({
      where:{
        id: 1,
      },
      data:{
        email: "mail1@imail.com"
      }
    });
    console.log(user);
  } catch (error: any) {
    const err = "Error to create user " + error.meta.cause + error.code + error.message ;
    console.log(err);
  }
  // también existe updateMany

  //----------------------------------------------------------------------------------------
  // Create or update
  await prisma.user.upsert({
    where: { id: 1, },
    create: { name: "user3", dni: 1234567, },
    update:{ email: "testmail@imail.com" }

  });


}

main();