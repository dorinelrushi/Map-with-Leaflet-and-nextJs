import dbConnect from "../../../utils/dbConnect";

dbConnect();

export default function handler(req, res) {
  res.status(200).json({ name: "John Doe" });
}
