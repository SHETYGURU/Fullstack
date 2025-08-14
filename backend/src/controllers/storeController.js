const { Store, Rating } = require('../models');
const { Op } = require('sequelize');

exports.listStoresPublic = async (req, res) => {
  try {
    const q = req.query.q || '';
    const userId = req.user?.id || null; // if logged in, we can get their rating

    const where = q
      ? {
          [Op.or]: [
            { name: { [Op.like]: `%${q}%` } },
            { address: { [Op.like]: `%${q}%` } }
          ]
        }
      : {};

    const stores = await Store.findAll({
      where,
      include: [
        { model: Rating, as: 'ratings' }, // all ratings for avg
        {
          model: Rating,
          as: 'userRatingRecord', // only current user's rating
          where: userId ? { userId } : {}, // skip filter if not logged in
          required: false
        }
      ]
    });

    const data = stores.map((s) => {
      const avg = s.ratings.length
        ? (s.ratings.reduce((a, b) => a + b.rating, 0) / s.ratings.length).toFixed(2)
        : null;

      return {
        id: s.id,
        name: s.name,
        email: s.email,
        address: s.address,
        rating: avg,
        userRating: s.userRatingRecord?.rating || null
      };
    });

    res.json(data);
  } catch (err) {
    console.error('Error fetching store list:', err);
    res.status(500).json({ message: 'Failed to fetch stores' });
  }
};

exports.getStorePublic = async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.user?.id || null;

    const store = await Store.findByPk(id, {
      include: [
        { model: Rating, as: 'ratings' },
        {
          model: Rating,
          as: 'userRatingRecord',
          where: userId ? { userId } : {},
          required: false
        }
      ]
    });

    if (!store) return res.status(404).json({ message: 'Not found' });

    const avg = store.ratings.length
      ? (store.ratings.reduce((a, b) => a + b.rating, 0) / store.ratings.length).toFixed(2)
      : null;

    res.json({
      id: store.id,
      name: store.name,
      address: store.address,
      rating: avg,
      userRating: store.userRatingRecord?.rating || null
    });
  } catch (err) {
    console.error('Error fetching store:', err);
    res.status(500).json({ message: 'Failed to fetch store' });
  }
};
