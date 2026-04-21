Typescript-Express-MongoDB-Prisma-React(Vite)-TailwindCSS



Create this folder structure:
my-fullstack-blog/
├── backend/
└── frontend/

In backend/.env:
DATABASE_URL="mongodb+srv://Ayocode:opesanyapassword123@cluster0.pe8iwwl.mongodb.net/myDatabase?retryWrites=true&w=majority&appName=Cluster0" (replace "myDatabase" with whatever you want your database to be called, or dont, idk)
JWT_SECRET="your-super-secret-key-change-this"
PORT=5000


Then inside backend/, run:
npm init -y
npm install prisma@5 @prisma/client@5   
npm install express cors dotenv mongodb
npm install -D typescript ts-node nodemon @types/express @types/cors @types/node
npx tsc --init
npx prisma init
npx prisma generate
npx prisma db push




in prisma/schema.prisma:
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mongodb"
  url      = env("DATABASE_URL")
}


npm run dev in both frontend and backend to run


You canot deploy mongodb on neon, dont even try. You dont need to

Just deploy frontend and backend to vercel

Create a root vercel.json
In your root prodify/ folder (not inside backend or frontend), create a file called vercel.json and paste exactly what Vercel is showing you:
{
  "experimentalServices": {
    "frontend": {
      "entrypoint": "frontend",
      "routePrefix": "/",
      "framework": "vite"
    },
    "backend": {
      "entrypoint": "backend",
      "routePrefix": "/_/backend"
    }
  }
}

Push to GitHub
git add .
git commit -m "add vercel.json"
git push


Add your environment variables first before deploying. Click the EXAMPLE_NAME field and add these two:
Variable 1:
Key: JWT_SECRET
Value: your-super-secret-key-change-this