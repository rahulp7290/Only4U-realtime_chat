import uploadCloudinary from "../config/cloudinary.js";
import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId } from "../socket/socket.js";
import { io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
  try {
    let sender = req.userId;
    let { receiver } = req.params;
    let { message } = req.body;
    let image;
    if (req.file) {
      image = await uploadCloudinary(req.file.path);
    }
    let conversation = await Conversation.findOne({
      participants: { $all: [sender, receiver] },
    });

    let messageData = await Message.create({
      sender,
      receiver,
      message,
      image: image ? image : "",
    });
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [sender, receiver],
        messages: [messageData._id],
      });
    } else {
      conversation.messages.push(messageData._id);
      await conversation.save();
    }

    const receiverSocketId= getReceiverSocketId(receiver);
    if(receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", messageData);
    }

    return res.status(201).json(messageData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getMessages = async (req, res) => {
  try {
    let sender = req.userId;
    let { receiver } = req.params;
    let conversation = await Conversation.findOne({
      participants: { $all: [sender, receiver] },
    }).populate("messages");
    if (!conversation) {
      return res.status(404).json({ error: "No conversation found" });
    }
    return res.status(200).json(conversation?.messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
