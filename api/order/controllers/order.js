"use strict";

const stripe = require("stripe")(process.env.STRIPE_KEY);

module.exports = {
  createPaymentIntent: async (ctx) => {
    const { cart } = ctx.request.body;

    const cartGamesIds = await strapi.config.function.cart.cartGamesIds(cart)

    // get all games
    const games = await strapi.config.functions.cart.cartItems(cartGamesIds);

    if (!games.length) {
      ctx.response.status = 404;
      return {
        error: "No valid games found!",
      };
    }

    const total = await strapi.config.functions.cart.total(games)

    if (total === 0) {
      return {
        freeGames: true,
      };
    }

    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: "usd",
        metadata: { cart: JSON.stringify(cartGamesIds) },
      });

      return paymentIntent;
    } catch (err) {
      return {
        error: err.raw.message,
      };
    }
  },
  create: async (ctx) => {
    // pegar as informações do frontend
    const { cart, paymentIntentId, paymentMethod } = ctx.request.body;

    // pega o token
    const token = await strapi.plugins[
      "users-permissions"
    ].services.jwt.getToken(ctx);

    // pega o id do usuario
    const userId = token.id;

    // pegar as informações do usuario
    const userInfo = await strapi
      .query("user", "users-permissions")
      .findOne({ id: userId });

    // pegar os jogos
    // pegar o total (saber se é free ou não)
    // pegar o paymentIntentId
    // pegar as informações do pagamento (paymentMethod)
    // salvar no banco
    // enviar um email da compra para o usuário

    return {
      cart,
      paymentIntentId,
      paymentMethod,
      userInfo
    }
  }
};
