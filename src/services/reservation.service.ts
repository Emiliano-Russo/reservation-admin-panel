import axios, { AxiosResponse, AxiosInstance } from "axios";
import { formatQueryParams } from "../utils/formatQuery";
import { PaginatedResponse, PaginationDto } from "../interfaces/pagination.dto";
import { IUser } from "../interfaces/user/user.interface";
import { IBusiness } from "../interfaces/business/business.interface";
import { ReservationStatus } from "../interfaces/reservation.status";
import { INegotiable } from "../interfaces/reservation/negotiable.interace";

export interface IReservation {
  id: string;
  user: IUser;
  business: IBusiness;
  reservationDate: string;
  bookingInstructions: string | undefined;
  rating: number;
  comment: string;
  status: ReservationStatus;
  negotiable: INegotiable | null | undefined;
  createdAt: Date;
}

export class ReservationService {
  private api: AxiosInstance;
  constructor(private baseUrl: string) {
    this.api = axios.create({
      baseURL: `${baseUrl}`,
    });
  }

  async getReservations(paginated: PaginationDto): Promise<PaginatedResponse<IReservation>> {
    const response: AxiosResponse<any> = await this.api.get(`/reservation${formatQueryParams(paginated)}`);
    return response.data;
  }

  async getReservationsByUserId(
    userId: string,
    paginated: PaginationDto,
    search: string = "",
    start: string = "",
    end: string = "",
    status: string = ""
  ): Promise<PaginatedResponse<IReservation>> {
    const response: AxiosResponse<any> = await this.api.get(
      `/reservation?userId=${userId}&${formatQueryParams(
        paginated
      )}&search=${search}&startDate=${start}&endDate=${end}&status=${status}`
    );
    return response.data;
  }

  async getReservationsByBusinessId(
    businessId: string,
    paginated: PaginationDto,
    search: string = "",
    start: string = "",
    end: string = "",
    status: string = ""
  ): Promise<PaginatedResponse<IReservation>> {
    console.log(
      `/reservation?businessId=${businessId}&${formatQueryParams(
        paginated
      )}&search=${search}&startDate=${start}&endDate=${end}&status=${status}`
    );
    const response: AxiosResponse<any> = await this.api.get(
      `/reservation?businessId=${businessId}&${formatQueryParams(
        paginated
      )}&search=${search}&startDate=${start}&endDate=${end}&status=${status}`
    );
    return response.data;
  }

  async getReservation(reservationId: string): Promise<any> {
    const response: AxiosResponse<any> = await this.api.get(`/reservation?reservationId=${reservationId}`);
    return response.data;
  }

  async createReservation(createReservationDto: any): Promise<any> {
    console.log("########### creating reservation: ", createReservationDto);
    const response: AxiosResponse<any> = await this.api.post("/reservation", createReservationDto);
    return response.data;
  }

  async updateReservation(id: string, updateReservationDto: any): Promise<any> {
    const response: AxiosResponse<any> = await this.api.patch(`/reservation/${id}`, updateReservationDto);
    return response.data;
  }

  async removeReservation(id: string): Promise<any> {
    const response: AxiosResponse<any> = await this.api.delete(`/reservation/${id}`);
    return response.data;
  }

  async businessProposedSchedule(id: string, date: string): Promise<any> {
    const response: AxiosResponse<any> = await this.api.patch(`/reservation/scheduleProposed/${id}`, { date: date });
    return response.data;
  }

  async userResponseProposedSchedule(id: string, value: any): Promise<any> {
    const response: AxiosResponse<any> = await this.api.patch(`/reservation/responseSchedulePropose/${id}`, {
      value: value,
    });
    return response.data;
  }

  async rateReservation(id: string, ratingDto: { rating: number; comment: string }): Promise<any> {
    const response: AxiosResponse<any> = await this.api.patch(`/reservation/rate/${id}`, ratingDto);
    return response.data;
  }

  async getLastReviewByBusinessId(businessId: string): Promise<IReservation> {
    const response: AxiosResponse<IReservation> = await this.api.get(`/reservation/latest/${businessId}`);
    return response.data;
  }

  async deleteUser(userId: string): Promise<any> {
    const response: AxiosResponse<any> = await this.api.delete(`/reservation/user/${userId}`);
    return response.data;
  }
}
