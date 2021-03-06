import AppError from '@shared/errors/AppError';

import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentRepository: FakeAppointmentRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentRepository();
    createAppointment = new CreateAppointmentService(fakeAppointmentRepository);
  });

  it('should be able to create a new appointment', async () => {
    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '982983',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('982983');
  });

  it('should not be able to create two appointments on the same date', async () => {
    const appointmentDate = new Date(2020, 4, 10, 11);

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: '982983',
    });

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: '982983',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
