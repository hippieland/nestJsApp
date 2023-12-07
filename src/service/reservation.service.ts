import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reservation } from '../model/reservation.model';
import * as nodemailer from 'nodemailer';
import { UserService } from './user.service';

@Injectable()
export class ReservationService {
    
    constructor(@InjectModel(Reservation.name) private readonly reservationModel: Model<Reservation>,
                private readonly userService: UserService) {}

    async findAll(): Promise<Reservation[]> {
        return this.reservationModel.find().exec();
    }

    async findOneById(id: string): Promise<Reservation | null> {
        return this.reservationModel.findById(id).exec();
    }

    async create(reservation: Reservation): Promise<Reservation> {
        const newReservation = new this.reservationModel(reservation);
        return newReservation.save();
    }

    async createReservation(userId: string, tourId: string, pax: number, totalPrice: number, date: string): Promise<Reservation> {
        const createdReservation = new this.reservationModel({ userId, tourId, pax, totalPrice, date });
        return createdReservation.save();
      }

    async update(id: string, reservation: Reservation): Promise<Reservation | null> {
        return this.reservationModel.findByIdAndUpdate(id, reservation, { new: true }).exec();
    }

    async delete(id: string): Promise<void> {
        await this.reservationModel.findByIdAndDelete(id).exec();
    }

    async getReservationsByUser(userId: string): Promise<Reservation[]> {
        return this.reservationModel.find({ userId }).exec();
      }

    async sendReservationConfirmation(reservation: Reservation): Promise<void> {
    const user = await this.userService.findOneById(reservation.userId);

    // Configura el transporte de nodemailer (usando un servicio de correo como SMTP)
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
        user: 'hipilandiatour@gmail.com',
        pass: 'ddca bumf bykf oqny',
        },
    });

    // Configura el contenido del correo electrónico
    const mailOptions = {
        from: 'hipilandiatour@gmail.com',
        to: user.email,
        subject: 'Confirmación de reserva',
        text: `¡Hola ${user.name}!\n\nTu reserva para el tour con ID ${reservation.tourId} ha sido confirmada.\nFecha de reserva: ${reservation.date}\nPax: ${reservation.pax}\nTotal: ${reservation.totalPrice}`,
    };

    // Envía el correo electrónico
    await transporter.sendMail(mailOptions);
    }
}
