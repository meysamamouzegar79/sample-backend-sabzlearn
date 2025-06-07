import newsletterModel from "../../models/newsletter"

export const getAll = async (req, res) => {
  const newsletters = await newsletterModel.find();
  return res.json(newsletters);
};
export const create = async (req, res) => {
  const { email } = req.body;

  const newEmail = await newsletterModel.create({ email });
  return res.json(newEmail);
};
