import nc from "next-connect";
import bcrypt from "bcrypt";
import { validateEmail } from "../../../utils/validation";
import db from "../../../utils/db";
import User from "../../../models/User";
import { createActivationToken, createResetToken } from "../../../utils/tokens";
import { sendEmail } from "@/utils/sendEmails";
import { resetEmailTemplate } from "@/emails/resetEmailTemplate";

const handler = nc();

handler.put(async (req, res) => {
  try {
    await db.connectDb();
    const {user_id, password } = req.body;
    const user = await User.findById(user_id)
    if(!user) {
        return res.status(400).json({message: 'This Account doesnt exist'})
    }
    const cryptedPassword = await bcrypt.hash(password, 12) 
    await user.updateOne({
        password: cryptedPassword,
    })
    res.json({email: user.email})
    await db.disconnectDb();
  } catch (error) {
    res.statusCode(500).json({ message: error.message });
  }
});

export default handler;