// Este arquivo inicializa o aplicativo e configura os dados necessários.

db.open().then(() => {
    // Pré-carrega os produtos se ainda não estiverem no banco de dados
    db.getProducts().then(products => {
        if (products.length === 0) {
            const initialProducts = [
                { id: 1, name: 'Maçã', price: 1.50, description: 'Maçãs frescas e suculentas', image: 'img/maca.jpg' },
                { id: 2, name: 'Pão Integral', price: 4.00, description: 'Pão integral rico em fibras', image: 'img/pao_integral.jpg' },
                { id: 3, name: 'Leite', price: 3.50, description: 'Leite integral pasteurizado', image: 'img/leite.jpg' },
                { id: 4, name: 'Queijo Mussarela', price: 8.00, description: 'Queijo mussarela fatiado', image: 'img/queijo_mussarela.jpg' },
                { id: 5, name: 'Café em Pó', price: 10.00, description: 'Café em pó 500g', image: 'img/cafe.jpg' },
                { id: 6, name: 'Arroz', price: 5.00, description: 'Arroz branco tipo 1', image: 'img/arroz.jpg' },
                { id: 7, name: 'Feijão', price: 6.00, description: 'Feijão carioca selecionado', image: 'img/feijao.jpg' },
                { id: 8, name: 'Óleo de Soja', price: 4.50, description: 'Óleo de soja 900ml', image: 'img/oleo.jpg' },
                { id: 9, name: 'Macarrão Espaguete', price: 2.50, description: 'Macarrão espaguete 500g', image: 'img/macarrao.jpg' },
                { id: 10, name: 'Açúcar Refinado', price: 3.00, description: 'Açúcar refinado 1kg', image: 'img/acucar.jpg' },
                { id: 11, name: 'Sal de Cozinha', price: 1.00, description: 'Sal refinado 1kg', image: 'img/sal.jpg' },
                { id: 12, name: 'Detergente Líquido', price: 2.00, description: 'Detergente líquido para louças', image: 'img/detergente.jpg' },
                { id: 13, name: 'Sabão em Pó', price: 8.50, description: 'Sabão em pó 1kg', image: 'img/sabao_po.jpg' },
                { id: 14, name: 'Papel Higiênico', price: 12.00, description: 'Pacote com 12 rolos de papel higiênico', image: 'img/papel_higienico.jpg' },
            ];
            db.addProducts(initialProducts);
        }
    });
});
