import { model } from "mongoose";
import catchAsync from "./catchAsync.js";
import APIFeatures from "./apiFeatures.js";

export const getAll = (Model, popOptions) =>
  catchAsync(async (req, res) => {
    let query = Model.find();

    if (popOptions) {
      query = query.populate(popOptions);
    }

    // Create a new instance of APIFeatures for counting total documents
    const featuresForCount = new APIFeatures(Model.find(), req.query).filter();
    const totalDocuments = await featuresForCount.query.countDocuments();

    // Use another APIFeatures instance for fetching paginated results
    const features = new APIFeatures(query, req.query)
      .filter()
      .sort()
      .paginate();
    const docs = await features.query;

    res.status(200).json({
      status: "success",
      results: docs.length,
      totalItems: totalDocuments, // Return total document count
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

export const updateOne = async (Model, data, id) => {
  try {
    const doc = await Model.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      throw new Error("No document found with that ID");
    }

    return doc;
  } catch (error) {
    console.error("Error updating document:", error.message);
    throw new Error(`Error updating document: ${error.message}`);
  }
};

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
