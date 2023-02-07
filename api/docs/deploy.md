# Processo de Deploy

Pré:
* Criar o Dockerfile
* Criar o Docker Compose para fazer criar o container da imagem da API e do Traefik e configurar o proxy

Deploy:
* `docker-machine create --driver amazonec2 mapvault-api`
* Modificar função IAM da instância na AWS para incluir a função que dá permissão para instância acessar o AWS Systems Manager, para obter os secrets (connection string do banco de dados, por exemplo)
  * Instância do mapvault-api no Console da AWS > Ações > Segurança > Modificar funções do IAM > Incluir a AmazonSSMRoleForInstanceQuickSetup
* Obter o DNS IPv4 público da instância no Console da AWS para configurar como Host no Proxy com o Traefik
* `docker-compose -f deployment up -d`
* Dar permissão ao IP da instância no MongoDB pelo Atlas caso não tenh
  * Network Access (em Security, barra lateral esquerda) > Add IP Address ou editar um existente.