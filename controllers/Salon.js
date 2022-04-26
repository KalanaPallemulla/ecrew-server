import Salon from "../models/Salon";
import fs from "fs";
import Location from "../models/Location";

export const addSalon = async (req, res) => {
  try {
    const fields = req.fields;
    const files = req.files;
    // console.log(files.image);

    console.log(fields);

    const { name, location, contact, openTime, closeTime, address } = fields;

    //Validations
    if (!name) {
      return res.status(400).json({ msg: "Name is required" });
    }
    {
      if (!contact) return res.status(400).json({ msg: "Contact is required" });
    }
    if (!address) {
      return res.status(400).send({ msg: "Address is required" });
    }

    // if (!features) return res.status(400).send({ msg: "Features is required" });

    let salon = new Salon(fields);

    if (files.image) {
      salon.images.data = fs.readFileSync(files.image.path);
      salon.images.contentType = files.image.type;
    }

    console.log(fields.salonSubType);
    let array = fields.salonSubType.split(",");
    console.log(array);
    salon.salonSubType = array;

    salon.save((err, result) => {
      if (err) {
        console.log("Saving salon error =>", err);
        res.status(400).json(err);
      }
      // res.send({ msg: "Salon Added" });
      res.status(200).send(result);
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      msg: err.message,
    });
  }
};

export const getSalon = async (req, res) => {
  try {
    const filter = req.query;
    const { salonType } = filter;
    console.log(filter);
    if (!salonType) {
      let salon = await Salon.find()
        .select("-images.data")
        .sort("-createdAt")
        .exec();
      if (salon.length == 0)
        return res.status(400).send({ msg: " There are no salons" });
      res.json(salon);
    } else {
      let firstKey;
      if (salonType && salonType.includes("%")) {
        firstKey = salonType.split("%");
        firstKey = firstKey.join(" ");
        console.log(firstKey);
      }
      console.log(salonType.includes("%"));
      let salon = await Salon.find(filter)
        .select("-images.data")
        .sort("-createdAt")
        .exec();
      res.json(salon);
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({
      msg: err.message,
    });
  }
};

export const addLocation = async (req, res) => {
  let loc = req.body;
  const { addLocation } = loc;
  let name = addLocation;
  let location = await Location.findOne({ name });
  console.log(location);

  if (!location) {
    if (name == "") return res.status(400).send("Name cannot be empty");
    location = new Location({ name });

    await location.save((err, result) => {
      if (err) return res.status(400).send({ err });
      return res.status(200).json(result);
    });
  } else {
    return res.status(400).send({ msg: "Location already added" });
  }

  // location = new Location(loc);

  // await location.save((err, result) => {
  //   if (err) return res.status(400).send({ err });
  //   return res.status(200).json(result);
  // });
};

export const getLocations = async (req, res) => {
  try {
    let location = await Location.find().exec();
    if (!location) {
      return res.status(400).send("There is no locations");
    }

    res.json(location);
  } catch (error) {
    console.log(error);
    return res.status(400).send("Server Error");
  }
};

export const getSingleSalon = async (req, res) => {
  try {
    let salon = await Salon.findById(req.params.id);

    if (!salon) {
      return res.status(400).send("There is no salon for this id");
    }

    res.json(salon);
  } catch (error) {
    console.log(error);
    return res.status(400).send("Server Error");
  }
};

export const removeSalon = async (req, res) => {
  try {
    let salon = await Salon.findById(req.params.id);
    if (salon) {
      await Salon.findByIdAndDelete(req.params.id);
      res.send("Salon Deleted");
    } else {
      return res.status(400).send("There is no salon for this id");
    }
  } catch (error) {
    console.log(error);
    return res.status(400).send("Server Error");
  }
};

export const updateSalon = async (req, res) => {
  try {
    let fields = req.fields;

    let data = { ...fields };

    let update = await Salon.findByIdAndUpdate(req.params.id, data, {
      new: true,
    }).exec();
    res.json("Updated");
  } catch (error) {
    console.log(error);
    return res.status(400).send("Server Error");
  }
};

export const active = async (req, res) => {
  try {
    let salon = await Salon.findByIdAndUpdate(req.params.id, {
      active: 1,
    });

    res.send("active");
  } catch (error) {
    console.log(error);
    return res.status(400).send("Server Error");
  }
};

export const deactivate = async (req, res) => {
  try {
    let salon = await Salon.findByIdAndUpdate(req.params.id, {
      active: 0,
    });

    res.send("deactivated");
  } catch (error) {
    console.log(error);
    return res.status(400).send("Server Error");
  }
};

export const getSalonBySearch = async (req, res) => {
  const filter = req.query;

  res.send(filter);
};
