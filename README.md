# User Management API

Uma API RESTful para gerenciamento de usuários construída com NestJS, MySQL e Docker.

## Requisitos

- Docker
- Docker Compose
- Node.js 18+
- npm

## Configuração do Ambiente

1. Clone o repositório:
```bash
git clone [URL_DO_REPOSITORIO]
cd [NOME_DO_PROJETO]
```

2. Crie um arquivo `.env` na raiz do projeto:
```
DATABASE_HOST=db
DATABASE_PORT=3306
DATABASE_USER=user
DATABASE_PASSWORD=password
DATABASE_NAME=userdb
JWT_SECRET=your-secret-key
```

3. Inicie os containers Docker:
```bash
docker-compose up -d
```

## Executando os Testes

```bash
# Testes unitários
npm run test

# Testes e2e
npm run test:e2e

# Cobertura de testes
npm run test:cov
```

## Documentação da API

Após iniciar a aplicação, acesse a documentação Swagger em:
```
http://localhost:3000/api
```

## Endpoints

### Autenticação
- POST /auth/login - Login de usuário
- POST /auth/register - Registro de novo usuário

### Usuários
- GET /users - Lista todos os usuários
- GET /users/:id - Obtém um usuário específico
- POST /users - Cria um novo usuário
- PATCH /users/:id - Atualiza um usuário
- DELETE /users/:id - Remove um usuário (soft delete)

## Estrutura do Projeto

```
src/
├── auth/               # Módulo de autenticação
├── users/              # Módulo de usuários
│   ├── dto/            # Data Transfer Objects
│   ├── entities/       # Entidades do TypeORM
│   ├── users.controller.ts
│   ├── users.service.ts
│   └── users.module.ts
├── app.module.ts       # Módulo principal
└── main.ts             # Ponto de entrada da aplicação
```

## Padrões e Práticas

- RESTful API
- JWT para autenticação
- TypeORM para persistência
- Swagger para documentação
- Testes automatizados
- Docker para containerização
- Princípios SOLID

## Decisões Técnicas

1. **Soft Delete**: Implementado através do campo `status` para manter histórico.
2. **Auditoria**: Campos de criação, atualização e remoção com timestamps e usuários.
3. **Validação**: Uso de class-validator para validação de DTOs.
4. **Documentação**: Swagger integrado para documentação interativa.
5. **Segurança**: JWT para autenticação e autorização.
