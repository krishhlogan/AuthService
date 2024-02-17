import { Joi } from 'celebrate';
import dayjs from 'dayjs';

export default {
    emailAddUser: Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    })

}