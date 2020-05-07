import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticaded';

import AppointmentsController from '../controllers/AppointmentsController';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();

appointmentsRouter.use(ensureAuthenticated);

// appointmentsRouter.get('/', async (request, response) => {
//   const appointmentsRepository = getCustomRepository(AppointmentsRepository);
//   const repositories = await appointmentsRepository.find();

//   return response.json(repositories);
// });

appointmentsRouter.post('/', appointmentsController.create);

export default appointmentsRouter;
