import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  profileImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(async () => {
      return {}; // aquí puedes agregar userId u otros datos si tienes auth
    })
    .onUploadComplete(async ({ file }) => {
      console.log("✅ Archivo subido:", file);
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
