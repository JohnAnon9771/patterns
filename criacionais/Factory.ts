/**
 * A classe Creator declara o método de fábrica que deve retornar um objeto de uma classe Product.
 * As subclasses do Criador geralmente fornecem a implementação deste método.
 */
abstract class Creator {
  /**
   * Observe que o Criador também pode fornecer alguma implementação padrão do método de fábrica.
   */
  public abstract factoryMethod(): Product;

  /**
   * Observe também que, apesar do nome, a principal responsabilidade do Criador não é criar produtos.
   * Geralmente, ele contém algumas lógicas de negócios principais que se baseiam nos objetos Produto, retornados pelo método de fábrica.
   * As subclasses podem alterar indiretamente essa lógica de negócios, substituindo o método de fábrica e retornando um tipo diferente de produto.
   */

  public someOperation(): string {
    // Chama o método de fabrica para criar um objeto Produto.
    const product = this.factoryMethod();
    // Agora, use o produto.
    return `Creator: The same creator's code has just worked with ${product.operation()}`;
  }
}

/**
 * Concrete Creators override the factory method in order to change the
 * resulting product's type.
 */
class ConcreteCreator1 extends Creator {
  /**
   * Observe que a assinatura do método ainda usa o tipo de produto abstrato, mesmo que o produto concreto seja realmente retornado do método.
   * Dessa forma, o Criador pode permanecer independente de classes de produtos concretas.
   */
  public factoryMethod(): Product {
    return new ConcreteProduct1();
  }
}

class ConcreteCreator2 extends Creator {
  public factoryMethod(): Product {
    return new ConcreteProduct2();
  }
}

/**
 * A interface do produto declara as operações que todos os produtos concretos devem implementar.
 */
interface Product {
  operation(): string;
}

/**
 * Produtos de concreto fornecem várias implementações da interface do produto.
 */
class ConcreteProduct1 implements Product {
  public operation(): string {
    return "{Result of the ConcreteProduct1}";
  }
}

class ConcreteProduct2 implements Product {
  public operation(): string {
    return "{Result of the ConcreteProduct2}";
  }
}

/**
 * O código do cliente funciona com uma instância de um criador concreto, embora através de sua interface base.
 * Desde que o cliente continue trabalhando com o criador por meio da interface base, você pode passar a subclasse de qualquer criador.
 */
function clientCode(creator: Creator) {
  // ...
  console.log(
    "Client: I'm not aware of the creator's class, but it still works."
  );
  console.log(creator.someOperation());
  // ...
}

/**
 * O aplicativo escolhe o tipo de criador, dependendo da configuração ou do ambiente.
 */
console.log("App: Launched with the ConcreteCreator1.");
clientCode(new ConcreteCreator1());
console.log("");

console.log("App: Launched with the ConcreteCreator2.");
clientCode(new ConcreteCreator2());
