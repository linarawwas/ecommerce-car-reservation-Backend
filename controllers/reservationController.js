import Model from "../models/reservationModel.js";


class Controller {

  //get All Reservations
  async getAllReservations(req, res, next) {
    try {
      const respon = await Model.find({});
      return res.status(200).json(respon)

    } catch (err) {
      return res.status(500).json({
        data: err
      })
    }
  }

  // creating new Reservation
  async createReservation(req, res) {

    const body = req.body;
    try {

      const doc = new Model(body);
      const newReservation = await doc.save()

      return res.status(200).json({ newReservation });
    }

    catch (err) {
      return res.status(500).json({
        data: err.message
      })
    }
  }

  //delete Reservation by id
  async deleteReservation(req, res, next) {
    let { id } = req.params;
    const findingReservation = await Model.findById(id);
    if (!findingReservation) {
      return res.status(404).json({
        message: "not found"
      })
    }
    const result = await findingReservation.delete();

    return res.status(200).json({
      message: "deleted successfully"
    })
  }


}

const controller = new Controller();

export default controller;


