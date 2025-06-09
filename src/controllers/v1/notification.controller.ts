import notificationModel from "../../models/notification"
export const create = async (req, res) => {
    const { message, admin } = req.body;
    // Validate
    const notification = await notificationModel.create({ message, admin });

    return res.status(201).json(notification);
};

export const get = async (req, res) => {
    const { _id } = req.user;

    const adminNotifications = await notificationModel.find({ admin: _id });
    return res.json(adminNotifications);
};

export const seen = async (req, res) => {
    const notifications = await notificationModel.find({});
    return res.json(notifications);
};
