const { Rating } = require('../models');

exports.submitRating = async (req, res) => {
  try {
    const storeId = req.params.id; // storeId from URL
    const userId = req.user.id;
    const { rating } = req.body;

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Invalid rating' });
    }

    let record = await Rating.findOne({ where: { userId, storeId } });

    if (record) {
      // Update existing
      record.rating = rating;
      await record.save();
      return res.json({ message: 'Rating updated', rating: record });
    }

    // Create new
    record = await Rating.create({ userId, storeId, rating });
    return res.status(201).json({ message: 'Rating created', rating: record });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateRating = async (req, res) => {
  // With upsert logic in submitRating, you might not even need this anymore
  try {
    const storeId = req.params.id;
    const userId = req.user.id;
    const { rating } = req.body;

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Invalid rating' });
    }

   const ratingId = req.params.id;
const record = await Rating.findOne({ where: { id: ratingId, userId } });
    if (!record) return res.status(404).json({ message: 'Rating not found' });

    record.rating = rating;
    await record.save();
    res.json({ message: 'Rating updated', rating: record });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getStoreRatings = async (req, res) => {
  try {
    const storeId = req.params.id;
    const ratings = await Rating.findAll({
      where: { storeId },
      include: ['user']
    });

    const data = ratings.map(r => ({
      userName: r.user ? r.user.name : null,
      rating: r.rating,
      comment: null
    }));

    res.json(data);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
