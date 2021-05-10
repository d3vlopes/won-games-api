const subject = "Compra na Won Games";

const text = `
  Olá <%= user.username %>, obrigado por comprar na Won Games!
  Segue as informações do seu pedido:
  Informações do cartão:
  Bandeira do cartão: <%= payment.card_brand %>
  Número do cartão: **** **** **** <%= payment.card_last4 %>
  Total: <%= payment.total %>
  Jogos:
  <% _.forEach(games, function(game) { %>
    <%= game.name %> - Preço: <%= game.price %>
  <% }); %>
`;

const html = `
  <p>Olá <%= user.username %>, obrigado por comprar na Won Games!</p>
  <p>Segue as informações do seu pedido:</p>
  <h3>Informações do cartão</h3>
  <ul>
    <li><strong>Bandeira do cartão:</strong> <%= payment.card_brand %></li>
    <li><strong>Número do cartão:</strong> **** **** **** <%= payment.card_last4 %></li>
  </ul>
  <h3>Total: <%= payment.total %></h3>
  <hr />
  <h3>Jogos</h3>
  <ul>
    <% _.forEach(games, function(game) { %>
			<li><a href="http://localhost:3000/game/<%= game.slug %>"><%= game.name %></a> - Preço: <strong><%= new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        }).format(game.price) %></strong></li>
		<% }); %>
  </ul>
`;

module.exports = {
  subject,
  text,
  html,
};
