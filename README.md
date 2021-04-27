# rentx
rentx-app-ignite

**RF** => Requisitos funcionais
**RNF** => Requisitos não funcionais
**RN** => Regras de negócio

# Cadastro de carro

**RF**
Deve ser possível cadastrar um novo carro.
Deve ser possível listar todas as categorias.

**RN**
Não deve ser possível cadastrar um carro com uma matrícula ja existente.
Não deve ser possível alterar a matrícula de um carro ja existente.
O carro deve ser cadastrado, por padrão, com disponibilidade.
Não deve ser possível cadastrar um carro sem permissões de Administrador

# Listagem de carros

**RF**
Deve ser possível listar todos os carros disponíveis por categoria, marca ou nome carro

**RN**
O usuário não precisa estar logado no sistema.


# Cadastro de Especificação do carro

**RF**
Deve ser possível cadastrar uma especificação para um carro.
Deve ser possível listar todas as especificações.
Deve ser possível listar todos os carros

**RN**
Não deve ser possível cadastrar um especificação de um carro inexistente.
Não deve ser possível cadastrar uma especificação ja existente para o mesmo carro.
Não deve ser possível cadastrar uma especificação sem permissões de Administrador


# Cadastro imagens do carro

**RF**
Deve ser possível cadastrar a imagem do carro.

**RNF**
Utilizar o multer para upload dos arquivos

**RN**
O usuário deve poder cadastrar mais de uma imagem para o mesmo carro.
Não deve ser possível cadastrar uma imagem sem permissões de Administrador.


# Aluguer de carro

**RF**
Deve ser possível cadastrar um aluguer.

**RN**
O aluguer deve ter duração mínima de 24h.
Não deve ser possível cadastrar o aluguer de um carro caso ja tenha sido feito.