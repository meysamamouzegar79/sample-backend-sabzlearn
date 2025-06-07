import contactModel  from "../../models/contact";
import nodemailer from 'nodemailer'
export const getAll = async (req, res) => {
  const contacts = await contactModel.find({});
  return res.json(contacts);
};

export const create = async (req, res) => {
  const { name, email, phone, body } = req.body;

  const contact = await contactModel.create({
    name,
    email,
    phone,
    body,
    answer: 0,
  });

  return res.status(201).json(contact);
};

export const remove = async (req, res) => {
  const deletedContact = await contactModel.findOneAndDelete({
      _id: req.params.id,
    });
  
    if (!deletedContact) {
      return res.status(404).json({ message: "Contact not found !!" });
    }
  
    return res.json(deletedContact);
};

export const answer = async (req, res) => {
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "example@gmail.com",
          pass: "test password",// پسورد باید توی تنظمیات جیمیل ست بشه با فعال کردن 2stepveryfication
        },
      });
    
      const mailOptions = {
        from: "example@gmail.com",
        to: req.body.email,
        subject: "پاسخ پیغام شما از سمت آکادمی سبزلرن",
        text: req.body.answer,
      };
    
      transporter.sendMail(mailOptions, async (error, info) => {
        if (error) {
          return res.json({ message: error });
        } else {
          const contact = await contactModel.findOneAndUpdate(
            {
              email: req.body.email,
            },
            { answer: 1 }
          );
          return res.json({ message: "Email sent successfully :))" });
        }
      });
};
