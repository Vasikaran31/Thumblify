const Thumbnail = require("../models/Thumbnail");

const ALLOWED_IMAGE_HOSTS = new Set(["image.pollinations.ai", "pollinations.ai"]);

const getUserThumbnails = async (req, res, next) => {
  try {
    const thumbnails = await Thumbnail.find({ userId: req.user._id }).sort({ createdAt: -1 });
    return res.json({ success: true, thumbnails });
  } catch (error) {
    next(error);
  }
};

const deleteThumbnail = async (req, res, next) => {
  try {
    const thumbnail = await Thumbnail.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!thumbnail) {
      return res.status(404).json({ success: false, message: "Thumbnail not found" });
    }

    return res.json({ success: true, message: "Thumbnail deleted" });
  } catch (error) {
    next(error);
  }
};

const getCommunityFeed = async (req, res, next) => {
  try {
    const thumbnails = await Thumbnail.find({ visibility: "public" })
      .sort({ createdAt: -1 })
      .limit(24)
      .populate("userId", "name");

    const trendingIdeas = [
      "10x Your YouTube Growth With AI",
      "Extreme Budget Cooking Challenge",
      "Epic Gaming Montage Highlights",
      "Morning Routine That Changed My Life",
      "React JS Full Course 2025"
    ];

    return res.json({ success: true, thumbnails, trendingIdeas });
  } catch (error) {
    next(error);
  }
};

const proxyThumbnailImage = async (req, res, next) => {
  try {
    const { url } = req.query;

    if (!url) {
      return res.status(400).json({ success: false, message: "Image URL is required" });
    }

    let parsedUrl;
    try {
      parsedUrl = new URL(url);
    } catch {
      return res.status(400).json({ success: false, message: "Invalid image URL" });
    }

    if (!["http:", "https:"].includes(parsedUrl.protocol)) {
      return res.status(400).json({ success: false, message: "Unsupported image protocol" });
    }

    if (!ALLOWED_IMAGE_HOSTS.has(parsedUrl.hostname)) {
      return res.status(400).json({ success: false, message: "Image host is not allowed" });
    }

    const upstream = await fetch(url, { headers: { Accept: "image/*" } });

    if (!upstream.ok) {
      return res.status(upstream.status).json({ success: false, message: "Upstream image fetch failed" });
    }

    const buffer = Buffer.from(await upstream.arrayBuffer());
    res.set("Content-Type", upstream.headers.get("content-type") || "image/jpeg");
    res.set("Cache-Control", "public, max-age=86400");
    return res.send(buffer);
  } catch (error) {
    next(error);
  }
};

const likeThumbnail = async (req, res, next) => {
  try {
    const thumbnail = await Thumbnail.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: 1 } },
      { new: true }
    );

    if (!thumbnail) {
      return res.status(404).json({ success: false, message: "Thumbnail not found" });
    }

    return res.json({ success: true, likes: thumbnail.likes });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUserThumbnails,
  deleteThumbnail,
  getCommunityFeed,
  proxyThumbnailImage,
  likeThumbnail
};