Ligar:
- node --watch server.js
- npx prisma studio

------------------------------------------------------------------------
INSTRUÇÕES PRA MONTAR

- npm init -y

Criar 'server.js'

- npm i express

package.json:
    inserir "type": "module"

após alguns códigos, para funcionar o servidor, liga o do mongodb
instale prisma:
- npm install prisma --save-dev
- npm prisma init

entra no '.env' e muda o url para conectar no mongodb
password: AbayogWxIKJQNeRu

arrume schema.prima:
reescreva para...

datasource db {
  provider = "mongodb"
  url      = env("DATABASE_URL")
}

adicione:

model User {
  id    String @id @default(auto()) @map("_id") @db.ObjectId
  email String @unique
  name  String
  age   String
}

- npx prisma db push
- npm install @prisma/client

ligar studio
- npx prisma studio

ligar dev
- node --watch server.js

instalar cors
- npm install cors
