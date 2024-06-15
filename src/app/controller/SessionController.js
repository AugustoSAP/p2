import * as Yup from 'yup';
import User  from '../models/User';
import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth';

class SessionController {
  async store(request, response) {
    const schema = Yup.object({
      
    });

    const isValid = await schema.isValid(request.body);

    const emailOrPasswordIncorrect = () => {
      return response.status(401).json({ error: 'Check that your email or password is correct' });
    };

    if (!isValid) {
      return emailOrPasswordIncorrect();
    }

    const { email, password } = request.body;
    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      return emailOrPasswordIncorrect();
    }

    const isSamePassword = await user.checkPassword(password);

    if (!isSamePassword) {
      return emailOrPasswordIncorrect();
    }

    // Rest of your authentication logic goes here

    // Return success response or perform additional actions
    return response.status(200).json({
      id: user.id,
      name: user.name,
      email,
      admin: user.admin,
      token: jwt.sign({id: user.id}, authConfig.secret,{
        expiresIn: authConfig.experisIn,
      })
     });
  }
}


export default new SessionController();
