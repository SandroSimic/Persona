import { model } from "mongoose";
import catchAsync from "./catchAsync.js";
import APIFeatures from "./apiFeatures.js";

export const getAll = (Model, popOptions) =>
  catchAsync(async (req, res) => {
    let query = Model.find();

    if (popOptions) {
      query = query.populate(popOptions);
    }

    const features = new APIFeatures(query, req.query)
      .filter()
      .sort()
      .paginate();

    const docs = await features.query;

    res.status(200).json({
      status: "success",
      results: docs.length,
      data: { data: docs },
    });
  });

export const getOne = (Model, popOptions) =>
  catchAsync(async (req, res) => {
    let query = await Model.findById(req.params.id);

    if (!query) {
      return res.status(404).json({
        message: "No document found with that ID",
      });
    }

    if (popOptions) {
      query = query.populate(popOptions);
    }

    const doc = await query;

    if (!doc) {
      return res.status(404).json({
        message: "No document found with that ID",
      });
    }

    res.status(200).json({
      data: { doc },
    });
  });

export const createOne = async (Model, data, postCreateCallback = null) => {
  try {
    console.log("data from createOne", data);
    const doc = await Model.create(data);
    console.log("doc from createOne", doc);
    if (!doc) {
      throw new Error("Failed to create document.");
    }

    if (postCreateCallback) {
      await postCreateCallback(doc);
    }

    return doc;
  } catch (error) {
    console.error("Error creating document:", error.message);
    throw new Error(`Error creating document: ${error.message}`);
  }
};

export const updateOne = (Model) =>
  catchAsync(async (req, res) => {
    console.log("Received req.body:", req.body);

    // Transform images field if it exists
    if (req.body.images) {
      req.body.images = req.body.images.map((image) =>
        typeof image === "object" ? image.preview : image
      );
    }

    console.log("Transformed req.body:", req.body);

    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
    });

    if (!doc) {
      return res.status(404).json({
        message: "No document found with that ID",
      });
    }

    res.status(200).json({
      status: "success",
      data: { data: doc },
    });
  });

export const deleteOne = (Model) =>
  catchAsync(async (req, res) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return res.status(404).json({
        message: "No Document found with that ID",
      });
    }

    res.status(204).json({
      status: "success",
      message: "Document Deleted",
    });
  });
