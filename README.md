# KristyType

Один из моих самых любимых pet-проектов, который может вам приглянуться 😉

## Базовая настройка

### 1. Установка зависимостей

```bash
pnpm install
```

### 2. Настройка окружения

```bash
cp .env.example .env
```

После зайдите в файл `.env` и заполните _необходимые_ поля:

- BOT_TOKEN
- BOT_CLIENT_ID
- DATABASE_URL

### 3. Настройка Prisma

В `~/src/prisma/schema.prisma` Ваша схема. Она настроена по умолчанию и трогать её **не надо**.

В дальнейшем запустите следующие команды:

```bash
pnpx prisma migrate dev --name init
# Если клиент в папке
#   ~src/generated/prisma/client
# не сгенерировался
pnpx prisma generate
```

### 4. Запуск бота

```bash
pnpm run kristy/start
```
