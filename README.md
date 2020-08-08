# desafio-database-relations
 Applying knowledge of Nodejs with Typescript and using database with TypeORM with ManyToMany relationships

<strike> - should be able to create a new customer: Para que esse teste passe, sua aplicação deve permitir que um cliente seja criado, e retorne um json com o cliente criado. </strike>

- should not be able to create a customer with one e-mail thats already registered: Para que esse teste passe, sua aplicação deve retornar um erro quando você tentar cadastrar um cliente com um e-mail que já esteja cadastrado no banco de dados.

- should be able to create a new product: Para que esse teste passe, sua aplicação deve permitir que um produto seja criado, e retorne um json com o produto criado.

- should not be able to create a duplicated product: Para que esse teste passe, sua aplicação deve retornar um erro quando você tentar cadastrar um produto com um nome que já esteja cadastrado no banco de dados.

- should be able to create a new order: Para que esse teste passe, sua aplicação deve permitir que um pedido seja criado, e retorne um json com o todos os dados do pedido criado.

- should not be able to create an order with a invalid customer: Para que esse teste passe, sua aplicação não deve permitir a criação de um novo pedido com um cliente que não existe no banco de dados, retornando um erro.

- should not be able to create an order with invalid products: Para que esse teste passe, sua aplicação não deve permitir a criação de um novo pedido com um produtos que não existem no banco de dados, retornando um erro caso um ou mais dos produtos enviados não exista no banco de dados.

- should not be able to create an order with products with insufficient quantities: Para que esse teste passe, sua aplicação não deve permitir a criação de um novo pedido com um produtos que não possuem quantidade disponível, retornando um erro caso um ou mais dos produtos enviados não possua a quantidade necessária.

- should be able to subtract an product total quantity when it is ordered: Para que esse teste passe, sua aplicação deve permitir que, quando um novo pedido for criado, seja alterada a quantidade total dos produtos baseado na quantidade pedida.

- should be able to list one specific order: Para que esse teste passe, você deve permitir que a rota orders/:id retorne um pedido, contendo todas as informações do pedido com o relacionamento de customer e order_products.
