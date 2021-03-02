'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  populate: async (ctx) => {
    console.log('Starting to populate...')

    const options = {
      sort: 'popularity',
      page: '1',
      // Se algum valor for passado como options subistitu apenas o valor passado
      ...ctx.query
    }

    // Pega as query params
    // console.log(ctx.query)

    await strapi.services.game.populate(options)

    ctx.send('Finished populating!')
  }
};
