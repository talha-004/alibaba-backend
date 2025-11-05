import ProductModel from "../Models/products.model.js";

export const getAllProducts = async (req, res) => {
  try {
    let currPage = +req.query.page;
    let limit = +req.query.limit;
    let search = req.query.search || "";
    let skip = (currPage - 1) * limit;

    let filter = {
      name: { $regex: search, $options: "i" },
    };

    const products = await ProductModel.find(filter).skip(skip).limit(limit);
    const totalDocs = await ProductModel.countDocuments(filter);

    res.status(200).json({
      success: true,
      msg: "Products fetched successfully!",
      totalDocs,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      err: error.message,
    });
  }
};
