# Guia Completo e Detalhado de Comandos Git - Padrões do Projeto

## Repositório: https://github.com/LeoCampelo/web-design
## Branches Principais: `main` (Produção) e `dev` (Desenvolvimento/Integração)

---

### 📋 Padrões de Nomenclatura do Projeto

| Tipo | Padrão da Branch | Padrão do Commit | Exemplo de Branch (Trello ID) |
| :--- | :--- | :--- | :--- |
| **Funcionalidade** | `feat/{ID_TAREFA}` | `feat: Descrição do que foi feito` | `feat/F05` |
| **Correção** | `fix/{ID_TAREFA}` | `fix: Descrição do que foi corrigido` | `fix/D03` |
| **Documentação** | `doc` ou `doc/{ID_TAREFA}` | `doc: O que foi documentado` | `doc/D01` |

---

### 1. Clone do Projeto (Baixar o Repositório pela Primeira Vez)

**Objetivo:** Obter uma cópia funcional do repositório remoto.

```bash
# Navegue até o diretório onde deseja armazenar o projeto.
cd /caminho/para/sua/pasta/projetos

# 1. Comando 'git clone': Cria uma cópia completa do repositório.
git clone https://github.com/LeoCampelo/web-design

# 2. Entra na pasta do projeto recém-criada
cd web-design
```

### 2. Criar uma Nova Branch para Trabalho (Seguindo o Padrão)

**Objetivo:** Isolar o desenvolvimento da tarefa da branch `dev`. **Crie a branch sempre a partir da `dev`**.

```bash
# 1. Garanta que você está na branch 'dev' mais recente (se não estiver, faça antes)
git checkout dev
git pull origin dev

# 2. Defina o nome da sua branch (Ex: feat/F05, fix/D03)
NOME_DA_BRANCH="seu-tipo-de-branch/seu-id" 

# 3. Comando 'git checkout -b': Cria a nova branch e alterna para ela.
git checkout -b $NOME_DA_BRANCH

# 4. Verifica a branch atual para confirmar
git status
```

### 3. Pull, Commit e Push (Ciclo de Trabalho Diário)

**Objetivo:** Manter o trabalho sincronizado com o padrão de commits definido.

```bash
# A) PULL: Atualiza sua cópia local da branch com as mudanças do GitHub.
git pull origin $NOME_DA_BRANCH

# B) COMMIT: Salvar as alterações feitas nos arquivos.
# 1. Adiciona todos os arquivos modificados e novos (Staging Area).
git add . 

# 2. Cria o commit, utilizando o PADRÃO DE COMMIT: feat:, fix:, ou doc:.
# Exemplos:
# git commit -m "feat: Adiciona 5 páginas ao site"
# git commit -m "fix: Correção da indexação das páginas"
# git commit -m "doc: Documentando o conteúdo de cada página no README.md"

# C) PUSH: Envia seus commits locais para o GitHub.
git push origin $NOME_DA_BRANCH

# *Se for o primeiro push desta branch, use:
# git push --set-upstream origin $NOME_DA_BRANCH
```

### 4. Atualizar a Branch com a `dev` (Rebase) - Antes do PR

**Objetivo:** Sincronizar sua branch com a `dev` para garantir que a integração (Pull Request) será limpa.

```bash
# 1. Mude para a branch 'dev'
git checkout dev

# 2. Puxe as últimas atualizações da 'dev' (essencial para ter a base mais recente)
git pull origin dev

# 3. Volte para a sua branch de trabalho
git checkout $NOME_DA_BRANCH

# 4. Execute o rebase: Aplica seus commits sobre a nova 'dev', criando um histórico linear.
git rebase dev

# 5. Se houver CONFLITOS (opcional):
#    - Resolva os conflitos nos arquivos.
#    - Adicione os arquivos corrigidos: 
# git add .
#    - Continue o rebase: 
# git rebase --continue

# 6. Força o push: OBRIGATÓRIO após o rebase reescrever o histórico.
# **AVISO:** Use -f apenas na sua branch de trabalho.
git push -f origin $NOME_DA_BRANCH
```