const Transfer = require("../models/transfers.models");
const User = require("../models/users.models");


exports.sendTransfer = async (req, res) => {
    const { amount, sender_account, receiver_account } = req.body;
  
    const userSender = await User.findOne({
      where: {
        accountNumber: sender_account,
      },
    });
  
    const userReceiver = await User.findOne({
      where: {
        accountNumber: receiver_account,
      },
    });
  
    if (!userSender || !userReceiver) {
      return res.status(400).json({
        status: 'error',
        message: 'No existe la cuenta',
      });
    }
  
    if (userSender.accountNumber === userReceiver.accountNumber) {
      return res
        .status(400)
        .json({ error: 'Recipient cannot be the same as the the beneficiary' });
    }
    

    if (!userReceiver) {
      return res.status(400).json({ error: 'Destinatario no encontrado' });
    }
  
    if (userSender.amount < amount) {
      return res.status(400).json({ error: 'Saldo insuficiente' });
    }
  
    await User.update(
      { amount: userReceiver.amount + amount },
      { where: { id: userReceiver.id } }
    );
  
    await User.update(
      { amount: userSender.amount - amount },
      { where: { id: userSender.id } }
    );
  
    await Transfer.create({
      amount,
      senderUserId: userSender.id,
      receiverUserId: userReceiver.id,
    });
  
    res.json({ message: 'Transferencia realizada exitosamente' });
  };